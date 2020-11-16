import LinearProgress from "@material-ui/core/LinearProgress"
import React from "react"

interface Props {
    progress: number
}

const Progress = (props: Props) => {
    return (
        <LinearProgress variant="determinate" value={props.progress} />
    )
};

export default Progress;