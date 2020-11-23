import { ListId, StudyTheme } from "../../graphQL/generated/types";
import ListViewModel from "../viewModel/ListViewModel";
import { StudyRecordsViewModel } from "../viewModel/StudyRecordsViewModel";

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

export const aggregateRecordsByWeek = (records: StudyRecordsViewModel) => {
    const result: GraphDataType[] = [{
        key: "",
        dataGroup: []
    }]
    for (var i = 0; i < 7; i++) {
        result[0].dataGroup.push({ date: i, studyTime: 0 })
    }
    return result
}  