import React from "react"
import useGraphQL from "../../graphQL/useGraphQL"
import groupbyRecords from "../../models/logics/groupbyRecords"
import { GrayRoundFrame } from "../atoms/GrayRoundFrame"
import { SectionText } from "../atoms/SectionText"
import { Spacer10 } from "../atoms/Spacer"
import StudyRecordCard from "./StudyRecordCard"
import shortid from 'shortid';

export default () => {
    const { records, themes, loading } = useGraphQL.queryStudyRecordWithTheme()
    if (loading) return <div />
    const data = groupbyRecords(records, themes)

    const renderList = () => {
        return data.map(d => {
            return (<div key={d.dateText}>
                <SectionText title={d.dateText} />
                <GrayRoundFrame style={{ width: 270 }}>
                    {d.dataGroup.map(r => {
                        return (
                            <StudyRecordCard
                                key={shortid.generate()}
                                title={r.title}
                                learned={r.learned}
                                timeText={r.timeText} />
                        )
                    })}

                </GrayRoundFrame>
                <Spacer10 />

            </div>)
        })
    }


    return (
        <div>
            {renderList()}
        </div>
    )
}