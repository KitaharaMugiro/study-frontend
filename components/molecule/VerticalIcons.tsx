import Icon from "@material-ui/core/Icon"
import Badge from '@material-ui/core/Badge';
import React from "react"
import styled from "styled-components"
import { VerticalCenterColumn } from "../container/VerticalCenter"
import IconButton from "@material-ui/core/IconButton";

const VerticalIcons = () => {
    const menu = [
        { icon: "add_circle", title: "デイリータスク", notification: false, onClick: () => { } },
        { icon: "face", title: "デイリータスク", notification: true, onClick: () => { } },
        { icon: "mail", title: "デイリータスク", notification: false, onClick: () => { } },
    ]

    const renderMenu = () => {
        return menu.map(m => {
            if (m.notification) {
                return (
                    <IconButton>
                        <Badge color="secondary" overlap="circle" badgeContent=" ">
                            <Icon color="primary" style={{ fontSize: 50 }} onClick={m.onClick}>{m.icon}</Icon>
                        </Badge>
                    </IconButton>
                )
            }
            return (
                <IconButton>
                    <Icon color="primary" style={{ fontSize: 50 }} onClick={m.onClick}>{m.icon}</Icon>
                </IconButton>
            )
        })
    }

    return (
        <Column>
            <VerticalCenterColumn>
                {renderMenu()}
            </VerticalCenterColumn>
        </Column>
    )
};

export default VerticalIcons;

const Column = styled.div`
    width:50px;
`