import { StudyRecord } from "../../graphQL/generated/types";
import { convertDateToJapanseString, convertDateToShortJapanseString, convertISOStringtoDate } from "../getNowDateISOString";
import Time from "../Time";

export class RecordViewModel {
    studyRecordId?: string
    studyThemeId?: string
    learned?: string
    createdAt?: Date
    studyTime?: number

    constructor(record: StudyRecord) {
        this.studyRecordId = record.studyRecordId!
        this.studyThemeId = record.studyThemeId!
        this.learned = record.learned!
        this.createdAt = new Date(record.createdAt!)
        this.studyTime = record.studyTime!
    }

    getStudyTimeText() {
        const time = new Time(this.studyTime!)
        return time.formatJapanese()
    }

    getDateText() {
        return convertDateToShortJapanseString(this.createdAt!)
    }
}