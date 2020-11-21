import styled from "styled-components"

export default () => {
    return (
        <Wrap>

        </Wrap>
    )
}

const Wrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;

    background-color:rgba(177,177,177, 0.4);
    backdrop-filter: blur(2px);
    text-align:center;
    z-index:10000;
`