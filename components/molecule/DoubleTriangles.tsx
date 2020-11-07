import IconButton from '@material-ui/core/IconButton';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import DetailsIcon from '@material-ui/icons/Details';
import React from 'react';
import { MyColors } from '../../const/MyColors';
import { VerticalCenterColumn } from '../container/VerticalCenter';

interface Props {
    onClickUp: () => void
    onClickDown: () => void
    disableUp: boolean
    disableDown: boolean
    text: string
}


export default (props: Props) => {
    return (
        <VerticalCenterColumn>
            <IconButton
                onClick={props.onClickUp}
                style={{ visibility: props.disableUp ? "hidden" : "visible" }}>
                <ChangeHistoryIcon color="primary" fontSize="large" />
            </IconButton>
            <span>{props.text}</span>
            <IconButton
                onClick={props.onClickDown}
                style={{ visibility: props.disableDown ? "hidden" : "visible" }}>
                <DetailsIcon color="primary" fontSize="large" />
            </IconButton>
        </VerticalCenterColumn>
    )
}