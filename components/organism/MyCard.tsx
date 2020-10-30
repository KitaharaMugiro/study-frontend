import { Button } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import React from "react"
import styled from "styled-components"
import { ComponentsStyle } from "../../const/ComponentsStyle"

interface Props {
    title: string
    studyThemeId: string
    onClickStartStudy: () => void
}

export default (props: Props) => {
    return (
        <Card>
            <Paper elevation={3} style={{ flexGrow: 1, padding: 10 }} >
                {props.title}

                <RightBottom>
                    <Button variant="contained" color="primary" onClick={props.onClickStartStudy}>
                        学習を始める
                    </Button>
                </RightBottom>
            </Paper>
        </Card>
    )
}

const Card = styled.div`  
    position:relative;   
    display: flex;
    height: ${ComponentsStyle.CardHeight}px;
    width: ${ComponentsStyle.CardWidth}px;
    margin:5px;
`

const RightBottom = styled.div`
    position:absolute;
    right:5px;
    bottom:5px;
`