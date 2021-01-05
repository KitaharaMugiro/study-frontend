import styled from "styled-components"
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { MyColors } from "../../../const/MyColors";
import Progress from "../../atoms/Progress";
import React from "react";
import { MileStones } from "../../molecule/MileStones";
import { Spacer10, Spacer20 } from "../../atoms/Spacer";
import { MileStonesViewModel } from "../../../models/viewModel/MileStonesViewModel";

interface Props {
    studyThemeId: string
    mileStones: MileStonesViewModel
    refetch: () => void
    disableAdd: boolean
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
                    {Math.ceil(props.mileStones.getProgress() * 100)}%完了!
                </ProgressValue>
                <Progress progress={props.mileStones.getProgress() * 100} />
            </div>

            <MileStones
                refetch={props.refetch}
                studyThemeId={props.studyThemeId}
                mileStones={props.mileStones.getSortedMileStones()}
                disableAdd={props.disableAdd}
            />
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
    color : ${MyColors.textColor};
    font-size:20px;
    font-weight:600;
`

const ProgressValue = styled.div`
    margin-right:10px;
    color : ${MyColors.subTextColor};
    flex-shrink: 0;
`