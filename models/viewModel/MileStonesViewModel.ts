import { MileStone } from "../../graphQL/generated/types"

export class MileStonesViewModel {
    studyThemeId: string
    mileStones: MileStoneViewModel[]

    constructor(mileStones: Required<MileStone[]>) {
        if (mileStones.length === 0) {
            this.studyThemeId = ""
            this.mileStones = []
            return
        }
        this.studyThemeId = mileStones[0].studyThemeId!
        this.mileStones = mileStones.map(m => new MileStoneViewModel(m))
    }

    getSortedMileStones() {
        this.mileStones.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        return this.mileStones
    }

    getProgress() {
        const length = this.mileStones.length
        if (length === 0) return 0
        let count = 0
        for (const m of this.mileStones) {
            if (m.done === true) {
                count += 1
            }
        }

        return count / length
    }


}

export class MileStoneViewModel {
    mileStoneId: string
    done: boolean
    text: string
    createdAt: Date

    constructor(mileStone: MileStone) {
        this.mileStoneId = mileStone.mileStoneId!
        this.done = mileStone.done!
        this.text = mileStone.title!
        this.createdAt = new Date(mileStone.createdAt!)
    }
}