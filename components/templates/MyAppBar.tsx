import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import MenuIcon from '@material-ui/icons/Menu';
import { AppInformation } from "../../const/AppInfomation";
import styled from "styled-components";


export default () => {
    const FlexGrow = styled.div`
        flex-grow:1;
    `

    return (
        <FlexGrow>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {AppInformation.name}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </FlexGrow>
    )
}