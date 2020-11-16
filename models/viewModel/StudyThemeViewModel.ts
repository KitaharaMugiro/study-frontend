import { ListId, StudyTheme } from "../../graphQL/generated/types";
import RecordViewModel from "./RecordViewModel";

export default class {
    studyThemeId?: string
    title?: string
    startDate?: string
    listId?: ListId
    clientUpdatedAt?: Date
    studyingTime?: number
    records?: RecordViewModel[]

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

    }
}