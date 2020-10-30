import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
    progress: number
}

export default (props: Props) => {
    const percent = props.progress * 100
    return (
        <CircularProgressbar
            circleRatio={0.5}
            value={percent} text={`${Math.floor(percent)}%`}
            styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.75,
            })} />
    )
}