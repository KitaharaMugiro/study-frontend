import { Button } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import React from "react"
import styled from "styled-components"
import { ComponentsStyle } from "../../const/ComponentsStyle"

export default () => {
    return (
        <Card>
            <Paper elevation={3} style={{ flexGrow: 1, padding: 10 }} >
                英単語を覚える

                <RightBottom>
                    <Button variant="contained" color="primary">
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