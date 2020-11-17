import styled from "styled-components";
import { MyColors } from "../../../const/MyColors";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import React from "react";
import MaybeTextField from "../../molecule/MaybeTextField";
import { useMutation } from "@apollo/client";
import { UpdateStudyThemeMutation } from "../../../graphQL/StudyThemeStatements";
import { UpdateStudyThemeInput } from "../../../graphQL/generated/types";
import { textChangeRangeIsUnchanged } from "typescript";
import useLocal from "../../../models/hooks/useLocal";
import { StudyThemeViewModel } from "../../../models/viewModel/StudyThemeViewModel";
import { Spacer10 } from "../../atoms/Spacer";
import { MainText } from "../../atoms/MainText";

interface Props {
    studyTheme: StudyThemeViewModel
    refetch: () => void
}

const GoalFrame = (props: Props) => {

    const [updateStudyTheme] = useMutation(UpdateStudyThemeMutation)

    const onChangeGoalText = (text: string) => {
        const userId = useLocal("USER_ID")!
        const input: UpdateStudyThemeInput = {
            userId,
            studyThemeId: props.studyTheme.studyThemeId!,
            goal: text
        }
        // レスポンスが悪そうな気がする・・・
        updateStudyTheme({ variables: { input } }).then(() => {
            props.refetch()
        })
    }

    return (
        <Frame>
            <Logo>
                <DirectionsRunIcon />
            </Logo>
            <Title>
                <MainText>ゴール</MainText>
                <Spacer10 />
                <MaybeTextField
                    text={props.studyTheme.goal!}
                    onChangeText={onChangeGoalText}
                    placeholder="なぜこの勉強をするのか記述して、目的を意識しよう"
                />
            </Title>
        </Frame>
    )

};

export default GoalFrame;

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
