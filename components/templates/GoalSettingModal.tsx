import { Dialog, IconButton, Modal } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { MyColors } from "../../const/MyColors"
import useGraphQL from "../../graphQL/useGraphQL"
import { Spacer20 } from "../atoms/Spacer"
import { RightTop10 } from "../container/Positions"
import GoalFrame from "../organism/GoalSetting/GoalFrame"
import MileStoneFrame from "../organism/GoalSetting/MileStoneFrame"
import { StudyRecordList } from "../organism/GoalSetting/StudyRecordList"
import TitleFrame from "../organism/GoalSetting/TitleFrame"
import CloseIcon from '@material-ui/icons/Close';


interface Props {
    open: boolean
    onClose: () => void
    studyThemeId: string
}

const GoalSettingModal = (props: Props) => {
    //studyThemeを取得
    const queryStudyTheme = useGraphQL.queryStudyTheme(props.studyThemeId)
    const studyTheme = queryStudyTheme?.studyTheme

    //MileStoneを取得
    const queryMileStones = useGraphQL.queryMileStones(props.studyThemeId)
    const mileStones = queryMileStones?.mileStones

    //StudyRecordを取得
    const queryStudyRecords = useGraphQL.queryStudyRecords(props.studyThemeId)
    const studyRecords = queryStudyRecords?.studyRecords

    if (queryMileStones?.loading) return <div />
    if (queryStudyTheme?.loading) return <div />
    if (queryStudyRecords?.loading) return <div />

    if (!studyTheme) return <div />
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            scroll="body"
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            disableRestoreFocus
            open={props.open}
            onClose={props.onClose}
        >
            <RightTop10>
                <IconButton aria-label="close" onClick={props.onClose}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </RightTop10>

            <Frame>
                <TitleFrame
                    title={studyTheme.title!}
                    status={studyTheme.listTitle!}
                />

                <GoalFrame
                    studyTheme={studyTheme}
                    refetch={queryStudyTheme?.refetch!}
                />

                <MileStoneFrame
                    refetch={queryMileStones?.refetch!}
                    studyThemeId={props.studyThemeId}
                    mileStones={mileStones!}
                    disableAdd={false}
                />

                <StudyRecordList
                    studyRecords={studyRecords!}
                />

                <Spacer20 />
            </Frame>
        </Dialog>
    )
};

export default GoalSettingModal;

const Frame = styled.div`
    background-color: ${MyColors.frameColor};
    min-height: 500px;
`
