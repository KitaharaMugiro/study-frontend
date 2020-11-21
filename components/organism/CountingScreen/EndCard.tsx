import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from "react";
import styled from "styled-components";
import { MyColors } from "../../../const/MyColors";
import useGraphQL from "../../../graphQL/useGraphQL";
import { Spacer20 } from "../../atoms/Spacer";
import { Center, CenterFlat } from '../../container/Center';
import { RightTop10 } from "../../container/Positions";
import MileStoneFrame from "../GoalSetting/MileStoneFrame";
import StudyRecordFrame from "../GoalSetting/StudyRecordFrame";
import TitleFrame from "../GoalSetting/TitleFrame";

interface Props {
    onFinish: () => void
    studyThemeId: string
    studyRecordId: string
}

export default (props: Props) => {

    //StudyThemeを取得
    const queryStudyTheme = useGraphQL.queryStudyTheme(props.studyThemeId)
    const studyTheme = queryStudyTheme?.studyTheme

    //MileStoneを取得
    const queryMileStones = useGraphQL.queryMileStones(props.studyThemeId)
    const mileStones = queryMileStones?.mileStones

    //Userを取得
    const queryUser = useGraphQL.queryUser()
    const user = queryUser?.user

    //StudyRecordを取得
    const queryStudyRecord = useGraphQL.queryStudyRecord(props.studyThemeId, props.studyRecordId)
    const studyRecord = queryStudyRecord?.studyRecord

    const onFinish = () => {
        console.log("End Card onFinish")
        props.onFinish()
    }

    if (queryStudyTheme?.loading) { return <div /> }
    if (queryMileStones?.loading) { return <div /> }
    if (queryStudyRecord?.loading) { return <div /> }
    if (queryUser?.loading) { return <div /> }
    return (
        <>
            <RightTop10>
                <IconButton aria-label="close" onClick={props.onFinish}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </RightTop10>

            <Frame>
                <TitleFrame
                    title={studyTheme?.title || ""}
                    status={studyTheme?.listTitle || ""}
                />

                <StudyRecordFrame
                    studyRecord={studyRecord!}
                    userStudyTimeText={user?.getStudyTimeText() || ""}
                    themeStudyTimeText={studyTheme?.getStudyTimeText() || ""}
                />

                {
                    mileStones?.mileStones.length !== 0 &&
                    <MileStoneFrame
                        refetch={queryMileStones?.refetch!}
                        studyThemeId={props.studyThemeId}
                        mileStones={mileStones!}
                        disableAdd
                    />
                }

                <Spacer20 />

                <CenterFlat>
                    <Button color="primary" variant="contained" onClick={onFinish}>
                        完了
                    </Button>
                </CenterFlat>

                <Spacer20 />
            </Frame>
        </>
    )
}


const Frame = styled.div`
    background-color: ${MyColors.cardBackground};
    min-height: 500px;
`
