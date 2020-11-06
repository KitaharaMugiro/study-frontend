import { useMutation } from "@apollo/client";
import { Button, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close';
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MyColors } from "../../const/MyColors";
import { PauseStudyInput, ResumeStudyInput } from "../../graphQL/generated/types";
import { EndStudyMutation, PauseStudyMutation, ResumeStudyMutation } from "../../graphQL/StudyThemeStatements";
import { fetchResponse } from "../../models/atoms/TestAtom";
import useLocal from "../../models/hooks/useLocal";
import { StudyStatus } from "../../models/StudyStatus";
import Time from "../../models/Time";
import { Timer } from "../../models/Timer";
import StartStopButton, { StartStopButtonStatus } from "../atoms/buttons/StartStopButton";
import CircleProgress from "../atoms/CircleProgress";
import Spacer from "../atoms/Spacer";
import { Center } from "../container/Center";
import { VerticalCenterColumn, VerticalCenterRow } from "../container/VerticalCenter";
import DoubleTriangles from "../molecule/DoubleTriangles";
interface Props {
    open: boolean
    studyStatus: StudyStatus
    onClose: () => void
    onFinish: (title: string) => void
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

    return (
        <Dialog fullScreen open={props.open} onClose={props.onClose} >
            <Background>
                <Center>

                    <Card>
                        <RightTop>
                            <IconButton aria-label="close" onClick={props.onClose}>
                                <CloseIcon fontSize="large" />
                            </IconButton>
                        </RightTop>

                        <VerticalCenterColumn>
                            <Spacer space={60} />
                            <TopStatement>
                                {"タイトルを取得"}
                            </TopStatement>

                            <Spacer space={20} />

                            <div style={{ position: "relative", width: "100%" }}>
                                <VerticalCenterColumn style={{ width: "10%", left: "3%", height: "100%", position: "absolute" }}>
                                    <DoubleTriangles />
                                </VerticalCenterColumn>
                                <div style={{ width: "70%", left: "15%", position: "relative" }}>
                                    <CircleProgress progress={seconds.getValue() / goalTime.getValue()} centerText={"25:00"} />
                                </div>
                            </div>

                            <Spacer space={20} />

                            <VerticalCenterColumn>
                                <StartStopButton onClick={onClickStartButton} initialStatus={buttonStatus} />
                            </VerticalCenterColumn>
                            <Spacer space={10} />

                            <VerticalCenterRow style={{ visibility: !canFinish ? "hidden" : "visible" }}>
                                <Button color="primary" variant="contained" onClick={onFinish} >
                                    勉強終了して記録する
                                </Button>
                            </VerticalCenterRow>
                        </VerticalCenterColumn>
                    </Card>

                </Center>
            </Background>

        </Dialog>
    )
}
const Background = styled.div`
    width:100%;
    height:100%;
    background: #159957;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #155799, #159957);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #155799, #159957); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const Card = styled.div`
    position:relative;
    background-color:white;
    width:95vw;
    height:100vh;
    max-width:400px;
    max-height:700px;
    filter: drop-shadow(0.4rem 0.4rem 0.7rem rgba(0, 0, 0, 0.8));
`

const RightTop = styled.div`
    position:absolute;
    right:10px;
    top:10px;
`

const TopStatement = styled.h1`
    margin-left:60px;
    margin-right:60px;
    text-align:center;
    display: inline-block;
    color: ${MyColors.textBoldGray};
    font-size:20px;
    font-weight:600;
`
