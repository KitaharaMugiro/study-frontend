import styled from "styled-components"
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { MyColors } from "../../../const/MyColors";
import Progress from "../../atoms/Progress";
import React from "react";
import { MileStones } from "../../molecule/MileStones";
import { Spacer10, Spacer20 } from "../../atoms/Spacer";

interface Props {

}

const MileStoneFrame = (props: Props) => {

    return (
        <Frame>
            <Flex>
                <Logo>
                    <FlightTakeoffIcon />
                </Logo>
                <Title>
                    <MainText>マイルストーン</MainText>
                </Title>
            </Flex>

            <Spacer10 />
            <div>
                <ProgressValue>
                    40%完了!
                </ProgressValue>
                <Progress progress={40} />
            </div>

            <MileStones />
        </Frame>
    )
};

export default MileStoneFrame;

const Flex = styled.div`
    display:flex;
`

const Frame = styled.div`
    padding:20px;
    padding-bottom:0px;
`

const Logo = styled.div`
    transform: translateY(2px);
    margin-right:10px;
`

const Title = styled.div`
    flex-grow:2;
`

const MainText = styled.div`
    color : ${MyColors.textBoldGray};
    font-size:20px;
    font-weight:600;
`

const ProgressValue = styled.div`
    margin-right:10px;
    color : ${MyColors.textShallowGray};
    flex-shrink: 0;
`