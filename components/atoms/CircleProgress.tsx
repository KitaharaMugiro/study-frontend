import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
    progress: number
}

export default (props: Props) => {
    return (
        <CircularProgressbar
            circleRatio={0.5}
            value={props.progress} text={`${Math.floor(props.progress)}%`}
            styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.75,
            })} />
    )
}