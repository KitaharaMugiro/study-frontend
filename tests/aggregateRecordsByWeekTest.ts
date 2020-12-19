import { StudyRecord, StudyTheme } from "../graphQL/generated/types";
import { aggregateRecordsByWeek } from "../models/logics/aggregateCards";

describe('aggregateRecordsByWeek', () => {
    describe("何もレコードがない時でも7日分のデータが作成される", () => {
        it("何もレコードがない場合は長さが1で、keyとdataGroupを持っており、dataGroupの長さは7", () => {
            //arrange
            const records: StudyRecord[] = []

            //act
            const result = aggregateRecordsByWeek(records)

            //describe
            expect(result).toHaveLength(1)
            expect(result[0]).toHaveProperty("key")
            expect(result[0]).toHaveProperty("dataGroup")
            expect(result[0].dataGroup).toHaveLength(7)
        })

        it("keyは空白で、各データはdateが連番で時間は0", () => {
            //arrange
            const records: StudyRecord[] = []

            //act
            const result = aggregateRecordsByWeek(records)

            //describe
            expect(result).toHaveLength(1)
            expect(result[0].key).toBe("")
            let i = 0
            for (const d of result[0].dataGroup) {
                expect(d.date).toBe(i)
                expect(d.studyTime).toBe(0)
                i++
            }
        })
    })

    describe("数学の勉強を今日した場合", () => {
        it("数学のデータと空のデータが作成される", () => {
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

            //act
            const result = aggregateRecordsByWeek(records, themes)

            //describe
            expect(result).toHaveLength(2)
            expect(result[0].key).toBe("数学")
            let i = 0
            for (const d of result[0].dataGroup) {
                expect(d.date).toBe(8)
                expect(d.studyTime).toBe(100)
                i++
            }
        })
    })

    describe("数学の勉強を今日3回した場合", () => {
        it("数学のデータと空のデータが作成され、数学のデータに３件の学習履歴が登録されている", () => {
            //arrange
            const records: StudyRecord[] = [{
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: new Date().toISOString(),
                studyTime: 100 * 60
            },
            {
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: new Date().toISOString(),
                studyTime: 100 * 60
            },
            {
                studyRecordId: "record",
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: new Date().toISOString(),
                studyTime: 100 * 60
            }]
            const themes: StudyTheme[] = [
                { studyThemeId: "math", title: "数学" }
            ]

            //act
            const result = aggregateRecordsByWeek(records, themes)

            //describe
            expect(result).toHaveLength(2)
            expect(result[0].key).toBe("数学")
            let i = 0
            for (const d of result[0].dataGroup) {
                expect(d.date).toBe(8)
                expect(d.studyTime).toBe(100)
                i++
            }
        })
    })

    describe("数学の勉強を昨日と今日した場合", () => {
        it("数学のデータは２件登録され、日付が7と6になる", () => {
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
                studyThemeId: "math",
                learned: "楽しい",
                createdAt: yesterday.toISOString(),
                studyTime: 100 * 60
            }]
            const themes: StudyTheme[] = [
                { studyThemeId: "math", title: "数学" }
            ]

            //act
            const result = aggregateRecordsByWeek(records, themes)

            //describe
            expect(result).toHaveLength(2)
            expect(result[0].key).toBe("数学")
            let i = 0
            for (const d of result[0].dataGroup) {
                expect(d.date).toBe(8 - i)
                expect(d.studyTime).toBe(100)
                i++
            }
        })
    })

    describe("数学と英語の勉強を昨日と今日した場合", () => {
        it("数学のデータと英語のデータが作成される", () => {
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
                { studyThemeId: "english", title: "英語" },
            ]

            //act
            const result = aggregateRecordsByWeek(records, themes)

            //describe
            expect(result).toHaveLength(3)
            expect(result[0].key).toBe("数学")
            expect(result[1].key).toBe("英語")
            let i = 0
            for (const d of result[0].dataGroup) {
                expect(d.date).toBe(8)
                expect(d.studyTime).toBe(100)
                i++
            }
            i = 0
            for (const d of result[1].dataGroup) {
                expect(d.date).toBe(7)
                expect(d.studyTime).toBe(100)
                i++
            }
        })
    })

});