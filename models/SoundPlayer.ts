import { Howl, Howler } from 'howler';
export class SoundPlayer {
    baseUrl = "https://planmaker.s3-ap-northeast-1.amazonaws.com/audio"
    private play(filename: string) {
        const url = this.baseUrl + "/" + filename
        const sound = new Howl({
            src: [url]
        });
        sound.play();
    }

    playWhenStartStudy() {
        this.play("info-girl1_info-girl1-ganbarimasyou1.mp3")
    }

    playWhenStudyEnd() {
        this.play("info-girl1_info-girl1-ganbattane1.mp3")
    }

    playWhenRestEnd() {
        this.play("info-girl1_info-girl1-mouhitoikidesu1.mp3")
    }
}