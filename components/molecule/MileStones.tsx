import { useMutation } from "@apollo/client"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import React, { useState } from "react"
import styled from "styled-components"
import { CreateMileStoneInput, DeleteMileStoneInput, UpdateMileStoneInput } from "../../graphQL/generated/types"
import { CreateMileStoneMutation, DeleteMileStoneMutation, UpdateMileStoneMutation } from "../../graphQL/MileStoneStatement"
import { MileStoneViewModel } from "../../models/viewModel/MileStonesViewModel"
import { MyCheckbox } from "../atoms/Checkbox"
import { EditableField } from "../atoms/EditableField"
import { VerticalFlex } from "../atoms/Flex"
import { Spacer10 } from "../atoms/Spacer"

interface Props {
    refetch: () => void
    studyThemeId: string
    mileStones: MileStoneViewModel[]
    disableAdd: boolean
}

export const MileStones = (props: Props) => {
    const [newMileStoneTitle, setNewMileStoneTitle] = useState("") //コンポーネントに写せそう
    const [editingMileStone, setEditingMileStone] = useState("")

    //api(CUD)
    const [updateMileStone] = useMutation(UpdateMileStoneMutation)
    const [createMileStone] = useMutation(CreateMileStoneMutation)
    const [deleteMileStone] = useMutation(DeleteMileStoneMutation)


    const onCreateMileStone = () => {
        //api and refetch
        const title = newMileStoneTitle
        if (title.length === 0) return
        const input: CreateMileStoneInput = {
            studyThemeId: props.studyThemeId,
            title
        }
        createMileStone({ variables: { input } }).then(() => {
            //レスポンス悪くなる。。
            props.refetch()
            setNewMileStoneTitle("")
        })
    }

    const onChangeMileStoneDone = (checked: boolean, mileStoneId: string) => {
        //api and refetch
        const input: UpdateMileStoneInput = {
            studyThemeId: props.studyThemeId,
            mileStoneId,
            done: checked
        }
        updateMileStone({ variables: { input } }).then(() => {
            //レスポンス悪くなる。。
            props.refetch()
            setEditingMileStone("")
        })
    }

    const onChangeMileStoneTitle = (title: string, mileStoneId: string) => {
        //api and refetch
        const input: UpdateMileStoneInput = {
            studyThemeId: props.studyThemeId,
            mileStoneId,
            title
        }
        updateMileStone({ variables: { input } }).then(() => {
            //レスポンス悪くなる。。
            props.refetch()
            setEditingMileStone("")
        })
    }

    const onDeleteMileStone = (mileStoneId: string) => {
        //api and refetch
        const input: DeleteMileStoneInput = {
            studyThemeId: props.studyThemeId,
            mileStoneId
        }
        deleteMileStone({ variables: { input } }).then(() => {
            //レスポンス悪くなる。。
            props.refetch()
            setEditingMileStone("")
        })
    }



    const checkboxList = () => {
        return props.mileStones.map(mileStone => {
            if (mileStone.mileStoneId === editingMileStone) {
                return <EditableField
                    intialValue={mileStone.text}
                    label="ゴールまでの途中地点を入力"
                    buttonLabel="保存"
                    check={mileStone.done}
                    onSave={(text) => onChangeMileStoneTitle(text, mileStone.mileStoneId)}
                    onCancel={() => setEditingMileStone("")}
                    onDelete={() => onDeleteMileStone(mileStone.mileStoneId)}
                />
            }
            return (
                <MyCheckbox
                    label={mileStone.text}
                    check={mileStone.done}
                    onChange={(checked) => onChangeMileStoneDone(checked, mileStone.mileStoneId)}
                    onClickLabel={() => setEditingMileStone(mileStone.mileStoneId)}
                />)
        })
    }

    return (
        <div>
            <VerticalFlex>
                {checkboxList()}
            </VerticalFlex>
            <Spacer10 />

            {!props.disableAdd &&
                <Margin20>
                    <TextField
                        id="outlined-basic"
                        label="ゴールまでの途中地点を入力"
                        variant="outlined"
                        fullWidth
                        value={newMileStoneTitle}
                        onChange={(event) => setNewMileStoneTitle(event.target.value)}
                    />
                    <Spacer10 />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onCreateMileStone}>
                        追加
                        </Button>
                </Margin20>
            }
        </div>)
}

const Margin20 = styled.div`
    margin-left:30px;
`