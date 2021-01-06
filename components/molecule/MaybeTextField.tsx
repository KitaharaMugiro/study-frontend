import { TextareaAutosize } from "@material-ui/core"
import React, { useState } from "react"
import styled from "styled-components"
import { MyColors } from "../../const/MyColors"
import EditButtons from "../atoms/buttons/EditButtons"

interface Props {
    text: string
    placeholder: string
    onChangeText: (text: string) => void
}

export default (props: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(props.text)

    const handleChangeText = (event: any) => {
        const text = event.target.value
        setText(text)
    }

    const onSave = () => {
        props.onChangeText(text)
        setEditMode(false)
    }

    const onCancel = () => {
        setEditMode(false)
    }

    if (editMode) {
        return (
            <div>
                <Card>
                    <TextareaAutosize
                        autoFocus
                        className="EditCardTextarea"
                        placeholder="Enter the text for this card..."
                        value={text}
                        onChange={handleChangeText}
                    />
                </Card>
                <EditButtons
                    handleSave={onSave}
                    saveLabel="Save"
                    handleCancel={onCancel}
                />
            </div>
        )
    } else {
        return (
            <Frame onClick={() => setEditMode(true)}>
                {props.text || props.placeholder}
            </Frame>
        )
    }
}

const Card = styled.div`
    min-height: 50px;
    padding-left: 8px;
    padding-right: 15px;
    background-color:white;
`

const Frame = styled.div`
    padding:10px;
    min-height:50px;
    margin-right:30px;
    background-color:${MyColors.subTextColor};
`