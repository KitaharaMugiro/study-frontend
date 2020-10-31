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
interface Props {
    open: boolean
    onClose: () => void
    onFinish: (title: string) => void
    goalTime: Time //外から値を注入することも可能
}

export default (props: Props) => {
    const [seconds, setSeconds] = useState<Time>(new Time(0))
    const [timer, setTimer] = useState<Timer | undefined>(undefined)
    const [canFinish, setCanFinish] = useState(false)
    const [insetSeconds, setInsetSeconds] = useState(0)
    const [topStateMessage, setTopStateMessage] = useState("")
    const [goalTime, setGoalTime] = useState<Time>(new Time(0))

    const onFinish = () => {
        props.onFinish("") //TODO: IDなどを渡す
        onGainMoney()
    }

    const onGainMoney = () => {
        props.onClose()
    }

    const initialize = () => {
        console.log("CountingScreen-initialize")
        setTopStateMessage("スタートボタンを押して勉強を始めよう")
        setSeconds(new Time(0))
        setCanFinish(false)
        setInsetSeconds(0)
    }

    useEffect(() => {
        if (props.open) {
            initialize()
        }
    }, [props.open])

    useEffect(() => {
        setGoalTime(props.goalTime)
    }, [props.goalTime])

    const startTimer = () => {
        const timer = new Timer(new Date(), insetSeconds)
        timer?.start((second) => {
            setSeconds(new Time(second))
        })
        setTimer(timer)
    }

    const pauseTimer = () => {
        const seconds = timer?.stop()
        setInsetSeconds(seconds || 0)
    }

    const onClickStartButton = (status: StartStopButtonStatus) => {
        if (status == "PLAY") {
            setTopStateMessage("集中して勉強中")
            startTimer()
            setCanFinish(false)
        } else if (status == "PAUSE") {
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
                    <StartStopButton onClick={onClickStartButton} />
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