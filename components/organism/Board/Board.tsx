import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MutationStartStudyArgs, StudyRecord } from "../../../graphQL/generated/types";
import { StartStudyMutation } from "../../../graphQL/StudyThemeStatements";
import useLocal from "../../../models/hooks/useLocal";
import { StudyStatus } from "../../../models/StudyStatus";
import ListViewModel from "../../../models/viewModel/ListViewModel";
import CountingScreen from "../../templates/CountingScreen";
import GoalSettingModal from "../../templates/GoalSettingModal";
import List from "./List";
import { StudyRecordSummary } from "./StudyRecordSummary";

interface Props {
    lists: ListViewModel[]
    refetch: () => void
}

const BoardComponent = (props: Props) => {
    //modal
    const [openCountingScreen, setOpenCountingScreen] = useState(false)
    const [openGoalSettingScreen, setOpenGoalSettingScreen] = useState(false)
    const [startStudy] = useMutation(StartStudyMutation)

    //persist含めた学習状況のステータス(現在学習中の勉強テーマ)
    const [studyStatus, setStudyStatus] = useState(new StudyStatus()) //名前が分かりにくい
    const [onClickedCardId, setOnClickedCardId] = useState("") //これatomにできない？


    const onCloseGoalSettingScreen = () => {
        setOpenGoalSettingScreen(false)
    }

    const onClickCard = (cardId: string) => {
        //ここまでpropsが伝播してくるのやだな〜
        setOnClickedCardId(cardId)
        setOpenGoalSettingScreen(true)
    }

    const onFinishStudy = () => {
        console.log("Board onFinishStudy")
        //学習が終了したらLocalStorageから消して作り直す
        studyStatus.finish()
    }

    const closeCountingScreen = () => {
        console.log("delete all study status")
        setOpenCountingScreen(false)
        setStudyStatus(new StudyStatus())
        window.location.reload()
    }

    const onClickStartStudy = async (studyThemeId: string) => {
        //api
        const userId = useLocal("USER_ID")!
        const input: MutationStartStudyArgs = { input: { userId, studyThemeId } }
        const output = await startStudy({ variables: input })
        const data: StudyRecord = output.data.startStudy
        console.log(`set record id = ${data.studyRecordId!}`)

        //学習の開始
        studyStatus.start(studyThemeId, data.studyRecordId!)
        console.log("open counting screen by cliecked button")
        setOpenCountingScreen(true)
    }

    //勉強中であればモーダルを開く
    useEffect(() => {
        if (studyStatus.isStudying() || studyStatus.isResting()) {
            setOpenCountingScreen(true)
        }
    }, [props.lists])

    return (
        <div>
            <Board>
                {props.lists.map((list, index) => {
                    return <List
                        refetch={props.refetch}
                        listTitle={list.listTitle}
                        cards={list.cards}
                        listId={list.listId}
                        key={list.listId}
                        index={index}
                        onClickCard={onClickCard}
                        toggleEditingTitle={() => { }}
                        onClickStartStudy={onClickStartStudy}
                    />
                })}

                <ScrollableFrame>

                    <StudyRecordSummary />
                </ScrollableFrame>
            </Board>

            <CountingScreen
                studyStatus={studyStatus}
                open={openCountingScreen}
                onFinish={onFinishStudy}
                onClose={closeCountingScreen}
            />

            <GoalSettingModal
                open={openGoalSettingScreen}
                onClose={onCloseGoalSettingScreen}
                studyThemeId={onClickedCardId}
            />
        </div>
    )
};

export default BoardComponent;

const Board = styled.div`
  height: 100%;
  /* height: 92%; */
  display: flex;
  /* overflow-x: auto; */
  -webkit-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`

const ScrollableFrame = styled.div`
    height:fit-content;
    max-height: 85vh;
    overflow-y:scroll;
`