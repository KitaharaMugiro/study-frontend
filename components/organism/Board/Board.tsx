import React from "react";
import styled from "styled-components";
import { ListId, StudyTheme } from "../../../graphQL/generated/types";
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
    return (
        <Board>
            {props.lists.map((list, index) => {
                return <List
                    refetch={props.refetch}
                    listTitle={list.listTitle}
                    cards={list.cards}
                    listId={list.listId}
                    key={list.listId}
                    index={index}
                    toggleEditingTitle={() => { }} />;
            })}

        </Board>
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