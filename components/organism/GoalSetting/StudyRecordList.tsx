import NotesIcon from '@material-ui/icons/Notes';
import React from "react";
import styled from "styled-components";
import { MyColors } from '../../../const/MyColors';
import { StudyRecordsViewModel } from "../../../models/viewModel/StudyRecordsViewModel";
import { MainText } from "../../atoms/MainText";
import { Spacer20 } from "../../atoms/Spacer";
import StudyRecordCard from "../../molecule/StudyRecordCard";

interface Props {
    studyRecords: StudyRecordsViewModel
}

export const StudyRecordList = (props: Props) => {

    const StudyRecordCards = () => {
        return props.studyRecords.getSortedRecords().map(record => {
            const title = record.getDateText()
            const timeText = record.getStudyTimeText()
            return <StudyRecordCard
                title={title}
                timeText={timeText}
                learned={record.learned!}
            />
        })
    }

    return (
        <Frame>
            <Flex>
                <Logo>
                    <NotesIcon style={{ color: MyColors.textColor }} />
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
