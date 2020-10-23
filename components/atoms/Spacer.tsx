import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

interface Props {
    space: number
}

export default (props: Props) => {

    const Spacer = styled.div`
        height: ${props.space}px;
    `
    return (
        <Spacer />
    )
}