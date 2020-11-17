import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import React from "react"

interface Props {
    check: boolean
    label: string
    onChange: (checked: boolean) => void
}


export const MyCheckbox = (props: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        props.onChange(checked)
    };

    const className = props.check ? "strike-text" : ""
    return (
        <FormControlLabel
            style={{ height: 30 }}
            classes={{ label: className }}
            control={
                <Checkbox
                    checked={props.check}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
            }
            label={props.label}
        />
    )
}