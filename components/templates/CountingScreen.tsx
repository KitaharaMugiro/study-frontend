import { useMutation } from "@apollo/client";
import Dialog from "@material-ui/core/Dialog";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MutationEndStudyArgs } from "../../graphQL/generated/types";
import { EndStudyMutation } from "../../graphQL/StudyThemeStatements";
import useLocal from "../../models/hooks/useLocal";
import { StudyStatus } from "../../models/StudyStatus";
import { Center } from "../container/Center";
import LearnedDialog from "../organism/CountingScreen/LearnedDialog";
import RestingCard from "../organism/CountingScreen/RestingCard";
import StudyingCard from "../organism/CountingScreen/StudyingCard";

interface Props {
    open: boolean
    studyStatus: StudyStatus
    onFinish: () => void
}

export default (props: Props) => {
    const [studyOrRest, setStudyOrRest] = useState<"STUDY" | "REST">("STUDY")
    const [openLearnedDialog, setOpenLearnedDialog] = useState(false)

    //api
    const [endStudy] = useMutation(EndStudyMutation)


    useEffect(() => {
        if (props.studyStatus.isStudying()) {
            console.log("勉強中")
            setStudyOrRest("STUDY")
        } else if (props.studyStatus.isResting()) {
            console.log("休憩中")
            setStudyOrRest("REST")
        } else {
            console.log("初回")
            setStudyOrRest("STUDY")
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

    const onClickFinish = () => {
        setOpenLearnedDialog(true)
    }

    const renderCard = () => {
        if (studyOrRest === "STUDY") {
            console.log("")
            return (<StudyingCard
                open={props.open}
                onClose={onClickFinish}
                onFinish={onClickFinish}
                studyStatus={props.studyStatus}
                onFinishGoalTime={onFinishGoalTime}
            />)
        } else {
            return (<RestingCard
                open={props.open}
                onClose={onClickFinish}
                studyStatus={props.studyStatus}
                onFinishRest={onFinishRest}
            />)
        }
    }

    const onLearnedRegister = async (text: string) => {
        console.log(`Learned = ${text}`)
        const userId = useLocal("USER_ID")!
        const input: MutationEndStudyArgs = {
            input: {
                userId,
                studyThemeId: props.studyStatus.nowStudyTheme!,
                studyRecordId: props.studyStatus.nowStudyRecord!,
                learned: text
            }
        }
        const output = await endStudy({ variables: input })
        setOpenLearnedDialog(false)
        props.onFinish()
    }

    return (
        <Dialog fullScreen open={props.open} onClose={onClickFinish} >
            <Background>
                <Center>
                    {renderCard()}
                </Center>
            </Background>

            <LearnedDialog
                open={openLearnedDialog}
                onClose={() => setOpenLearnedDialog(false)}
                onRegister={onLearnedRegister}
            />
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