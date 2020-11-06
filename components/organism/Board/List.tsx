import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CreateStudyThemeInput, ListId, MutationCreateStudyThemeArgs, MutationStartStudyArgs, StartStudyInput, StudyRecord, StudyTheme, UpdateStudyThemeInput } from "../../../graphQL/generated/types";
import { CreateStudyThemeMutation, StartStudyMutation, UpdateStudyThemeMutation } from "../../../graphQL/StudyThemeStatements";
import { getNowDateISOString } from "../../../models/getNowDateISOString";
import useLocal from "../../../models/hooks/useLocal";
import { StudyStatus } from "../../../models/StudyStatus";
import Time from "../../../models/Time";
import { ArrowLeftButton, ArrowRightButton } from "../../atoms/buttons/ArrowButton";
import PlusButton from "../../atoms/buttons/PlusButton";
import { VerticalCenterColumn, VerticalCenterRow } from "../../container/VerticalCenter";
import CountingScreen from "../../templates/CountingScreen";
import CreateCardModal from "../../templates/CreateCardModal";
import GoalSettingModal from "../../templates/GoalSettingModal";
import MyCard from "./MyCard";

interface Props {
    listId: ListId
    listTitle: string
    cards: StudyTheme[]
    index: number
    toggleEditingTitle: () => void
    refetch: () => void
}

export default (props: Props) => {
    const [openCreateCard, setOpenCreateCard] = useState(false)
    const [openCountingScreen, setOpenCountingScreen] = useState(false)
    const [openGoalSettingScreen, setOpenGoalSettingScreen] = useState(false)
    const [createStudyTheme] = useMutation(CreateStudyThemeMutation)

    const [studyStatus, setStudyStatus] = useState(new StudyStatus())

    const [startStudy] = useMutation(StartStudyMutation)
    const [updateStudyTheme] = useMutation(UpdateStudyThemeMutation)
    const userId = useLocal("USER_ID")!

    const onFinishStudy = () => {
        //学習の終了
        setStudyStatus(new StudyStatus())
    }

    const onCloseCountingScreen = () => {
        console.log("close screen")
        setOpenCountingScreen(false)
    }

    useEffect(() => {
        //リストの回数だけ開いちゃうの注意
        console.log("check is studying")
        const themeIdList = props.cards.map(c => c.studyThemeId as string)
        if (studyStatus.isStudyingTheThemes(themeIdList)) {
            setOpenCountingScreen(true)
        }
    }, [props.cards])

    const onClickPlus = () => {
        setOpenCreateCard(true)
    }

    const changeStatus = async (studyThemeId: string, direction: number) => {
        const listIds = [ListId.Todo, ListId.Doing, ListId.Done]
        const nowIndex = listIds.indexOf(props.listId)
        const nextIndex = nowIndex + direction
        const newListId = listIds[nextIndex]

        console.log(`${studyThemeId} status change from ${props.listId} to ${newListId}`)

        //api
        const input: UpdateStudyThemeInput = {
            userId,
            studyThemeId: studyThemeId,
            listId: newListId,
            clientUpdatedAt: getNowDateISOString()
        }
        // レスポンスが悪そうな気がする・・・
        updateStudyTheme({ variables: { input } }).then(() => {
            props.refetch()
        })
        //ローカルでカードを操作できないかな
    }

    const onClickStartStudy = async (studyThemeId: string) => {
        //api
        const input: MutationStartStudyArgs = { input: { userId, studyThemeId } }
        const output = await startStudy({ variables: input })
        const data: StudyRecord = output.data.startStudy
        console.log(`set record id = ${data.studyRecordId!}`)

        //学習の開始
        studyStatus.start(studyThemeId, data.studyRecordId!)
        console.log("open counting screen by cliecked button")
        setOpenCountingScreen(true)
    }

    const onRegister = async (title: string) => {
        const userId = useLocal("USER_ID")!
        const input: MutationCreateStudyThemeArgs = {
            input: {
                userId,
                title,
                listId: props.listId,
                clientUpdatedAt: getNowDateISOString()
            }
        }
        console.log("createStudyTheme")
        const result = await createStudyTheme({ variables: input })
        console.log(result)
        props.refetch()
    }

    const onCloseGoalSettingScreen = () => {
        setOpenGoalSettingScreen(false)
    }

    const renderPlusButton = () => {
        if (props.listId == "TODO" || props.listId == "DOING") {
            return <PlusButton onClick={onClickPlus} />
        }
        return <div />
    }

    const onClickCard = (cardId: string) => {
        setOpenGoalSettingScreen(true)
    }

    return (
        <List>
            <ListTitle onClick={props.toggleEditingTitle}>
                {props.listTitle}
            </ListTitle>

            <VerticalCenterColumn>
                {renderPlusButton()}

                {props.cards.map((card, index) => (
                    <VerticalCenterRow key={card.studyThemeId}>
                        {props.listId !== "TODO" && <ArrowLeftButton onClick={() => changeStatus(card.studyThemeId!, -1)} />}
                        <div onClick={() => onClickCard(card.studyThemeId!)}>
                            <MyCard
                                key={card.studyThemeId!}
                                title={card.title!}
                                status={props.listId}
                                studyThemeId={card.studyThemeId!}
                                onClickStartStudy={onClickStartStudy}
                                refetch={props.refetch}
                            />
                        </div>
                        {props.listId !== "DONE" && <ArrowRightButton onClick={() => changeStatus(card.studyThemeId!, 1)} />}
                    </VerticalCenterRow>
                ))}
            </VerticalCenterColumn>

            <CreateCardModal
                open={openCreateCard}
                onClose={() => setOpenCreateCard(false)}
                onRegister={onRegister}
            />

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
        </List >
    );
}

const List = styled.div`
    background: #dfe3e6;
    flex-shrink: 0;
    width: 300px;
    height: fit-content;
    margin: 10px;
    margin-right: 0;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  `

const ListTitle = styled.div`
    cursor: pointer;
    padding: 10px;
    overflow-wrap: break-word;
  `

