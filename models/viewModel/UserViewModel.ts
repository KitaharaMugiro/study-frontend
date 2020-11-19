import { StudyRecord, User } from "../../graphQL/generated/types";
import { convertDateToJapanseString, convertDateToShortJapanseString, convertISOStringtoDate } from "../getNowDateISOString";
import Time from "../Time";

export class UserViewModel {
    userId: string
    name: string
    totalStudyTime: Time

    constructor(user: User) {
        this.userId = user.userId
        this.name = user.name
        this.totalStudyTime = new Time(user.totalStudyTime)
    }

    getStudyTimeText() {
        return this.totalStudyTime.formatJapanese()
    }
}