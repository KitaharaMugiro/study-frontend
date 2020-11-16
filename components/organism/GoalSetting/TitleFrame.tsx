import styled from "styled-components"
import DescriptionIcon from '@material-ui/icons/Description';
import { MyColors } from "../../../const/MyColors";

interface Props {
    title: string
    status: string
}

const TitleFrame = (props: Props) => {
    const { title, status } = props

    return (
        <Frame>
            <Logo>
                <DescriptionIcon />
            </Logo>
            <Title>
                <MainText>{title}</MainText>
                <SubText>ステータス: {status}</SubText>
            </Title>
        </Frame>
    )
};

export default TitleFrame;

const Frame = styled.div`
    display:flex;
    //height:100px;
    padding:20px;
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

const SubText = styled.div`
    color : ${MyColors.textShallowGray};
`