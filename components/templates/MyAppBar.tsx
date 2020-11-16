import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import MenuIcon from '@material-ui/icons/Menu';
import { AppInformation } from "../../const/AppInfomation";
import styled from "styled-components";
import { MyColors } from "../../const/MyColors";
import useLocal, { deleteAllLocal } from "../../models/hooks/useLocal";


const MyAppBar = () => {
    const FlexGrow = styled.div`
        flex-grow:1;
    `

    const logout = () => {
        deleteAllLocal()
        location.reload()
    }

    return (
        <FlexGrow>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    {/* <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {AppInformation.name}
                    </Typography>
                    <Button color="inherit" onClick={logout}>ログアウト</Button>
                </Toolbar>
            </AppBar>
        </FlexGrow>
    )
};


export default MyAppBar;