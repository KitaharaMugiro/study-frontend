import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryHistogram, VictoryLabel, VictoryStack, VictoryVoronoiContainer } from "victory";

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
    const now = 7
    const t1 = 6
    const t2 = 5
    const groupedData = [
        { key: "数学", dataGroup: [{ date: t2, studyTime: 50 }, { date: now, studyTime: 60 }] },
        { key: "英語", dataGroup: [{ date: t2, studyTime: 20 }, { date: now, studyTime: 20 }] },
        { key: "音楽", dataGroup: [{ date: t1, studyTime: 20 }, { date: now, studyTime: 20 }] },
        {
            key: "", dataGroup: [
                { date: 1, studyTime: 0 },
                { date: 2, studyTime: 0 },
                { date: 3, studyTime: 0 },
                { date: 4, studyTime: 0 },
                { date: 5, studyTime: 0 },
                { date: 6, studyTime: 0 },
                { date: 7, studyTime: 0 }

            ]
        }
    ]

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
                tickValues={["12月27日", "12月28日", "12月29日", "12月30日", "1月1日", "1月2日", "1月3日"]}
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