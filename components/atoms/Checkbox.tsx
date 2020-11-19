import Checkbox from '@material-ui/core/Checkbox';
import React from "react";
import { FlexCenter } from "./Flex";

interface Props {
    check: boolean
    label: string
    onChange: (checked: boolean) => void
    onClickLabel: () => void
}


export const MyCheckbox = (props: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        props.onChange(checked)
    };

    const className = props.check ? "strike-text" : ""
    return (
        <FlexCenter>
            <Checkbox
                checked={props.check}
                onChange={handleChange}
                name="checkedB"
                color="primary"
            />
            <span className={className} onClick={props.onClickLabel}>{props.label}</span>
        </FlexCenter>
    )
}