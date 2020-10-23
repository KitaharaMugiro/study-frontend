import { makeStyles } from "@material-ui/core"
import { MyColors } from "../../const/MyColors"
import AddIcon from '@material-ui/icons/Add';
//TODO: タップエフェクト、マウスオーバーエフェクト

export default () => {
    const useStyle = makeStyles({
        border: {
            borderRadius: 25,
            border: `2px dotted ${MyColors.silver}`,
            padding: 20,
            width: 100,
            height: 100,
            display: "grid",
            placeContent: "center",
            cursor: "pointer"
        }
    })
    const classes = useStyle()

    return (
        <div className={classes.border}>
            <AddIcon style={{ color: MyColors.silver, fontSize: 40 }} />
        </div>
    )
}