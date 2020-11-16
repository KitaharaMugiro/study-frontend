import { ListId, StudyTheme } from "../../graphQL/generated/types"
import { StudyThemeViewModel } from "./StudyThemeViewModel"

export default class {
    listId: ListId
    listTitle: string
    cards: StudyThemeViewModel[]

    constructor(cards: Required<StudyTheme[]>, listId: ListId) {
        const listTitles: any = {
            "TODO": "いつかやる",
            "DOING": "勉強中",
            "DONE": "完了"
        }
        const title = listTitles[listId.toString()]

        const aggregatedCards = cards.filter(c => c.listId === listId)
        const cardViewModels = aggregatedCards.map(c => new StudyThemeViewModel(c))
        this.listId = listId
        this.listTitle = title
        this.cards = cardViewModels
        console.log({ cardViewModels })
    }

}