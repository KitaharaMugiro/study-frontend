import IconButton from '@material-ui/core/IconButton';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import DetailsIcon from '@material-ui/icons/Details';
import React from 'react';
import { MyColors } from '../../const/MyColors';

export default () => {
    return (
        <div>
            <IconButton>
                <ChangeHistoryIcon color="primary" fontSize="large" />
            </IconButton>
            <IconButton>
                <DetailsIcon color="primary" fontSize="large" />
            </IconButton>
        </div>
    )
}