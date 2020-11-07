import React, { useEffect, useState } from "react";
import { StudyStatus } from "../../../models/StudyStatus";
import Time from "../../../models/Time";
import { Timer } from "../../../models/Timer";
import CountingScreenCard from "../../molecule/CountingScreenCard";
interface Props {
    open: boolean
    onClose: () => void
    studyStatus: StudyStatus
    onFinishRest: () => void
}

export default (props: Props) => {

    //message
    const [message, setMessage] = useState("座っているのがしんどくなっていませんか？足をジタバタさせると気分転換になりますよ")

    //状態？描画？両方？
    const [seconds, setSeconds] = useState<Time>(new Time(0)) //何の時間・・・？
    const [restTime, setRestTime] = useState<Time>(new Time(0)) //休憩時間

    //残り時間。本当に？
    const leftTime = new Time(restTime.seconds - seconds.seconds)

    const initialize = () => {
        console.log("RestingCard-initialize")
        setRestTime(props.studyStatus.restGoalTime)
        if (props.studyStatus.startRestDate) {
            startTimer(props.studyStatus.startRestDate)
        } else {
            props.studyStatus.setStartRestDate()
            startTimer()
        }
    }

    //開いたら初期化する。Why?
    useEffect(() => {
        initialize()
    }, [])

    useEffect(() => {
        if (seconds.getValue() > restTime.getValue()) {
            onFinishRest()
        }
    }, [seconds])

    const incrementRestTime = (incrementValue: number) => {
        const newRestTime = new Time(restTime.getValue() + incrementValue)
        props.studyStatus.setRestTime(newRestTime)
        console.log({ newRestTime })
        setRestTime(newRestTime)
    }

    //ただTimerを動かす
    const startTimer = (startDate: Date = new Date()) => {
        //timerを再作成してスタートする
        const timer = new Timer(startDate, 0)
        timer?.start((second) => {
            setSeconds(new Time(second))
        })
    }

    const onFinishRest = () => {
        console.log("休憩終わりました〜")
        props.onFinishRest()
    }

    return (
        <>
            <CountingScreenCard
                onClose={props.onClose}
                onFinish={onFinishRest}
                finishButtonText="勉強を再開する"
                canFinish={true}

                topTitle="休憩中"
                onClickUp={() => incrementRestTime(10 * 60)}
                onClickDown={() => incrementRestTime(-10 * 60)}
                disableUp={restTime.isOverXmin(90)}
                disableDown={restTime.isLessXmin(10)}
                goalTimeText={restTime.format()}
                progress={seconds.getValue() / restTime.getValue()}
                centerText={leftTime.format()}

                onClickStartStopButton={undefined}
                initialButtonStatus={undefined}
                centerMessage={message}
            />
        </>
    )
}