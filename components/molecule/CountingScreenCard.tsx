import { Button, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React from "react";
import styled from "styled-components";
import { MyColors } from "../../const/MyColors";
import StartStopButton, { StartStopButtonStatus } from "../atoms/buttons/StartStopButton";
import CircleProgress from "../atoms/CircleProgress";
import { Spacer10, Spacer20, Spacer60 } from "../atoms/Spacer";
import { RightTop10 } from "../container/Positions";
import { VerticalCenterColumn, VerticalCenterRow } from "../container/VerticalCenter";
import DoubleTriangles from "./DoubleTriangles";
interface Props {
    onClose: () => void
    onFinish: () => void
    canFinish: boolean
    finishButtonText: string

    topTitle: string
    onClickUp: () => void
    onClickDown: () => void
    disableUp: boolean
    disableDown: boolean
    progress: number
    centerText: string
    goalTimeText: string
    onClickStartStopButton?: (prevStatus: StartStopButtonStatus, newStatus: StartStopButtonStatus) => void
    initialButtonStatus?: StartStopButtonStatus
    centerMessage?: string
}

const CountingScreenCard = (props: Props) => {

    return (
        <Card>
            <RightTop10>
                <IconButton aria-label="close" onClick={props.onClose}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </RightTop10>

            <VerticalCenterColumn>
                <Spacer60 />
                <TopStatement>
                    {props.topTitle}
                </TopStatement>

                <div style={{ position: "relative", width: "100%" }}>
                    <VerticalCenterColumn style={{ width: "10%", left: "3%", height: "100%", position: "absolute" }}>
                        <DoubleTriangles
                            text={props.goalTimeText}
                            onClickUp={props.onClickUp}
                            onClickDown={props.onClickDown}
                            disableUp={props.disableUp}
                            disableDown={props.disableDown}
                        />
                    </VerticalCenterColumn>
                    <div style={{ width: "70%", left: "15%", position: "relative" }}>
                        <CircleProgress progress={props.progress} centerText={props.centerText} />
                    </div>
                </div>

                <Spacer20 />

                <VerticalCenterColumn>
                    {props.onClickStartStopButton && <StartStopButton onClick={props.onClickStartStopButton} initialStatus={props.initialButtonStatus} />}
                    {props.centerMessage && <CenterText>{props.centerMessage}</CenterText>}
                </VerticalCenterColumn>

                <Spacer10 />

                <VerticalCenterRow style={{ visibility: !props.canFinish ? "hidden" : "visible" }}>
                    <Button color="primary" variant="contained" onClick={props.onFinish} >
                        {props.finishButtonText}
                    </Button>
                </VerticalCenterRow>
            </VerticalCenterColumn>
        </Card>
    )
};

export default CountingScreenCard;
const Background = styled.div`
    width:100%;
    height:100%;
    background: #159957;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #155799, #159957);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #155799, #159957); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const Card = styled.div`
    position:relative;
    background-color:white;
    width:95vw;
    height:90vh;
    max-width:370px;
    max-height:620px;
    filter: drop-shadow(0.4rem 0.4rem 0.7rem rgba(0, 0, 0, 0.8));
`

const TopStatement = styled.h1`
    margin-left:60px;
    margin-right:60px;
    text-align:center;
    display: inline-block;
    color: ${MyColors.textBoldGray};
    font-size:20px;
    font-weight:600;
    margin-bottom:20px;
`

const CenterText = styled.div`
    color: ${MyColors.textBoldGray};
    font-size:16px;
    font-weight:600;
    margin-left:20px;
    margin-right:20px;
`