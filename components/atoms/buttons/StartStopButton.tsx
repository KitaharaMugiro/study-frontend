import { useEffect, useState } from "react"
import { MyColors } from "../../../const/MyColors"

export type StartStopButtonStatus = "PLAY" | "STOP" | "PAUSE"
interface Props {
    initialStatus?: StartStopButtonStatus
    size?: number
    onClick: (prev: StartStopButtonStatus, now: StartStopButtonStatus) => void
}

export default (props: Props) => {
    const [status, setStatus] = useState<StartStopButtonStatus>("PLAY")
    useEffect(() => {
        console.log(`button initial status = ${props.initialStatus}`)
        setStatus(props.initialStatus || "PLAY")
    }, [props.initialStatus])

    const widthHeight = props?.size || 100
    const renderShape = () => {
        if (status == "PLAY") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={widthHeight} height={widthHeight} viewBox="0 0 36 36">
                    <g fill="none" fillRule="evenodd">
                        <rect width="36" height="36" fill={MyColors.theme} rx="18"></rect>
                        <path fill="#fff" d="M13 11.994c0-1.101.773-1.553 1.745-.997l10.51 6.005c.964.55.972 1.439 0 1.994l-10.51 6.007c-.964.55-1.745.102-1.745-.997V11.994z"></path>
                    </g>
                </svg>
            )
        } else if (status == "STOP") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={widthHeight} height={widthHeight} viewBox="0 0 36 36">
                    <g fill="none" fillRule="evenodd">
                        <rect width="36" height="36" fill="#FF897A" rx="18"></rect>
                        <rect width="14" height="14" x="11" y="11" fill="#fff" rx="1.5"></rect>
                    </g>
                </svg>
            )
        } else if (status == "PAUSE") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={widthHeight} height={widthHeight} viewBox="0 0 36 36">
                    <g fill="none" fillRule="evenodd">
                        <rect width="36" height="36" fill="#FF897A" rx="18"></rect>
                        <rect width="4" height="16" x="10" y="10" fill="#fff" rx="1.5"></rect>
                        <rect width="4" height="16" x="22" y="10" fill="#fff" rx="1.5"></rect>
                    </g>
                </svg>
            )
        }
    }

    const onClick = () => {
        const prevStatus = status
        let nowStatus = status
        if (status == "PLAY") {
            nowStatus = "PAUSE"
        } else if (status == "PAUSE") {
            nowStatus = "PLAY"
        }
        setStatus(nowStatus)
        props.onClick(prevStatus, nowStatus)
    }

    return (
        <span style={{ textAlign: "center" }} onClick={onClick}>
            {renderShape()}
        </span>
    )
}