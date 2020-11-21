import { useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { PauseStudyInput, ResumeStudyInput, StudyRecord, StudyTheme } from "../../../graphQL/generated/types";
import { PauseStudyMutation, ResumeStudyMutation, StudyRecordQuery, StudyThemeQuery } from "../../../graphQL/StudyThemeStatements";
import useGraphQL from "../../../graphQL/useGraphQL";
import useLocal from "../../../models/hooks/useLocal";
import { SoundPlayer } from "../../../models/SoundPlayer";
import { StudyStatus } from "../../../models/StudyStatus";
import Time from "../../../models/Time";
import { Timer } from "../../../models/Timer";
import { StartStopButtonStatus } from "../../atoms/buttons/StartStopButton";
import CountingScreenCard from "../../molecule/CountingScreenCard";
interface Props {
    open: boolean
    onClose: (forceFinish: boolean) => void
    studyStatus: StudyStatus
    onFinishGoalTime: () => void
}

export default (props: Props) => {

    //timer
    const [timer, setTimer] = useState<Timer | undefined>(undefined)
    const [notTouchedYet, setNotTouchedYet] = useState(true)

    //描画系
    const [canFinish, setCanFinish] = useState(false)

    //状態？描画？両方？
    const [buttonStatus, setButtonStatus] = useState<StartStopButtonStatus>("PLAY")
    const [seconds, setSeconds] = useState<Time>(new Time(0)) //何の時間・・・？
    const [goalTime, setGoalTime] = useState<Time>(new Time(0)) //勉強すべき時間

    //残り時間。本当に？
    const leftTime = new Time(goalTime.seconds - seconds.seconds)

    //状態系
    const userId = useLocal("USER_ID")!

    //mutation
    const [pauseStudy] = useMutation(PauseStudyMutation)
    const [resumeStudy] = useMutation(ResumeStudyMutation)

    //api
    const { data: studyRecordData, refetch: refetchStudyRecord } = useQuery(StudyRecordQuery,
        { variables: { studyThemeId: props.studyStatus.nowStudyTheme, studyRecordId: props.studyStatus.nowStudyRecord } })
    const studyRecord = studyRecordData?.StudyRecord as Required<StudyRecord>
    // const queryStudyRecord = useGraphQL.queryStudyRecord(props.studyStatus.nowStudyTheme, props.studyStatus.nowStudyRecord)
    // const studyRecord = queryStudyRecord?.studyRecord
    const studyTimeOnServer = new Time((studyRecord?.studyTime || 0))

    // const queryStudyTheme = useGraphQL.queryStudyTheme(props.studyStatus.nowStudyTheme)
    // const studyTheme = queryStudyTheme?.studyTheme
    const { data: studyThemeData, loading } = useQuery(StudyThemeQuery, {
        variables: { userId, studyTheme: props.studyStatus.nowStudyTheme }
    });
    const studyTheme = studyThemeData?.StudyTheme as Required<StudyTheme>


    //const centerMessageWhenPlay = `総勉強時間: 約${seconds.formatJapanese()}` //これだと休憩後におかしいことになる
    const centerMessageWhenPlay = `` //一旦勉強中は何も表示しない
    const centerMessageWhenPause = `総勉強時間: 約${studyTimeOnServer.formatJapanese()}`
    const centerMessage = props.studyStatus.playStatus === "PAUSE" ? centerMessageWhenPlay : centerMessageWhenPause

    const onFinish = () => {
        console.log("on finish")
        onClose()
    }

    const onClose = () => {
        const notStudyYet = studyTimeOnServer.getValue() > 0 || timer //勉強時間が１秒でもあるかタイマーが存在しているか
        if (notTouchedYet && notStudyYet) {
            console.log("学習画面を強制的に閉じます")
            props.onClose(true)
        } else {
            props.onClose(false)
        }
        setTimer(undefined)
    }

    //終わったらonFinishGoalTime
    useEffect(() => {
        if (seconds.getValue() > goalTime.getValue()) {
            onFinishGoalTime()
        }
    }, [seconds])

    const onFinishGoalTime = () => {
        console.log("勉強時間終わったよ〜")
        const player = new SoundPlayer()
        player.playWhenStudyEnd()
        //強制的にpauseしてAPI飛ばす
        pauseTimer()
        props.onFinishGoalTime()
    }


    //ここのロジックどうにかならないかな
    const initialize = () => {
        console.log("CountingScreen-initialize")
        console.log(props.studyStatus)
        setCanFinish(false)

        if (props.studyStatus.isStudying()) {
            //set study status
            setGoalTime(props.studyStatus.goalTime)
            setButtonStatus(props.studyStatus.playStatus)

            //計測中であればタイマーを動かす
            if (props.studyStatus.playStatus === "PAUSE") {
                startTimer(props.studyStatus.clickedPlayButtonDate)
            } else {
                setSeconds(props.studyStatus.insetSeconds)
                setCanFinish(true)
            }
        } else {
            setGoalTime(props.studyStatus.goalTime)
            setSeconds(new Time(0))
            setButtonStatus("PLAY")
        }
    }

    //開いたら初期化する。Why?
    useEffect(() => {
        initialize()
    }, [])

    const incrementGoalTime = (incrementValue: number) => {
        const newGoalTime = new Time(goalTime.getValue() + incrementValue)
        props.studyStatus.setGoalTime(newGoalTime)
        console.log({ newGoalTime })
        setGoalTime(newGoalTime)
    }

    //ただTimerを動かす
    const startTimer = (startDate: Date = new Date()) => {
        setNotTouchedYet(false)
        const player = new SoundPlayer()
        player.playWhenStartStudy()

        //timerを再作成してスタートする
        const timer = new Timer(startDate, props.studyStatus.insetSeconds.seconds)
        timer?.start((second) => {
            //props.studyStatus.setSeconds(new Time(second)) //バグりやすいので注意
            setSeconds(new Time(second))
        })
        setTimer(timer)
    }

    //pause状態からtimerを動かす
    const resumeTimer = () => {
        //api
        const input: ResumeStudyInput = {
            userId,
            studyThemeId: props.studyStatus.nowStudyTheme!,
            studyRecordId: props.studyStatus.nowStudyRecord!
        }
        console.log({ input })
        resumeStudy({ variables: { input } })
        startTimer()
    }

    const pauseTimer = async () => {
        //ここまでの秒数を記録する
        const seconds = timer?.stop()
        props.studyStatus.setInsetSeconds(new Time(seconds || 0))

        //API
        const input: PauseStudyInput = {
            userId,
            studyThemeId: props.studyStatus.nowStudyTheme!,
            studyRecordId: props.studyStatus.nowStudyRecord!
        }
        await pauseStudy({ variables: { input } })
        if (refetchStudyRecord)
            await refetchStudyRecord()
    }

    const onClickStartButton = (prevStatus: StartStopButtonStatus, nowStatus: StartStopButtonStatus) => {
        props.studyStatus.setPlayStatus(nowStatus)
        if (prevStatus == "PLAY") {
            resumeTimer()
            setCanFinish(false)
        } else if (prevStatus == "PAUSE") {
            pauseTimer()
            setCanFinish(true)
        }
    }

    return (
        <>
            <Head>
                <title>勉強中...{leftTime.format()}</title>
            </Head>

            <CountingScreenCard
                onClose={props.onClose}
                onFinish={onFinish}
                canFinish={canFinish}
                finishButtonText="勉強を終了する"

                topTitle={studyTheme?.title || ""}
                onClickUp={() => incrementGoalTime(10 * 60)}
                onClickDown={() => incrementGoalTime(-10 * 60)}
                disableUp={goalTime.isOverXmin(90)}
                disableDown={goalTime.isLessXmin(10)}
                goalTimeText={goalTime.format()}
                progress={seconds.getValue() / goalTime.getValue()}
                centerText={leftTime.format()}
                onClickStartStopButton={onClickStartButton}
                initialButtonStatus={buttonStatus}
                centerMessage={centerMessage}
            />
        </>
    )
}