export default class {
    seconds: number
    constructor(seconds: number) {
        this.seconds = seconds
    }

    format() {
        //00:00:00形式にする
        function zeroPadding(num: number) {
            return ('00' + num).slice(-2);
        }
        let seconds = this.seconds
        const hour = Math.floor(seconds / 60 / 60)
        seconds = seconds - hour * 60 * 60
        const minutes = Math.floor(seconds / 60)
        seconds = Math.floor(seconds - minutes * 60)
        return `${hour}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`
    }

    convertHour() {
        return this.seconds / 60 / 60
    }

    getValue() {
        return this.seconds
    }
}