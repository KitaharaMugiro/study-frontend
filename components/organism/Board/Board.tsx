import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ListId, MutationStartStudyArgs, StudyRecord, StudyTheme } from "../../../graphQL/generated/types";
import { CreateStudyThemeMutation, StartStudyMutation } from "../../../graphQL/StudyThemeStatements";
import useLocal, { useLocalJson } from "../../../models/hooks/useLocal";
import { StudyStatus } from "../../../models/StudyStatus";
import Time from "../../../models/Time";
import CountingScreen from "../../templates/CountingScreen";
import GoalSettingModal from "../../templates/GoalSettingModal";
import List from "./List";

interface Props {
    lists: {
        listId: ListId,
        listTitle: string,
        cards: StudyTheme[]
    }[]
    refetch: () => void
}

export default (props: Props) => {
    //modal
    const [openCountingScreen, setOpenCountingScreen] = useState(false)
    const [openGoalSettingScreen, setOpenGoalSettingScreen] = useState(false)
    const [startStudy] = useMutation(StartStudyMutation)
    const onCloseCountingScreen = () => {
        setOpenCountingScreen(false)
    }
    const onCloseGoalSettingScreen = () => {
        setOpenGoalSettingScreen(false)
    }
    const onClickCard = (cardId: string) => {
        //ここまでpropsが伝播してくるのやだな〜
        setOpenGoalSettingScreen(true)
    }
    const onFinishStudy = () => {
        //学習が終了したらStudyStatusを作り直す(why?)
        setStudyStatus(new StudyStatus())
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

    //persist含めた学習状況のステータス(現在学習中の勉強テーマ)
    const [studyStatus, setStudyStatus] = useState(new StudyStatus()) //名前が分かりにくい

    //勉強中であればモーダルを開く
    useEffect(() => {
        if (studyStatus.isStudying()) {
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
            </Board>

            <CountingScreen
                studyStatus={studyStatus}
                open={openCountingScreen}
                onClose={onCloseCountingScreen}
                onFinish={onFinishStudy}
                goalTime={new Time(1 * 60)} />

            <GoalSettingModal
                open={openGoalSettingScreen}
                onClose={onCloseGoalSettingScreen}
            />
        </div>
    )
}

const Board = styled.div`
  height: 100%;
  /* height: 92%; */
  display: flex;
  overflow-x: auto;
  -webkit-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`