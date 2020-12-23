import { StudyRecord, StudyTheme } from "../../graphQL/generated/types";
import { convertDateToJapanseStringYearMonthDay } from "./getNowDateISOString";

type GroupbyDayDataGroup = {
    title: string
    learned: string
    timeText: string
}

type GroupbyDayDataGroupList = {
    dateText: string
    dateTime: number
    dataGroup: GroupbyDayDataGroup[]
}

export default (records: StudyRecord[], themes: StudyTheme[]): GroupbyDayDataGroupList[] => {
    //型の意味がない対応だなあ
    if (records === undefined) return []
    if (themes === undefined) return []
    const result = []
    for (const record of records) {
        const date = new Date(record.createdAt || "")
        const themeName = themes.find(theme => theme.studyThemeId === record.studyThemeId)?.title || "unknown"
        const dateText = convertDateToJapanseStringYearMonthDay(date)
        const existData = result.find(r => r.dateText === dateText)
        const studyTime = record.studyTime || 0
        const timeText = studyTime < 60 ? Math.floor(studyTime) + "秒" : Math.floor(studyTime / 60) + "分"
        if (existData) {
            existData.dataGroup.push({
                title: themeName,
                learned: record.learned || "",
                timeText: timeText
            })
        } else {
            const data = {
                dateText: dateText,
                dateTime: date.getTime(),
                dataGroup: [{
                    title: themeName,
                    learned: record.learned || "",
                    timeText: timeText
                }]
            }
            result.push(data)
        }
    }
    return result.sort((a, b) => b.dateTime - a.dateTime)
}

/**
 * 作りたいデータ
 *     const data = [
        {
            dateText: "2021年1月1日",
            dataGroup: [{
                title: "数学",
                learned: "楽しい",
                timeText: "42分"
            },
            {
                title: "数学",
                learned: "楽しい",
                timeText: "42分"
            }]
        },
        {
            dateText: "2020年12月29日",
            dataGroup: [{
                title: "英語",
                learned: "楽しい",
                timeText: "42分"
            },
            {
                title: "英語",
                learned: "楽しい",
                timeText: "42分"
            }]
        }
    ]

 */