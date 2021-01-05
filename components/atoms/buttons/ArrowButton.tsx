import styled from "styled-components"
import { MyColors } from "../../../const/MyColors"

export const ArrowLeftButton = styled.div`
width: 0;
height: 0;
border-style: solid;
border-width: 40px 20px 40px 0;
border-color: transparent  ${MyColors.theme} transparent transparent;
:hover {
    border-color: transparent  ${MyColors.theme} transparent transparent;
    filter: brightness(50%);

    }
`

export const ArrowRightButton = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 40px 0 40px 20px;
    border-color: transparent transparent transparent  ${MyColors.theme};
    :hover {
        border-color: transparent transparent transparent ${MyColors.theme};
        filter: brightness(50%);
    }
`