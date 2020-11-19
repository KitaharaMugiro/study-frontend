import { MileStone, StudyRecord } from "../../graphQL/generated/types"
import { RecordViewModel } from "./RecordViewModel"

export class StudyRecordsViewModel {
    studyThemeId: string
    records: RecordViewModel[]

    constructor(records: Required<StudyRecord[]>) {
        if (records.length === 0) {
            this.studyThemeId = ""
            this.records = []
            return
        }
        this.studyThemeId = records[0].studyThemeId!
        this.records = records.map(m => new RecordViewModel(m))
    }

    getSortedRecords() {
        this.records.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
        return this.records
    }
}
