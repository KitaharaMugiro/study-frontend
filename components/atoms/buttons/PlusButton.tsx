import { makeStyles } from "@material-ui/core"
import { MyColors } from "../../../const/MyColors"
import AddIcon from '@material-ui/icons/Add';
import styled from "styled-components";
//TODO: タップエフェクト、マウスオーバーエフェクト
const Border = styled.div`
    margin: 10px;
    border-radius: 25px;
    border: 2px dotted ${MyColors.silver};
    padding: 20px;
    width: 100px;
    height: 100px;
    display: grid;
    place-content: center;
    cursor: pointer;
`
export default () => {
    return (
        <Border>
            <AddIcon style={{ color: MyColors.silver, fontSize: 40 }} />
        </Border>
    )
}

