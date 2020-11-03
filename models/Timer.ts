//milisec撲滅 getTimeは/1000
export class Timer {
    startTime: Date;
    intervalId: number = 0;
    insetSeconds: number = 0

    constructor(injectedStartTime?: Date, insetSeconds?: number) {
        this.insetSeconds = insetSeconds || 0
        this.startTime = injectedStartTime || new Date()
    }

    displaySecondValue() {
        const now = new Date();
        const second = now.getTime() / 1000 - this.startTime.getTime() / 1000 + this.insetSeconds
        return second
    }

    substantialSecondValue() {
        const now = new Date();
        const second = now.getTime() / 1000 - this.startTime.getTime() / 1000
        return second
    }

    start(callback: (seconds: number) => void) {
        this.intervalId = window.setInterval(() => {
            callback(this.displaySecondValue())
        }, 1000)
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = 0;
        return this.displaySecondValue()
    }

    static format(seconds: number) {
        function zeroPadding(num: number) {
            return ('00' + num).slice(-2);
        }
        const hour = Math.floor(seconds / 60 / 60)
        seconds = seconds - hour * 60 * 60
        const minutes = Math.floor(seconds / 60)
        seconds = Math.floor(seconds - minutes * 60)
        return `${hour}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`
    }


}