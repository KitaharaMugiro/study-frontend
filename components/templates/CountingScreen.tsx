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

interface Props {
    open: boolean
    onClose: () => void
    onFinish: (title: string) => void
}

export default (props: Props) => {
    const [seconds, setSeconds] = useState(0)
    const onFinish = () => {
        props.onFinish("") //TODO: IDなどを渡す
        props.onClose()
    }

    useEffect(() => {
        const timer = new Timer()
        timer.start((second) => {
            setSeconds(second)
        })
    }, [])

    return (
        <Dialog fullScreen open={props.open} onClose={props.onClose} >
            <VerticalCenter>
                <TopStatement>
                    1時間勉強頑張って！
                </TopStatement>

                <TimeStatement>
                    {Timer.format(seconds)} / 1:00:00
                </TimeStatement>

                <Spacer space={50} />

                <Progress progress={seconds / 60 / 60} />

                <Spacer space={50} />

                <Center>
                    <Button color="primary" variant="contained" onClick={onFinish} >勉強を終える </Button>
                </Center>

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