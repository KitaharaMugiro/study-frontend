import { ListId, StudyTheme } from "../graphQL/generated/types";

export const aggregateCards = (cards: Required<StudyTheme[]>) => {
    const listIds: ListId[] = [ListId.Todo, ListId.Doing, ListId.Done]
    const listTitles: any = {
        "TODO": "いつかやる",
        "DOING": "勉強中",
        "DONE": "完了"
    }
    const result = []
    for (const listId of listIds) {
        const aggregatedCards = cards.filter(c => c.listId === listId)
        const title = listTitles[listId.toString()]
        result.push({
            listId: listId,
            listTitle: title,
            cards: aggregatedCards
        })
    }
    return result
}