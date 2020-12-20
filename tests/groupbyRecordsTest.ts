import { StudyRecord, StudyTheme } from "../graphQL/generated/types"
import { convertDateToJapanseStringYearMonthDay } from "../models/logics/getNowDateISOString"
import groupbyRecords from "../models/logics/groupbyRecords"
import Utils from "../models/logics/Utils"

describe('groupbyRecords', () => {
    describe("1日分のデータに、１件のレコードがある時", () => {
        it("", () => {
            //arrange
            const today = new Date()
            const records: StudyRecord[] = [{
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: today.toISOString(),
                studyTime: 100 * 60
            }]
            const themes: StudyTheme[] = [
                { studyThemeId: "math", title: "数学" }
            ]
            const result = groupbyRecords(records, themes)

            expect(result).toHaveLength(1)
            expect(result[0].dateText).toBe(convertDateToJapanseStringYearMonthDay(today))
            let i = 0
            for (const d of result[0].dataGroup) {
                expect(d.timeText).toBe("100分")
                expect(d.title).toBe("数学")
                expect(d.learned).toBe("楽しい")
                i++
            }
        })
    })

    describe("1日分のデータに、2件のレコードがある時", () => {
        it("", () => {
            //arrange
            const today = new Date()
            const records: StudyRecord[] = [{
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: today.toISOString(),
                studyTime: 100 * 60
            },
            {
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: today.toISOString(),
                studyTime: 100 * 60
            }]
            const themes: StudyTheme[] = [
                { studyThemeId: "math", title: "数学" }
            ]
            const result = groupbyRecords(records, themes)

            expect(result).toHaveLength(1)
            expect(result[0].dateText).toBe(convertDateToJapanseStringYearMonthDay(today))
            for (let i = 0; i < 2; i++) {
                const d = result[0].dataGroup[i]
                expect(d.timeText).toBe("100分")
                expect(d.title).toBe("数学")
                expect(d.learned).toBe("楽しい")
            }
        })
    })

    describe("2日分のデータに、1件ずつレコードがある時", () => {
        it("", () => {
            //arrange
            const today = new Date()
            const yesterday = new Date()
            yesterday.setDate(today.getDate() - 1)

            const records: StudyRecord[] = [{
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: today.toISOString(),
                studyTime: 100 * 60
            },
            {
                studyRecordId: "record",
                studyThemeId: "english",
                learned: "楽しい",
                createdAt: yesterday.toISOString(),
                studyTime: 100 * 60
            }]
            const themes: StudyTheme[] = [
                { studyThemeId: "math", title: "数学" },
                { studyThemeId: "english", title: "英語" }
            ]
            const result = groupbyRecords(records, themes)

            expect(result).toHaveLength(2)
            expect(result[0].dateText).toBe(convertDateToJapanseStringYearMonthDay(today))
            expect(result[1].dateText).toBe(convertDateToJapanseStringYearMonthDay(yesterday))

            const d = result[0].dataGroup[0]
            expect(d.title).toBe("数学")
            const d2 = result[1].dataGroup[0]
            expect(d2.title).toBe("英語")
        })
    })
})