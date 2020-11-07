export default class {
    seconds: number
    constructor(seconds: number) {
        this.seconds = seconds
    }

    format() {
        if (this.seconds < 0) return "00:00"
        //00:00:00形式にする
        function zeroPadding(num: number) {
            return ('00' + num).slice(-2);
        }
        let seconds = this.seconds
        const hour = Math.floor(seconds / 60 / 60)
        seconds = seconds - hour * 60 * 60
        const minutes = Math.floor(seconds / 60)
        seconds = Math.floor(seconds - minutes * 60)
        if (hour === 0) {
            return `${zeroPadding(minutes)}:${zeroPadding(seconds)}`
        }
        return `${hour}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`
    }

    formatJapanese() {
        //00時間00分形式にする
        let seconds = this.seconds
        const hour = Math.floor(seconds / 60 / 60)
        seconds = seconds - hour * 60 * 60
        const minutes = Math.floor(seconds / 60)
        seconds = Math.floor(seconds - minutes * 60)
        if (hour === 0) {
            return `${minutes}分`
        }
        return `${hour}時間${minutes}分`
    }


    convertHour() {
        return this.seconds / 60 / 60
    }

    getValue() {
        return this.seconds
    }

    isOverXmin(X: number) {
        return this.seconds >= X * 60
    }

    isLessXmin(X: number) {
        return this.seconds <= X * 60
    }
}