import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Modal } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import React, { useState } from "react"
import styled from "styled-components"
import { MyColors } from "../../const/MyColors"
import { AbsoluteCenter } from "../container/AbsoluteCenter"
import { Center } from "../container/Center"
import GoalFrame from "../organism/GoalSetting/GoalFrame"
import MileStoneFrame from "../organism/GoalSetting/MileStoneFrame"
import TitleFrame from "../organism/GoalSetting/TitleFrame"

interface Props {
    open: boolean
    onClose: () => void
}

export default (props: Props) => {
    const [title, setTitle] = useState("")
    const onRegister = () => {
        props.onClose()
    }

    const body = () => {
        return (
            <Frame>
                <TitleFrame />

                <GoalFrame />

                <MileStoneFrame />
            </Frame>
        );

    }

    return (
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            disableRestoreFocus
            open={props.open}
            onClose={props.onClose}
        >
            {body()}
        </Modal>
    )
}

const Frame = styled.div`
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    max-width:780px;
    width:90vw;
    background-color: ${MyColors.cardBackground};
    min-height: 500px;
`
