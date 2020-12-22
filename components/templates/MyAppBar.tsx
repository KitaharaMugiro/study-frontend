import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import MenuIcon from '@material-ui/icons/Menu';
import { AppInformation } from "../../const/AppInfomation";
import styled from "styled-components";
import { MyColors } from "../../const/MyColors";
import useLocal, { deleteAllLocal } from "../../models/hooks/useLocal";
import { REGISTER_TYPE } from "../../models/logics/user/REGISTER_TYPE";
import { useAtom } from "jotai";
import { openSigninModalAtom, openSignupModalAtom } from "../../models/atoms/openSigninModalAtom";


const MyAppBar = () => {
    const [_, setOpenSigninModalAtom] = useAtom(openSigninModalAtom)
    const [__, setOpenSignupModalAtom] = useAtom(openSignupModalAtom)

    const FlexGrow = styled.div`
        flex-grow:1;
    `

    const logout = () => {
        deleteAllLocal()
        location.reload()
    }

    const signin = () => {
        //open sign in modal
        setOpenSigninModalAtom(true)
    }

    const signup = () => [
        //open sign up modal
        setOpenSignupModalAtom(true)
    ]

    const renderButton = () => {
        const type = useLocal("REGISTER_TYPE") || REGISTER_TYPE.Temporary
        if (type === REGISTER_TYPE.Registered) {
            return (<Button color="inherit" onClick={logout}>ログアウト</Button>)
        } else if (type === REGISTER_TYPE.Temporary) {
            return (
                <div>
                    <Button color="inherit" onClick={signin}>ログイン</Button>
                    <Button color="inherit" onClick={signup}>会員登録</Button>
                </div>
            )
        }
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

                    {renderButton()}

                </Toolbar>
            </AppBar>
        </FlexGrow>
    )
};


export default MyAppBar;