import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from "victory";

export default () => {
    return (
        <div>
            <VictoryChart
                width={350}
                height={200}
                padding={40}
                theme={VictoryTheme.grayscale}
                domain={{ y: [0, 300], x: [0, 4] }}
            >
                <VictoryGroup horizontal
                    // offset={30}
                    style={{ data: { width: 20 } }}
                    colorScale={["brown", "tomato", "gold"]}
                >
                    <VictoryBar
                        data={[
                            { x: 1, y: 212.4 },
                        ]}
                    />
                    <VictoryBar
                        data={[
                            { x: 2, y: 98.4 },
                        ]}
                    />
                    <VictoryBar
                        data={[
                            { x: 3, y: 10.4 },
                        ]}
                    />
                </VictoryGroup>

                <VictoryAxis
                    dependentAxis
                />


                <VictoryAxis
                    crossAxis
                    tickValues={["Max", "Avg", "You"]}
                />
            </VictoryChart>
        </div>
    );

}
