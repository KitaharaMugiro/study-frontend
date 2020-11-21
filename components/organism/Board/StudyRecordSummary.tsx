
import React from "react"
import styled from "styled-components"
import StackedBar from "../../atoms/graph/StackedBar"
import { SectionText } from "../../atoms/SectionText"
import { StudySummaryFrame } from "../../atoms/StudySumamryFrame"
import StudyRecordList from "../../molecule/StudyRecordList"

export const StudyRecordSummary = () => {
    return (
        <MainFrame>
            <Frame>
                <SectionText title="Summary" />

                <StudySummaryFrame />
            </Frame>

            <Frame>
                <StackedBar />
            </Frame>

            <StudyRecordList />
        </MainFrame>
    )
}


const MainFrame = styled.div`
    padding-top:10px;
    margin-left:20px;
    width: 350px;
`
const Frame = styled.div`
    width: 350px;
`