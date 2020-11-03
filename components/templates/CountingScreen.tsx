import { Button, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Time from "../../models/Time";
import { Timer } from "../../models/Timer";
import StartStopButton, { StartStopButtonStatus } from "../atoms/buttons/StartStopButton";
import CircleProgress from "../atoms/CircleProgress";
import Spacer from "../atoms/Spacer";
import { MaxWidth } from "../container/MaxWidth";
import { VerticalCenterColumn, VerticalCenterRow } from "../container/VerticalCenter";
import CloseIcon from '@material-ui/icons/Close';
import { useMutation } from "@apollo/client";
import { EndStudyMutation, PauseStudyMutation, ResumeStudyMutation, StartStudyMutation } from "../../graphQL/StudyThemeStatements";
import { PauseStudyInput, ResumeStudyInput, StartStudyInput } from "../../graphQL/generated/types";
import useLocal from "../../models/hooks/useLocal";
import { StudyStatus } from "../../models/StudyStatus";
interface Props {
    open: boolean
    studyStatus: StudyStatus
    onClose: () => void
    onFinish: (title: string) => void
    goalTime: Time //外から値を注入することも可能
}

export default (props: Props) => {
    //timer
    const [timer, setTimer] = useState<Timer | undefined>(undefined)

    //描画系
    const [topStateMessage, setTopStateMessage] = useState("")
    const [canFinish, setCanFinish] = useState(false)

    //状態？描画？両方？
    const [buttonStatus, setButtonStatus] = useState<StartStopButtonStatus>("PLAY")
    const [seconds, setSeconds] = useState<Time>(new Time(0))
    const [goalTime, setGoalTime] = useState<Time>(new Time(0))

    //状態系
    const userId = useLocal("USER_ID")!

    //mutation
    const [pauseStudy] = useMutation(PauseStudyMutation)
    const [resumeStudy] = useMutation(ResumeStudyMutation)
    const [endStudy] = useMutation(EndStudyMutation)

    const onFinish = () => {
        console.log("on finish")
        props.studyStatus.finish()
        props.onFinish("") //TODO: IDなどを渡す
        props.onClose()
    }

    const initialize = () => {
        console.log("CountingScreen-initialize")
        setTopStateMessage("スタートボタンを押して勉強を始めよう")
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
            setSeconds(new Time(0))
            setButtonStatus("PLAY")
        }
    }

    useEffect(() => {
        if (props.open) {
            initialize()
        }
    }, [props.open])

    useEffect(() => {
        //Statusが持つべき内容むにゃあ
        setGoalTime(props.goalTime)
    }, [props.goalTime])

    //ただTimerを動かす
    const startTimer = (startDate: Date = new Date()) => {
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

    const pauseTimer = () => {
        //API
        const input: PauseStudyInput = {
            userId,
            studyThemeId: props.studyStatus.nowStudyTheme!,
            studyRecordId: props.studyStatus.nowStudyRecord!
        }
        pauseStudy({ variables: { input } })

        //ここまでの秒数を記録する
        const seconds = timer?.stop()
        props.studyStatus.setInsetSeconds(new Time(seconds || 0))
    }

    const onClickStartButton = (prevStatus: StartStopButtonStatus, nowStatus: StartStopButtonStatus) => {
        props.studyStatus.setPlayStatus(nowStatus)
        if (prevStatus == "PLAY") {
            setTopStateMessage("集中して勉強中")
            resumeTimer()
            setCanFinish(false)
        } else if (prevStatus == "PAUSE") {
            setTopStateMessage("スタートボタンを押して再開")
            pauseTimer()
            setCanFinish(true)
        }
    }

    const renderMain = () => {
        return (
            <VerticalCenterColumn>
                <TopStatement>
                    {topStateMessage}
                </TopStatement>

                <VerticalCenterColumn>
                    <StartStopButton onClick={onClickStartButton} initialStatus={buttonStatus} />
                </VerticalCenterColumn>

                <Spacer space={10} />

                <VerticalCenterRow style={{ visibility: !canFinish ? "hidden" : "visible" }}>
                    <Button color="primary" variant="contained" onClick={onFinish} >
                        勉強終了して記録する
                    </Button>
                </VerticalCenterRow>

                <TimeStatement>
                    {seconds.format()} / {goalTime.format()}
                </TimeStatement>

                <Spacer space={20} />

                <div style={{ position: "relative" }}>
                    <div style={{ width: "80%", left: "10%", position: "relative" }}>
                        <CircleProgress progress={seconds.getValue() / goalTime.getValue()} />
                    </div>
                </div>
            </VerticalCenterColumn>
        )

    }

    return (
        <Dialog fullScreen open={props.open} onClose={props.onClose} >
            <RightTop>
                <IconButton aria-label="close" onClick={props.onClose}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </RightTop>

            <VerticalCenterRow style={FullScreenStyle} className="shallowblue-background">
                <MaxWidth>
                    {renderMain()}
                </MaxWidth>
            </VerticalCenterRow>
        </Dialog>
    )
}

const RightTop = styled.div`
position:absolute;
right:10px;
top:10px;
`

const TopStatement = styled.h1`
    margin-top:60px;
    text-align:center;
    display: inline-block;
    height:2.5em;
`

const TimeStatement = styled.h3`
    margin-top:20px;
    text-align:center;
`

const FullScreenStyle = {
    minHeight: "100vh"
}