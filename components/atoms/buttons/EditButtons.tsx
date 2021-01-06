import { Button, Icon, IconButton } from "@material-ui/core";
import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import styled from "styled-components";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { MyColors } from "../../../const/MyColors";

interface Props {
    handleSave: () => void
    saveLabel: string
    handleDelete?: () => void
    handleCancel: () => void
}

const EditButtons = ({ handleSave, saveLabel, handleDelete, handleCancel }: Props) => (
    <EditButtonsFrame>
        <Button
            tabIndex={0}
            variant="contained"
            color="primary"

            onClick={handleSave}
            startIcon={<SaveIcon />}
        >
            {saveLabel}
        </Button>
        {handleDelete && (
            <Button
                tabIndex={0}
                variant="contained"
                color="secondary"
                style={{ marginLeft: 0 }}
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
            >Delete</Button>

        )}
        <EditButtonCancel tabIndex={0} onClick={handleCancel}>
            <IconButton aria-label="delete">
                <CancelIcon style={{ color: MyColors.textColor }} />
            </IconButton>
        </EditButtonCancel>
    </EditButtonsFrame>
);

export default EditButtons;

const EditButtonsFrame = styled.div`
    display: flex;
    align-items: baseline;
`

const EditButtonCancel = styled.div`
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 20px;
    opacity: 0.5;
    outline: none;  
    :hover {
    opacity: 1;
  }
  `
