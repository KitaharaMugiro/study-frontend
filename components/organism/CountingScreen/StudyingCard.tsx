import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { PauseStudyInput, ResumeStudyInput, StudyRecord, StudyTheme } from "../../../graphQL/generated/types";
import { EndStudyMutation, PauseStudyMutation, ResumeStudyMutation, StudyRecordQuery, StudyThemeQuery } from "../../../graphQL/StudyThemeStatements";
import useLocal from "../../../models/hooks/useLocal";
import { SoundPlayer } from "../../../models/SoundPlayer";
import { StudyStatus } from "../../../models/StudyStatus";
import Time from "../../../models/Time";
import { Timer } from "../../../models/Timer";
import { StartStopButtonStatus } from "../../atoms/buttons/StartStopButton";
import CountingScreenCard from "../../molecule/CountingScreenCard";
interface Props {
    open: boolean
    onClose: () => void
    studyStatus: StudyStatus
    onFinish: (title: string) => void
    onFinishGoalTime: () => void
}

export default (props: Props) => {

    //timer
    const [timer, setTimer] = useState<Timer | undefined>(undefined)

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

    //api
    const { data: studyRecordData, refetch: refetchStudyRecord } = useQuery(StudyRecordQuery, { variables: { studyThemeId: props.studyStatus.nowStudyTheme, studyRecordId: props.studyStatus.nowStudyRecord } })
    const studyRecord = studyRecordData?.StudyRecord as Required<StudyRecord>
    const studyTimeOnServer = new Time((studyRecord?.studyTime || 0) / 1000)
    //const centerMessageWhenPlay = `総勉強時間: 約${seconds.formatJapanese()}` //これだと休憩後におかしいことになる
    const centerMessageWhenPlay = `` //一旦勉強中は何も表示しない
    const centerMessageWhenPause = `総勉強時間: 約${studyTimeOnServer.formatJapanese()}`
    const centerMessage = props.studyStatus.playStatus === "PAUSE" ? centerMessageWhenPlay : centerMessageWhenPause

    //query
    //studyThemeを取得
    const { data: studyThemeData } = useQuery(StudyThemeQuery, {
        variables: { userId, studyThemeId: props.studyStatus.nowStudyTheme }
    });
    const studyTheme = studyThemeData?.StudyTheme as Required<StudyTheme>

    //mutation
    const [pauseStudy] = useMutation(PauseStudyMutation)
    const [resumeStudy] = useMutation(ResumeStudyMutation)

    const onFinish = () => {
        console.log("on finish")
        props.onFinish("") //TODO: IDなどを渡す
        props.onClose()
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