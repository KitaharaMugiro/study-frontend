import React, { Component, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { MyColors } from "../../../const/MyColors";
import EditButtons from "../../atoms/buttons/EditButtons";

interface Props {
    text: string
    onSave: (text: string) => void
    onCancel: () => void
    onDelete: () => void
    adding: boolean
}

const CardEditer = (props: Props) => {
    const [text, setText] = useState("")
    useEffect(() => {
        setText(props.text)
    }, [props.text])

    const handleChangeText = (e: any) => setText(e.target.value);

    const onEnter = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            props.onSave(text);
        }
    };

    const { onSave, onCancel, onDelete, adding } = props;

    return (
        <div style={{ padding: 10 }}>
            <Card>
                <TextareaAutosize
                    autoFocus
                    className="EditCardTextarea"
                    placeholder="Enter the text for this card..."
                    style={{ height: 0 }}
                    value={text}
                    onChange={handleChangeText}
                    onKeyDown={onEnter}
                />
            </Card>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={adding ? "Add card" : "Save"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
};

export default CardEditer;

const Card = styled.div`
    min-height: 50px;
    padding-left: 8px;
    padding-right: 15px;
    background:${MyColors.boarderColor};
`