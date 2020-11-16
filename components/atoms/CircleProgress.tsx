import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
    progress: number
    centerText: string
}

const CircleProgress = (props: Props) => {
    const percent = props.progress * 100
    return (
        <CircularProgressbar
            circleRatio={1}
            value={percent} text={props.centerText}
        // styles={buildStyles({
        //     // Rotation of path and trail, in number of turns (0-1)
        //     rotation: 0.75,
        // })} 
        />
    )
};

export default CircleProgress;