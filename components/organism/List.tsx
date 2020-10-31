import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { StudyTheme } from "../../graphQL/generated/types";
import { CreateStudyThemeMutation } from "../../graphQL/StudyThemeStatements";
import useLocal from "../../models/hooks/useLocal";
import Time from "../../models/Time";
import PlusButton from "../atoms/buttons/PlusButton";
import { VerticalCenterColumn } from "../container/VerticalCenter";
import CountingScreen from "../templates/CountingScreen";
import CreateCardModal from "../templates/CreateCardModal";
import MyCard from "./MyCard";

interface Props {
    listId: "TODO" | "DOING" | "DONE"
    listTitle: string
    cards: StudyTheme[]
    index: number
    toggleEditingTitle: () => void
    refetch: () => void
}

export default (props: Props) => {
    const [openCreateCard, setOpenCreateCard] = useState(false)
    const [openCountingScreen, setOpenCountingScreen] = useState(false)

    const [createStudyThemes] = useMutation(CreateStudyThemeMutation)

    const onClickPlus = () => {
        setOpenCreateCard(true)
    }

    const onRegister = async (title: string) => {
        const userId = useLocal("USER_ID")
        await createStudyThemes({ variables: { userId, title } })
        props.refetch()
    }

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
                    <MyCard
                        key={card.studyThemeId!}
                        title={card.title!}
                        studyThemeId={card.studyThemeId!}
                        onClickStartStudy={() => { setOpenCountingScreen(true) }}
                    />
                ))}
            </VerticalCenterColumn>

            <CreateCardModal
                open={openCreateCard}
                onClose={() => setOpenCreateCard(false)}
                onRegister={onRegister}
            />

            <CountingScreen
                open={openCountingScreen}
                onClose={() => setOpenCountingScreen(false)}
                onFinish={() => { }}
                goalTime={new Time(1 * 60)} />
        </List>
    );
}

const List = styled.div`
    background: #dfe3e6;
    flex-shrink: 0;
    width: 272px;
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
