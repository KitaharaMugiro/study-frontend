import { ListId, StudyTheme } from "../../graphQL/generated/types";
import { RecordViewModel } from "./RecordViewModel";

export class StudyThemeViewModel {
    studyThemeId?: string
    title?: string
    startDate?: string
    listId?: ListId
    listTitle?: string
    clientUpdatedAt?: Date
    studyingTime?: number
    records?: RecordViewModel[]
    goal?: string

    constructor(card?: StudyTheme) {
        if (!card) {
            console.error("なんでcardがnull")
            return
        }
        this.studyThemeId = card.studyThemeId!
        this.title = card.title!
        this.startDate = card.startDate!
        this.listId = card.listId!
        this.clientUpdatedAt = new Date(card.clientUpdatedAt!)
        this.studyingTime = card.studyingTime!
        this.records = card.records?.map(r => new RecordViewModel(r!))!
        this.goal = card.goal!

        //最悪のコピペ
        const listTitles: any = {
            "TODO": "いつかやる",
            "DOING": "勉強中",
            "DONE": "完了"
        }
        this.listTitle = listTitles[this.listId.toString()]
    }
}