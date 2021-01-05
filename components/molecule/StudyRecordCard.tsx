import React from "react";
import styled from "styled-components";
import { ComponentsStyle } from "../../const/ComponentsStyle";
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
                    今回の勉強時間:
                </BoldText>
                {" " + props.timeText}
            </div>
            {props.learned}
        </Card>
    )
};

export default StudyRecordCard;

const Card = styled.div`  
    position:relative;
    background: white;
    width: ${ComponentsStyle.CardWidth}px;
    margin:5px;
    padding:10px;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
    font-size: 15px;
    overflow-wrap: break-word;
    overflow-y: hidden;
    /* min-height: 18px; */
`
