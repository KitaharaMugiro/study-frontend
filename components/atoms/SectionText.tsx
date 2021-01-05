import React from "react"
import styled from "styled-components"
import { MyColors } from "../../const/MyColors"
import { MainText } from "./MainText"

interface Props {
    title: string
}

export const SectionText = (props: Props) => {
    return (
        <div>
            <MainText>{props.title}</MainText>
            <Bar />
        </div>
    )
}

const Bar = styled.div`
    width:50px;
    height:10px;
    background-color:${MyColors.background};
    margin-bottom:10px;
`