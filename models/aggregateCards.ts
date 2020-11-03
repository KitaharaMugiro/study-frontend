import { ListId, StudyTheme } from "../graphQL/generated/types";

export const aggregateCards = (cards: Required<StudyTheme[]>) => {
    const listIds: ListId[] = [ListId.Todo, ListId.Doing, ListId.Done]
    const result = []
    for (const listId of listIds) {
        const aggregatedCards = cards.filter(c => c.listId === listId)
        result.push({
            listId: listId,
            listTitle: listId.toString(),
            cards: aggregatedCards
        })
    }
    return result
}