import { makeStyles } from "@material-ui/core"

export default () => {
    const useStyle = makeStyles({
        border: {
            borderRadius: 25,
            border: "2px solid #73AD21",
            padding: 20,
            width: 200,
            height: 150,
            borderStyle: "dotted"
        }
    })
    const classes = useStyle()
    return (
        <div className={classes.border}>
            hello
        </div>
    )
}