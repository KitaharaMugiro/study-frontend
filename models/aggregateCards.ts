import { ListId, StudyTheme } from "../graphQL/generated/types";
import ListViewModel from "./viewModel/ListViewModel";

export const aggregateCards = (cards: Required<StudyTheme[]>) => {
    const listIds: ListId[] = [ListId.Todo, ListId.Doing, ListId.Done]
    const result = []
    for (const listId of listIds) {
        const listViewModel = new ListViewModel(cards, listId)
        result.push(listViewModel)
    }
    return result
}