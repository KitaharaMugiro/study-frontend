import styled from "styled-components"

export const ArrowLeftButton = styled.div`
width: 0;
height: 0;
border-style: solid;
border-width: 40px 20px 40px 0;
border-color: transparent  #c7c7c7 transparent transparent;
:hover {
    border-color: transparent  #8a8a8a transparent transparent;
    }
`

export const ArrowRightButton = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 40px 0 40px 20px;
    border-color: transparent transparent transparent  #c7c7c7;
    :hover {
        border-color: transparent transparent transparent  #8a8a8a;
    }
`