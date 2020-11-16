import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { ListId, MutationCreateStudyThemeArgs, StudyTheme, UpdateStudyThemeInput } from "../../../graphQL/generated/types";
import { CreateStudyThemeMutation, UpdateStudyThemeMutation } from "../../../graphQL/StudyThemeStatements";
import { getNowDateISOString } from "../../../models/getNowDateISOString";
import useLocal from "../../../models/hooks/useLocal";
import StudyThemeViewModel from "../../../models/viewModel/StudyThemeViewModel";
import { ArrowLeftButton, ArrowRightButton } from "../../atoms/buttons/ArrowButton";
import PlusButton from "../../atoms/buttons/PlusButton";
import { VerticalCenterColumn, VerticalCenterRow } from "../../container/VerticalCenter";
import CreateCardModal from "../../templates/CreateCardModal";
import MyCard from "./MyCard";

interface Props {
    listId: ListId
    listTitle: string
    cards: StudyThemeViewModel[]
    index: number
    toggleEditingTitle: () => void
    onClickCard: (cardId: string) => void
    onClickStartStudy: (cardId: string) => void
    refetch: () => void
}

export default (props: Props) => {
    //api
    const [updateStudyTheme] = useMutation(UpdateStudyThemeMutation)
    const [createStudyTheme] = useMutation(CreateStudyThemeMutation)

    //modal
    const [openCreateCard, setOpenCreateCard] = useState(false)
    const onClickPlus = () => {
        setOpenCreateCard(true)
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

    // カード移動
    const changeStatus = async (studyThemeId: string, direction: number) => {
        const listIds = [ListId.Todo, ListId.Doing, ListId.Done]
        const nowIndex = listIds.indexOf(props.listId)
        const nextIndex = nowIndex + direction
        const newListId = listIds[nextIndex]

        console.log(`${studyThemeId} status change from ${props.listId} to ${newListId}`)

        //api
        const userId = useLocal("USER_ID")!
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

    //view logic
    const renderPlusButton = () => {
        if (props.listId == "TODO" || props.listId == "DOING") {
            return <PlusButton onClick={onClickPlus} />
        }
        return <div />
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
                        <MyCard
                            onClick={(cardId) => props.onClickCard(cardId)}
                            key={card.studyThemeId!}
                            title={card.title!}
                            status={props.listId}
                            studyThemeId={card.studyThemeId!}
                            onClickStartStudy={props.onClickStartStudy}
                            refetch={props.refetch}
                        />
                        {props.listId !== "DONE" && <ArrowRightButton onClick={() => changeStatus(card.studyThemeId!, 1)} />}
                    </VerticalCenterRow>
                ))}
            </VerticalCenterColumn>

            <CreateCardModal
                open={openCreateCard}
                onClose={() => setOpenCreateCard(false)}
                onRegister={onRegister}
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

