import { StartStopButtonStatus } from "../components/atoms/buttons/StartStopButton"
import { getNowDateISOString } from "./getNowDateISOString"
import useLocal, { deleteLocal, useLocalJson } from "./hooks/useLocal"
import Time from "./Time"

export class StudyStatus {
    nowStudyTheme?: string
    nowStudyRecord?: string
    playStatus: StartStopButtonStatus = "PLAY"
    goalTime: Time = new Time(60)
    insetSeconds: Time = new Time(0)
    fromPersistFlag: boolean = false
    clickedPlayButtonDate: Date = new Date()

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
            clickedPlayButtonDate: this.clickedPlayButtonDate.toISOString()
        })
    }

    private fromPersist() {
        console.log("from persist")
        const obj = useLocalJson("StudyStatus")
        if (obj) {
            console.log("学習途中判定")
            this.fromPersistFlag = true

            this.nowStudyTheme = obj.nowStudyTheme
            this.nowStudyRecord = obj.nowStudyRecord
            this.insetSeconds = new Time(obj.insetSeconds)
            this.playStatus = obj.playStatus
            this.goalTime = new Time(obj.goalTime)
            this.clickedPlayButtonDate = new Date(obj.clickedPlayButtonDate)
        } else {
            console.log("学習途中ではない判定")
            this.fromPersistFlag = false
        }
    }

    isStudyingTheThemes(themeIdList: string[]) {
        if (!themeIdList) return false
        if (!this.fromPersistFlag) return false
        console.log(themeIdList)
        console.log(`が${this.nowStudyTheme}を含んでいるならstudying`)
        return themeIdList.includes(this.nowStudyTheme!)
    }

    isStudying() {
        return this.fromPersistFlag
    }
}