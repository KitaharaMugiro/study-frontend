import { Button } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import React, { useState } from "react"
import styled from "styled-components"
import { ComponentsStyle } from "../../const/ComponentsStyle"
import { MyColors } from "../../const/MyColors"
import CreateIcon from '@material-ui/icons/Create';
import CardEditer from "./CardEditer"
import CountingScreen from "../templates/CountingScreen"
interface Props {
    title: string
    studyThemeId: string
    onClickStartStudy: () => void
}

export default (props: Props) => {

    const [openCountingTime, setOpenCoutingTime] = useState(false)
    const [editing, setEditing] = useState(false)
    const startEditing = () => {
        setEditing(true)
    }
    if (editing) {
        return (
            <CardEditer
                text={props.title}
                onSave={() => setEditing(false)}
                onCancel={() => setEditing(false)}
                onDelete={() => setEditing(false)}
                adding={false}
            />
        )
    }
    return (
        <Card>
            {props.title}

            <CardIcons>
                <CardIcon onClick={startEditing}>
                    <CreateIcon />
                </CardIcon>
            </CardIcons>

            <RightBottom>
                <Button variant="contained" color="primary" onClick={props.onClickStartStudy}>
                    学習を始める
                    </Button>
            </RightBottom>


        </Card>
    )
}

const Card = styled.div`  
    position:relative;
    cursor: pointer;
    background: white;
    display: flex;
    height: ${ComponentsStyle.CardHeight}px;
    width: ${ComponentsStyle.CardWidth}px;
    margin:5px;
    padding:10px;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
    font-size: 15px;
    overflow-wrap: break-word;
    /* min-height: 18px; */

    :hover {
        background: ${MyColors.hoverWhite};
    }
`

const RightBottom = styled.div`
    position:absolute;
    right:5px;
    bottom:5px;
`

const CardIcons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const CardIcon = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 1px;
  color: rgba(0, 0, 0, 0.5);
  background: #f5f6f7;
  opacity: 0.9;
  :hover{
  opacity: 1;
  background: rgba(220, 220, 220, 1);
}
`