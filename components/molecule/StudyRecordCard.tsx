import React from "react";
import styled from "styled-components";
import { ComponentsStyle } from "../../const/ComponentsStyle";
import { MyColors } from "../../const/MyColors";
import { BoldText, MainText } from "../atoms/MainText";
interface Props {
    title: string
    timeText: string
    learned: string
}

const StudyRecordCard = (props: Props) => {
    return (
        <Card>
            <MainText>
                {props.title}
            </MainText>
            <div>
                <BoldText>
                    勉強時間:
                </BoldText>
                <TimeText>
                    {" " + props.timeText}
                </TimeText>
            </div>
            <LearnedText>

                {props.learned}
            </LearnedText>
        </Card>
    )
};

export default StudyRecordCard;

const Card = styled.div`  
    position:relative;
    background: ${MyColors.frameColor};
    width: 90%;
    /* width: ${ComponentsStyle.CardWidth}px; */
    margin:5px;
    padding:10px;

    border-radius: 5px;
    border: 1px solid ${MyColors.subTextColor};
    /* box-shadow: 0 1px 0 ${MyColors.subTextColor}; */
    font-size: 15px;
    overflow-wrap: break-word;
    overflow-y: hidden;
    /* min-height: 18px; */
`

const TimeText = styled.span`
    color:${MyColors.textColor};
`

const LearnedText = styled.span`
    color:${MyColors.textColor};
`