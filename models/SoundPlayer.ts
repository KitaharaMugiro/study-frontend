import { Howl, Howler } from 'howler';
import { MySounds } from '../const/MySounds';
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
        this.play(MySounds.startStudy)
    }

    playWhenStudyEnd() {
        this.play(MySounds.studyEnd)
    }

    playWhenRestEnd() {
        this.play(MySounds.restEnd)
    }
}