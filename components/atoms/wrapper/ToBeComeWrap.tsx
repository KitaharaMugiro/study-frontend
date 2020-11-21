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
    backdrop-filter: blur(3px);
    text-align:center;
    z-index:10000;
    /* padding:30%;
    backdrop-filter: brightness(60%);
    backdrop-filter: contrast(40%);
    backdrop-filter: drop-shadow(4px 4px 10px blue);
    backdrop-filter: grayscale(30%);
    backdrop-filter: hue-rotate(120deg);
    backdrop-filter: invert(70%);
    backdrop-filter: opacity(20%);
    backdrop-filter: sepia(90%);
    backdrop-filter: saturate(80%); */
`