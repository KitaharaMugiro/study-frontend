
import React from "react"
import styled from "styled-components"
import StackedBar from "../../atoms/graph/StackedBar"
import { SectionText } from "../../atoms/SectionText"
import { StudySummaryFrame } from "../../atoms/StudySumamryFrame"
import ToBeComeWrap from "../../atoms/wrapper/ToBeComeWrap"
import StudyRecordList from "../../molecule/StudyRecordList"

export const StudyRecordSummary = () => {
    return (
        <MainFrame>
            <Frame>
                <SectionText title="Summary" />
                <Relative>
                    <StudySummaryFrame />
                </Relative>
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

const Relative = styled.div`
    position: relative;
`