import { StudyRecord } from "../../graphQL/generated/types";

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
        this.studyTime = record.studyTime! / 1000 //TODO: 1000で割るのやめたい
    }
}