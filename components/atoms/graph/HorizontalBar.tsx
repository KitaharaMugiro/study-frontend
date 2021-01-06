
import React from "react";
import styled from "styled-components";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from "victory";
import { MyColors } from "../../../const/MyColors";

interface Props {
    maxMinutes: number
    yourMinutes: number
    avgMinutes: number
}

const sharedAxisStyles = {
    tickLabels: {
        fill: MyColors.textColor
    },
    axisLabel: {
        fill: MyColors.textColor
    },
    axis: {
        stroke: MyColors.textColor
    },
};

export default (props: Props) => {
    return (
        <Frame>
            <VictoryChart
                width={350}
                height={200}
                padding={40}
                theme={VictoryTheme.grayscale}
                domain={{ y: [0, props.maxMinutes], x: [0, 4] }}
            >
                <VictoryGroup horizontal
                    // offset={30}
                    style={{ ...sharedAxisStyles, data: { width: 20 } }}
                    colorScale={["brown", "tomato", "gold"]}
                >
                    <VictoryBar
                        data={[
                            { x: 1, y: props.maxMinutes },
                        ]}
                    />
                    <VictoryBar
                        data={[
                            { x: 2, y: props.avgMinutes },
                        ]}
                    />
                    <VictoryBar
                        data={[
                            { x: 3, y: props.yourMinutes },
                        ]}
                    />
                </VictoryGroup>

                <VictoryAxis
                    dependentAxis
                    style={{ ...sharedAxisStyles }}
                />


                <VictoryAxis
                    crossAxis
                    tickValues={["Max", "Avg", "You"]}
                    style={{ ...sharedAxisStyles }}
                />
            </VictoryChart>
        </Frame>
    );

}

const Frame = styled.div`
    margin-bottom:10px;
`