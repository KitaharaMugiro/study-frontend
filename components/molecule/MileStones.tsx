import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import React from "react"
import styled from "styled-components"
import { MyCheckbox } from "../atoms/Checkbox"
import { VerticalFlex } from "../atoms/Flex"
import { Spacer10 } from "../atoms/Spacer"

interface Props {

}

export const MileStones = (props: Props) => {
    const onChangeMileStoneDone = (checked: boolean, mileStoneId: string) => {
        //api and refetch
    }

    const checkboxList = () => {
        const mileStones = [{ text: "aaa", done: true, mileStoneId: "aaa" }, { text: "bbb", done: false, mileStoneId: "bbb" }]
        return mileStones.map(mileStone => {
            return (
                <MyCheckbox
                    label={mileStone.text}
                    check={mileStone.done}
                    onChange={(checked) => onChangeMileStoneDone(checked, mileStone.mileStoneId)}
                />)
        })
    }

    return (
        <div>
            <VerticalFlex>
                {checkboxList()}
            </VerticalFlex>
            <Spacer10 />
            <Margin20>
                <TextField id="outlined-basic" label="ゴールまでの途中地点を入力" variant="outlined" fullWidth />
                <Spacer10 />
                <Button color="primary" variant="contained">追加</Button>
            </Margin20>
        </div>)
}

const Margin20 = styled.div`
    margin-left:30px;
`