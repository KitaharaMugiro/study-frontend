import { Modal } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { MyColors } from "../../const/MyColors"
import useGraphQL from "../../graphQL/useGraphQL"
import GoalFrame from "../organism/GoalSetting/GoalFrame"
import MileStoneFrame from "../organism/GoalSetting/MileStoneFrame"
import TitleFrame from "../organism/GoalSetting/TitleFrame"

interface Props {
    open: boolean
    onClose: () => void
    studyThemeId: string
}

const GoalSettingModal = (props: Props) => {
    //studyThemeを取得
    const queryStudyTheme = useGraphQL.queryStudyTheme(props.studyThemeId)
    const studyTheme = queryStudyTheme?.studyTheme
    if (queryStudyTheme?.loading) return <div />

    const onRegister = () => {
        props.onClose()
    }

    const body = () => {
        if (!studyTheme) return <div />
        return (
            <Frame>
                <TitleFrame
                    title={studyTheme.title!}
                    status={studyTheme.listTitle!}
                />
                <GoalFrame
                    studyTheme={studyTheme}
                    refetch={queryStudyTheme?.refetch!}
                />

                <MileStoneFrame />
            </Frame>
        );

    }

    return (
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            disableRestoreFocus
            open={props.open}
            onClose={props.onClose}
        >
            {body()}
        </Modal>
    )
};

export default GoalSettingModal;

const Frame = styled.div`
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    max-width:780px;
    width:90vw;
    background-color: ${MyColors.cardBackground};
    min-height: 500px;
`
