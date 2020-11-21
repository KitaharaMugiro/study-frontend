import { StartStopButtonStatus } from "../components/atoms/buttons/StartStopButton"
import { getNowDateISOString } from "./logics/getNowDateISOString"
import useLocal, { deleteLocal, useLocalJson } from "./hooks/useLocal"
import Time from "./Time"

export class StudyStatus {
    nowStudyTheme?: string
    nowStudyRecord?: string
    playStatus: StartStopButtonStatus = "PLAY"
    goalTime: Time = new Time(60 * 25)
    restGoalTime: Time = new Time(60 * 5) //何分休憩するか
    insetSeconds: Time = new Time(0)
    fromPersistFlag: boolean = false
    clickedPlayButtonDate: Date = new Date()
    isRestTime: boolean = false
    startRestDate: Date | null = null

    constructor() {
        this.fromPersist()
    }

    //学習したら記憶 done
    start(studyTheme: string, studyRecord: string) {
        this.nowStudyRecord = studyRecord
        this.nowStudyTheme = studyTheme
        //そのほかも初期化すべき？
        this.persist()
    }

    //play statusが変わったら記録 done
    setPlayStatus(status: StartStopButtonStatus) {
        this.playStatus = status
        if (status === "PAUSE") {
            this.clickedPlayButtonDate = new Date()
        }
        this.persist()
    }

    //勉強時間をゼロに初期化する
    setInitialStudyTime() {
        this.insetSeconds = new Time(0)
        this.startRestDate = null
        this.playStatus = "PLAY"
        this.clickedPlayButtonDate = new Date()
        this.persist()
    }

    //Pauseしたときに記録 done
    setInsetSeconds(insetSeconds: Time) {
        this.insetSeconds = insetSeconds
        this.persist()
    }

    //ゴールを決めたときに記録 使ってないけどdone
    setGoalTime(goalTime: Time) {
        this.goalTime = goalTime
        this.persist()
    }

    setRestTime(restTime: Time) {
        this.restGoalTime = restTime
        this.persist()
    }

    setIsRestTime(isRestTime: boolean) {
        this.isRestTime = isRestTime
        this.persist()
    }

    setStartRestDate() {
        this.startRestDate = new Date()
        this.persist()
    }


    //終了したら記録を削除 done
    finish() {
        deleteLocal("StudyStatus")
        this.fromPersistFlag = false
    }

    private persist() {
        useLocalJson("StudyStatus", {
            nowStudyTheme: this.nowStudyTheme!,
            nowStudyRecord: this.nowStudyRecord!,
            playStatus: this.playStatus,
            insetSeconds: this.insetSeconds.seconds,
            goalTime: this.goalTime.seconds,
            restTime: this.restGoalTime.seconds,
            clickedPlayButtonDate: this.clickedPlayButtonDate.toISOString(),
            startRestDate: this.startRestDate?.toISOString() || "",
            isRestTime: this.isRestTime
        })
    }

    private fromPersist() {
        console.log("check from persist")
        const obj = useLocalJson("StudyStatus")
        if (obj) {
            console.log("from persist")
            this.fromPersistFlag = true

            this.nowStudyTheme = obj.nowStudyTheme
            this.nowStudyRecord = obj.nowStudyRecord
            this.insetSeconds = new Time(obj.insetSeconds)
            this.playStatus = obj.playStatus
            this.goalTime = new Time(obj.goalTime)
            this.restGoalTime = new Time(obj.restTime)
            this.clickedPlayButtonDate = new Date(obj.clickedPlayButtonDate)
            this.startRestDate = obj.startRestDate === "" ? this.startRestDate = null : new Date(obj.startRestDate)
            this.isRestTime = obj.isRestTime
        } else {
            console.log("Not from persist")
            this.fromPersistFlag = false
        }
    }

    isStudying() {
        console.log({ fromPersist: this.fromPersistFlag, isRestTime: this.isRestTime })
        return this.fromPersistFlag && !this.isRestTime
    }

    isResting() {
        return this.fromPersistFlag && this.isRestTime
    }
}