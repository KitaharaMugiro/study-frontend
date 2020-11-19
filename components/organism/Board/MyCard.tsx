import { useMutation } from "@apollo/client"
import { Button } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create'
import React, { useState } from "react"
import styled from "styled-components"
import { ComponentsStyle } from "../../../const/ComponentsStyle"
import { MyColors } from "../../../const/MyColors"
import { DeleteStudyThemeInput, UpdateStudyThemeInput } from "../../../graphQL/generated/types"
import { DeleteStudyThemeMutation, UpdateStudyThemeMutation } from "../../../graphQL/StudyThemeStatements"
import useLocal from "../../../models/hooks/useLocal"
import CardEditer from "./CardEditer"
interface Props {
    //これStudyThemeViewModelに置換えよ
    title: string
    goal: string
    status: "TODO" | "DOING" | "DONE"
    studyThemeId: string
    onClickStartStudy: (studyThemeId: string) => void
    onClick: (cardId: string) => void
    refetch: () => void
}

const MyCard = (props: Props) => {
    const [editing, setEditing] = useState(false)

    const [updateTitle] = useMutation(UpdateStudyThemeMutation)
    const [deleteStudyTheme] = useMutation(DeleteStudyThemeMutation)

    const startEditing = (event: any) => {
        event.stopPropagation()
        setEditing(true)
    }

    const onSave = async (text: string) => {
        const userId = useLocal("USER_ID")!
        const input: UpdateStudyThemeInput = {
            userId,
            studyThemeId: props.studyThemeId,
            title: text
        }

        updateTitle({ variables: { input } }).then(() => {
            props.refetch()
            setEditing(false)
        })
    }

    const onDelete = () => {
        const userId = useLocal("USER_ID")!
        const input: DeleteStudyThemeInput = {
            userId,
            studyThemeId: props.studyThemeId,
        }
        deleteStudyTheme({ variables: { input } }).then(() => {
            props.refetch()
            setEditing(false)
        })
    }

    if (editing) {
        return (
            <CardEditer
                text={props.title}
                onSave={onSave}
                onCancel={() => setEditing(false)}
                onDelete={onDelete}
                adding={false}
            />
        )
    }

    const onClickStartStudy = (event: any) => {
        event.stopPropagation()
        props.onClickStartStudy(props.studyThemeId)
    }

    const height = props.status === "DONE" ? ComponentsStyle.CardDoneHeight : ComponentsStyle.CardHeight

    return (
        <Card style={{ height }} onClick={() => props.onClick(props.studyThemeId)}>
            <div>
                <Title>
                    {props.title}
                </Title>

                <SubText>
                    {props.goal}
                </SubText>
            </div>

            <CardIcons>
                <CardIcon onClick={startEditing}>
                    <CreateIcon />
                </CardIcon>
            </CardIcons>

            {
                props.status !== "DONE" && (
                    <RightBottom>
                        <Button variant="contained" color="primary" onClick={onClickStartStudy}>
                            学習を始める
                        </Button>
                    </RightBottom>
                )
            }
        </Card>
    )
};

export default MyCard;

const Title = styled.div`
    margin-right:20px;
    font-size:18px;
`

const SubText = styled.div`
    color:${MyColors.textShallowGray};
    font-size:14px;
`

const Card = styled.div`  
    position:relative;
    cursor: pointer;
    background: white;
    display: flex;
    width: ${ComponentsStyle.CardWidth}px;
    margin:5px;
    padding:10px;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
    font-size: 15px;
    overflow-wrap: break-word;
    overflow-y: hidden;
    /* min-height: 18px; */

    :hover {
        background: ${MyColors.hoverWhite};
    }
`

const RightBottom = styled.div`
    position:absolute;
    right:5px;
    bottom:5px;
`

const CardIcons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const CardIcon = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 1px;
  color: rgba(0, 0, 0, 0.5);
  background: #f5f6f7;
  opacity: 0.9;
  :hover{
  opacity: 1;
  background: rgba(220, 220, 220, 1);
}
`