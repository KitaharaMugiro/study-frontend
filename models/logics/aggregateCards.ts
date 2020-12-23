import { ListId, StudyRecord, StudyTheme } from "../../graphQL/generated/types";
import ListViewModel from "../viewModel/ListViewModel";
import { convertISOStringtoDate } from "./getNowDateISOString";

export const aggregateCardsByList = (cards: Required<StudyTheme[]>) => {
    const listIds: ListId[] = [ListId.Todo, ListId.Doing, ListId.Done]
    const result = []
    for (const listId of listIds) {
        const listViewModel = new ListViewModel(cards, listId)
        result.push(listViewModel)
    }
    return result
}

type GraphDataGroup = {
    date: number,
    studyTime: number
}

type GraphDataType = {
    key: string
    dataGroup: GraphDataGroup[]
}

//テーマごとに集計している。
export const aggregateRecordsByWeek = (records: StudyRecord[], themes: StudyTheme[] = []) => {
    if (records === undefined) return []
    if (themes === undefined) return []
    const result: GraphDataType[] = []
    for (const record of records) {
        const themeName = themes.find(theme => theme.studyThemeId === record.studyThemeId)?.title || "unknown"
        const date = convertISOStringtoDate(record.createdAt || "")
        if ((new Date().getTime() - date.getTime()) > 7 * 24 * 60 * 60 * 1000) continue
        const termDay = (new Date().getDate() - date.getDate())
        const graphDate = 7 - termDay

        const existData = result.find(r => r.key === themeName)
        if (existData) {
            const existDate = existData.dataGroup.find(r => r.date === graphDate)
            if (existDate) {
                existDate.studyTime += Math.floor((record.studyTime || 0) / 60)
            } else {
                existData.dataGroup.push(
                    {
                        date: graphDate,
                        studyTime: Math.floor((record.studyTime || 0) / 60)
                    }
                )
            }
        } else {
            result.push(
                {
                    key: themeName,
                    dataGroup: [{
                        date: graphDate,
                        studyTime: Math.floor((record.studyTime || 0) / 60)
                    }]
                }
            )
        }

        for (const studyTheme of result) {
            studyTheme.dataGroup.sort((a, b) => a.date - b.date)
        }
    }


    const emptyData: GraphDataType = {
        key: "",
        dataGroup: []
    }
    for (var i = 0; i < 7; i++) {
        emptyData.dataGroup.push({ date: i, studyTime: 0 })
    }

    result.push(emptyData)
    return result
}

/**
 * 作りたいデータの例
 *     const now = 7
        const t1 = 6
        const t2 = 5
 *     const groupedData = [
        { key: "数学", dataGroup: [{ date: t2, studyTime: 50 }, { date: now, studyTime: 60 }] },
        { key: "英語", dataGroup: [{ date: t2, studyTime: 20 }, { date: now, studyTime: 20 }] },
        { key: "音楽", dataGroup: [{ date: t1, studyTime: 20 }, { date: now, studyTime: 20 }] },
        {
            key: "", dataGroup: [
                { date: 1, studyTime: 0 },
                { date: 2, studyTime: 0 },
                { date: 3, studyTime: 0 },
                { date: 4, studyTime: 0 },
                { date: 5, studyTime: 0 },
                { date: 6, studyTime: 0 },
                { date: 7, studyTime: 0 }

            ]
        }
    ]
 *
 */