import styled from "styled-components"
import { MyColors } from "../../../const/MyColors"

export const ArrowLeftButton = styled.div`
  width: 30px;
  height: 30px;
  border: 5px solid;
  border-color:  transparent transparent ${MyColors.theme}  ${MyColors.theme};
  transform: rotate(45deg);
  margin-right:-20px;
:hover {
    filter: brightness(50%);
    }
`

export const ArrowRightButton = styled.div`
  width: 30px;
  height: 30px;
  border: 5px solid;
  border-color: ${MyColors.theme}  ${MyColors.theme} transparent transparent;
  transform: rotate(45deg);
  margin-left:-20px;
    :hover {
        filter: brightness(50%);
    }
`