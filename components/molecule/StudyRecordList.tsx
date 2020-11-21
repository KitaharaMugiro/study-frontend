import React from "react"
import { GrayRoundFrame } from "../atoms/GrayRoundFrame"
import { SectionText } from "../atoms/SectionText"
import { Spacer10 } from "../atoms/Spacer"
import StudyRecordCard from "./StudyRecordCard"

export default () => {
    return (
        <div>
            <SectionText title="2021年1月1日" />
            <GrayRoundFrame style={{ width: 270 }}>
                <StudyRecordCard
                    title="数学"
                    learned="三角関数"
                    timeText="42分" />
                <StudyRecordCard
                    title="数学"
                    learned="三角関数"
                    timeText="42分" />
                <StudyRecordCard
                    title="数学"
                    learned="三角関数"
                    timeText="42分" />
            </GrayRoundFrame>
            <Spacer10 />

            <SectionText title="2020年12月30日" />
            <GrayRoundFrame style={{ width: 270 }}>
                <StudyRecordCard
                    title="数学"
                    learned="三角関数"
                    timeText="42分" />
                <StudyRecordCard
                    title="数学"
                    learned="三角関数"
                    timeText="42分" />
                <StudyRecordCard
                    title="数学"
                    learned="三角関数"
                    timeText="42分" />
            </GrayRoundFrame>
        </div>
    )
}