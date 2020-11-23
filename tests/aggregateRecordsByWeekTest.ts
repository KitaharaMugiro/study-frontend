import { assert } from "console";
import { StudyRecord } from "../graphQL/generated/types";
import { aggregateRecordsByWeek } from "../models/logics/aggregateCards";
import { RecordViewModel } from "../models/viewModel/RecordViewModel";
import { StudyRecordsViewModel } from "../models/viewModel/StudyRecordsViewModel";


describe('aggregateRecordsByWeek', () => {
    describe("何もレコードがない時でも7日分のデータが作成される", () => {
        it("何もレコードがない場合は長さが1で、keyとdataGroupを持っており、dataGroupの長さは7", () => {
            //arrange
            const records: StudyRecord[] = []
            const recordList = new StudyRecordsViewModel(records)

            //act
            const result = aggregateRecordsByWeek(recordList)

            //describe
            expect(result).toHaveLength(1)
            expect(result[0]).toHaveProperty("key")
            expect(result[0]).toHaveProperty("dataGroup")
            expect(result[0].dataGroup).toHaveLength(7)
        })

        it("keyは空白で、各データはdateが連番で時間は0", () => {
            //arrange
            const records: StudyRecord[] = []
            const recordList = new StudyRecordsViewModel(records)

            //act
            const result = aggregateRecordsByWeek(recordList)

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

    })

    describe("数学の勉強を今日3回した場合", () => {

    })

    describe("数学の勉強を昨日と今日した場合", () => {
    })

    describe("数学と英語の勉強を今日した場合", () => {
    })

    describe("数学と英語の勉強を昨日と今日した場合", () => {
    })
});