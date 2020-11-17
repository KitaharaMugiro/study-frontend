import styled from "styled-components"
import { MyColors } from "../../../const/MyColors"
import NotesIcon from '@material-ui/icons/Notes';
import React from "react";
import { MainText } from "../../atoms/MainText";
import { Spacer20 } from "../../atoms/Spacer";
import StudyRecordCard from "../../molecule/StudyRecordCard";

export const StudyRecordList = () => {

    const StudyRecordCards = () => {
        const cards = ["aaa", "bbb", "ccc"]
        return cards.map(c => {
            return <StudyRecordCard title={c} />
        })
    }

    return (
        <Frame>
            <Flex>
                <Logo>
                    <NotesIcon />
                </Logo>
                <Title>
                    <MainText>学習履歴</MainText>
                </Title>
            </Flex>
            <Spacer20 />
            {StudyRecordCards()}
        </Frame>
    )
}


const Flex = styled.div`
    display:flex;
`

const Frame = styled.div`
    padding:20px;
    padding-bottom:0px;
`

const Logo = styled.div`
    transform: translateY(2px);
    margin-right:10px;
`

const Title = styled.div`
    flex-grow:2;
`
