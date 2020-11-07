import Dialog from "@material-ui/core/Dialog";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StudyStatus } from "../../models/StudyStatus";
import Time from "../../models/Time";
import { Center } from "../container/Center";
import RestingCard from "../organism/CountingScreen/RestingCard";
import StudyingCard from "../organism/CountingScreen/StudyingCard";

interface Props {
    open: boolean
    studyStatus: StudyStatus
    onClose: () => void
    onFinish: () => void
}

export default (props: Props) => {
    const [studyOrRest, setStudyOrRest] = useState<"STUDY" | "REST">("STUDY")

    useEffect(() => {
        if (props.studyStatus.isStudying()) {
            console.log("勉強中")
            setStudyOrRest("STUDY")
        } else {
            console.log("休憩中")
            setStudyOrRest("REST")
        }
    }, [])

    const onFinishRest = () => {
        //STUDYにして学習を再開する -> StudyStatusの勉強時間を初期化
        setStudyOrRest("STUDY")
        props.studyStatus.setInitialStudyTime()
        props.studyStatus.setIsRestTime(false)
    }

    const onFinishGoalTime = () => {
        setStudyOrRest("REST")
        props.studyStatus.setIsRestTime(true)
        props.studyStatus.setInitialStudyTime()
    }

    const onClickClose = () => {
        //勉強時間 > 0なら確認する
        props.onClose()
    }

    const onClickFinish = () => {
        //記録するかしないか確認するモーダルにする
        props.onFinish()
    }

    const renderCard = () => {
        if (studyOrRest === "STUDY") {
            console.log("")
            return (<StudyingCard
                open={props.open}
                onClose={onClickClose}
                onFinish={onClickFinish}
                studyStatus={props.studyStatus}
                onFinishGoalTime={onFinishGoalTime}
            />)
        } else {
            return (<RestingCard
                open={props.open}
                onClose={onClickClose}
                studyStatus={props.studyStatus}
                onFinishRest={onFinishRest}
            />)
        }
    }

    return (
        <Dialog fullScreen open={props.open} onClose={props.onClose} >
            <Background>
                <Center>
                    {renderCard()}
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