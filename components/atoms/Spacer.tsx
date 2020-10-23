import { makeStyles } from "@material-ui/core/styles";

interface Props {
    space: number
}

export default (props: Props) => {
    const useStyles = makeStyles((theme) => ({
        height: {
            height: props.space
        },
    }));
    const classes = useStyles()
    return (
        <div className={classes.height} />
    )
}