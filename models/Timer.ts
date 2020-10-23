export class Timer {
    startTime: Date;
    intervalId: number = 0;

    constructor(injectedStartTime?: Date) {
        if (injectedStartTime) {
            this.startTime = injectedStartTime
        } else {
            this.startTime = new Date();
        }
    }

    start(callback: (seconds: number) => void) {
        this.intervalId = window.setInterval(() => {
            const now = new Date();
            const milliSeconds = now.getTime() - this.startTime.getTime()
            const second = milliSeconds / 1000
            callback(second)
        }, 1000)
    }

    reset() {
        clearInterval(this.intervalId);
        this.intervalId = 0;
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