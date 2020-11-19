import { Button } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import React, { useState } from "react"
import { FlexCenter } from "./Flex"
import { Spacer10 } from "./Spacer"
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import styled from "styled-components"
import EditButtons from "./buttons/EditButtons"

interface Props {
    intialValue: string
    label: string
    buttonLabel: string
    check: boolean
    onSave: (text: string) => void
    onDelete: () => void
    onCancel: () => void
}

export const EditableField = (props: Props) => {
    const [text, setText] = useState(props.intialValue)
    return (

        <div>
            <FlexCenter>
                <Checkbox
                    checked={props.check}
                    name="checkedB"
                    color="primary" />
                <TextField
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    fullWidth
                    id="standard-basic" />
                <Spacer10 />
            </FlexCenter>
            <MarginLeft>
                <EditButtons
                    handleSave={() => props.onSave(text)}
                    saveLabel={props.buttonLabel}
                    handleDelete={props.onDelete}
                    handleCancel={props.onCancel}
                />
            </MarginLeft>
        </div>
    )
}

const MarginLeft = styled.div`
    margin-left:40px;
`