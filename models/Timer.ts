export class Timer {
    startTime: Date;
    intervalId: number = 0;
    insetSeconds: number = 0

    constructor(injectedStartTime?: Date, insetSeconds?: number) {
        this.insetSeconds = insetSeconds || 0
        this.startTime = injectedStartTime || new Date()
    }

    displayMiliSecondValue() {
        const now = new Date();
        const milliSeconds = now.getTime() - this.startTime.getTime() + this.insetSeconds
        return milliSeconds
    }

    substantialSecondValue() {
        const now = new Date();
        const milliSeconds = now.getTime() - this.startTime.getTime()
        const second = milliSeconds / 1000
        return second
    }

    start(callback: (seconds: number) => void) {
        this.intervalId = window.setInterval(() => {
            callback(this.displayMiliSecondValue() / 1000)
        }, 1000)
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = 0;
        return this.displayMiliSecondValue()
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