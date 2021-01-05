import styled from "styled-components"
import DescriptionIcon from '@material-ui/icons/Description';
import { MyColors } from "../../../const/MyColors";
import { RecordViewModel } from "../../../models/viewModel/RecordViewModel";

interface Props {
    studyRecord: RecordViewModel
    themeStudyTimeText: string
    userStudyTimeText: string
}

const StudyRecordFrame = (props: Props) => {
    const record = props.studyRecord
    return (
        <Frame>
            <Logo>
                <DescriptionIcon />
            </Logo>
            <Title>
                <MainText>勉強結果</MainText>
                <SubText>
                    <BoldText>
                        今回学んだこと:{" "}
                    </BoldText> {record.learned || ""}
                </SubText>

                <SubText>
                    <BoldText>
                        今回の勉強時間:{" "}
                    </BoldText>
                    <ColoredText>
                        {record.getStudyTimeText()}
                    </ColoredText>
                </SubText>

                <SubText>
                    <BoldText>
                        このテーマの総勉強時間:{" "}
                    </BoldText>
                    {props.themeStudyTimeText} {" "} <ColoredText>(+{record.getStudyTimeText()})</ColoredText>
                </SubText>

                <SubText>
                    <BoldText>
                        全体の総勉強時間:{" "}
                    </BoldText>
                    {props.userStudyTimeText}  {" "} <ColoredText>(+{record.getStudyTimeText()})</ColoredText>
                </SubText>

            </Title>
        </Frame>
    )
};

export default StudyRecordFrame;

const Frame = styled.div`
    display:flex;
    //height:100px;
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

const SubText = styled.div`
    color : ${MyColors.subTextColor};
`

const BoldText = styled.span`
    font-weight:600;
`

const ColoredText = styled.span`
    color:${MyColors.theme}
`