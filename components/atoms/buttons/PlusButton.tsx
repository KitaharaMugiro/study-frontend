import { makeStyles } from "@material-ui/core"
import { MyColors } from "../../../const/MyColors"
import AddIcon from '@material-ui/icons/Add';
import styled from "styled-components";
import { ComponentsStyle } from "../../../const/ComponentsStyle";
//TODO: タップエフェクト、マウスオーバーエフェクト
const Border = styled.div`
    border-radius: 25px;
    margin:5px;
    padding:10px;
    border: 2px dotted ${MyColors.theme};
    width: ${ComponentsStyle.CardWidth}px;
    height: ${ComponentsStyle.CardHeight}px;
    display: grid;
    place-content: center;
    cursor: pointer;
    :hover {
        filter: brightness(80%);
    }
`

interface Props {
    onClick: () => void
}

const PlusButton = (props: Props) => {
    return (
        <Border onClick={props.onClick}>
            <AddIcon style={{ color: MyColors.theme, fontSize: 40 }} />
        </Border>
    )
};

export default PlusButton;

