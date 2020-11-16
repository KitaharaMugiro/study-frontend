import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

interface Props {
    space: number
}

const VerticalSpacer = (props: Props) => {

    const Spacer = styled.div`
        width: ${props.space}px;
    `
    return (
        <Spacer />
    )
};

export default VerticalSpacer;