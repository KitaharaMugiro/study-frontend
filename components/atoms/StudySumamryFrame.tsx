import React from "react"
import styled from "styled-components"
import { MyColors } from "../../const/MyColors"
import HorizontalBar from "./graph/HorizontalBar"
import { GrayRoundFrame } from "./GrayRoundFrame"
import { BoldText } from "./MainText"

export const StudySummaryFrame = () => {
    return (
        <GrayRoundFrame>
            <HorizontalBar />
            <div>
                <BoldText>あなたの今週の勉強時間: </BoldText> 4時間15分
            </div>
            <div>
                <BoldText>全国の平均勉強時間: </BoldText> 4時間15分
            </div>
            <div>
                <BoldText>全国で一番頑張っている人: </BoldText> 4時間15分
            </div>
        </GrayRoundFrame>
    )
}
