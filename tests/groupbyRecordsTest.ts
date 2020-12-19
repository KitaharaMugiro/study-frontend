import { StudyRecord, StudyTheme } from "../graphQL/generated/types"
import groupbyRecords from "../models/logics/groupbyRecords"

describe('aggregateRecordsByWeek', () => {
    describe("何もレコードがない時でも7日分のデータが作成される", () => {
        it("", () => {
            //arrange
            const records: StudyRecord[] = [{
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: new Date().toISOString(),
                studyTime: 100 * 60
            }]
            const themes: StudyTheme[] = [
                { studyThemeId: "math", title: "数学" }
            ]

            const result = groupbyRecords(records, themes)
        })
    }
}