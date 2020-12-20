import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryHistogram, VictoryLabel, VictoryStack, VictoryVoronoiContainer } from "victory";
import useGraphQL from "../../../graphQL/useGraphQL";
import { aggregateRecordsByWeek } from "../../../models/logics/aggregateCards";
import getRecentDates from "../../../models/logics/getRecentDates";

const sharedAxisStyles = {
    tickLabels: {
        fontSize: 13
    },
    axisLabel: {
        padding: 39,
        fontSize: 13,
        fontStyle: "italic"
    }
};

export default () => {
    const { records, themes, loading } = useGraphQL.queryStudyRecordWithTheme()
    if (loading) return <div />
    const groupedData = aggregateRecordsByWeek(records, themes)

    return (
        <VictoryChart
            height={450}
            scale={{ x: "linear" }}
            containerComponent={
                <VictoryVoronoiContainer
                    style={{}}
                    labels={({ datum }) => datum.key && `${datum.key} ${datum.studyTime}分`
                    }
                />
            }
        >
            <VictoryLabel
                x={225}
                y={25}
                textAnchor="middle"
                text="今週の勉強時間"
            />

            <VictoryStack
                colorScale={[
                    "#16697a",
                    "#db6400",
                    "#ffa62b",
                    "#fca3cc",
                    "#bedbbb",
                    "#8db596",
                    "#92817a",
                    "#707070"
                ]}
            >
                {groupedData.map(({ key, dataGroup }) => {
                    const data = dataGroup.map(d => {
                        return { ...d, key }
                    })
                    return (
                        <VictoryBar
                            key={key}
                            data={data}
                            x="date"
                            y="studyTime"
                        // binSpacing={8}
                        // style={{
                        //     data: { strokeWidth: 0 }
                        // }}
                        />
                    );
                })}
            </VictoryStack>

            <VictoryAxis
                tickCount={7}
                tickValues={getRecentDates(7)}
                style={sharedAxisStyles}
            />

            {/* <VictoryAxis
                dependentAxis
                label="時間"
                style={sharedAxisStyles}
            /> */}

            <VictoryAxis style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "transparent" }
            }} />
        </VictoryChart>
    );
};