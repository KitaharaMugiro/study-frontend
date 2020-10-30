import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog"
import React, { useEffect, useState } from "react"
import { Button } from "@material-ui/core";
import Progress from "../atoms/Progress";
import styled from "styled-components";
import { VerticalCenter } from "../container/VerticalCenter";
import Spacer from "../atoms/Spacer";
import { Center } from "../container/Center";
import { Timer } from "../../models/Timer";
import CircleProgress from "../atoms/CircleProgress";
import { Divider } from "material-ui";
import StartStopButton, { StartStopButtonStatus } from "../atoms/buttons/StartStopButton";

interface Props {
    open: boolean
    onClose: () => void
    onFinish: (title: string) => void
}

export default (props: Props) => {
    const [seconds, setSeconds] = useState(0)
    const [timer, setTimer] = useState<Timer | undefined>(undefined)
    const [showResult, setShowResult] = useState(false)
    const [insetSeconds, setInsetSeconds] = useState(0)

    const onFinish = () => {
        timer?.stop()
        props.onFinish("") //TODO: IDなどを渡す
        setShowResult(true)
    }

    const onGainMoney = () => {
        setShowResult(false)
        props.onClose()
    }

    useEffect(() => {
        if (props.open) {
            setSeconds(0)
        }
    }, [props.open])

    const startTimer = () => {
        const timer = new Timer(new Date(), insetSeconds)
        timer?.start((second) => {
            setSeconds(second)
        })
        setTimer(timer)
    }

    const pauseTimer = () => {
        const seconds = timer?.stop()
        setInsetSeconds(seconds || 0)
    }

    const onClickStartButton = (status: StartStopButtonStatus) => {
        if (status == "PLAY") {
            startTimer()
        } else if (status == "PAUSE") {
            pauseTimer()
        }
    }

    const renderMain = () => {
        if (showResult) {
            return (
                <VerticalCenter>
                    <TopStatement>
                        お疲れ様！
                </TopStatement>

                    <TimeStatement>
                        勉強時間: {Timer.format(seconds)}
                        <br />
                        時給: 750円
                    </TimeStatement>
                    <TopStatement>
                        {Math.floor(750 * seconds / 60 / 60)} 円稼いだよ！
                </TopStatement>

                    <Spacer space={50} />
                </VerticalCenter>
            )
        } else {
            return (
                <VerticalCenter>
                    <TopStatement>
                        スタートボタンを押して勉強を始めよう
                    </TopStatement>

                    {/* <Button color="primary" variant="contained" onClick={onFinish} >
                        スタート
                    </Button> */}
                    <VerticalCenter>
                        <StartStopButton onClick={onClickStartButton} />
                    </VerticalCenter>
                    <TimeStatement>
                        {Timer.format(seconds)} / 1:00:00
                    </TimeStatement>

                    <Spacer space={50} />
                    <div style={{ width: "80%", left: "10%", position: "relative" }}>
                        <CircleProgress progress={seconds / 60 / 60} />
                    </div>
                    <Spacer space={50} />
                </VerticalCenter>
            )
        }
    }

    return (
        <Dialog fullScreen open={props.open} onClose={props.onClose} >
            <VerticalCenter>
                <div style={{ height: 400 }}>
                    {renderMain()}
                </div>
                {/* 
                <Center>
                    {showResult ?
                        <Button color="primary" variant="contained" onClick={onGainMoney} >
                            受け取る
                        </Button>
                        :
                        <Button color="primary" variant="contained" onClick={onFinish} >
                            勉強を終える
                        </Button>
                    }
                </Center> */}

            </VerticalCenter>
        </Dialog>
    )
}

const TopStatement = styled.h1`
    margin-top:60px;
    text-align:center;
`

const TimeStatement = styled.h3`
    margin-top:60px;
    text-align:center;
`