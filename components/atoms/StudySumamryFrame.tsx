import React from "react"
import styled from "styled-components"
import { MyColors } from "../../const/MyColors"
import useGraphQL from "../../graphQL/useGraphQL"
import Time from "../../models/Time"
import HorizontalBar from "./graph/HorizontalBar"
import { GrayRoundFrame } from "./GrayRoundFrame"
import { BoldText } from "./MainText"

export const StudySummaryFrame = () => {
    const { summary, refetch, loading } = useGraphQL.queryStudySummary()
    if (loading) return <div />

    const avgStudyTime = new Time(summary?.avgStudyTime || 0)
    const yourStudyTime = new Time(summary?.yourStudyTime || 0)
    const maxStudyTime = new Time(summary?.maxStudyTime || 0)

    return (
        <GrayRoundFrame>
            <HorizontalBar
                maxMinutes={maxStudyTime.getValue() / 60}
                avgMinutes={avgStudyTime.getValue() / 60}
                yourMinutes={yourStudyTime.getValue() / 60}

            />
            <Text>
                <BoldText>あなたの今週の勉強時間: </BoldText> {yourStudyTime.formatJapanese()}
            </Text>
            <Text>
                <BoldText>全国の平均勉強時間: </BoldText> {avgStudyTime.formatJapanese()}
            </Text>
            <Text>
                <BoldText>全国で一番頑張っている人: </BoldText> {maxStudyTime.formatJapanese()}
            </Text>
        </GrayRoundFrame>
    )
}

const Text = styled.div`
    color: ${MyColors.textColor}
`