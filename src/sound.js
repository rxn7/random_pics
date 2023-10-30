const context = new AudioContext();
window.addEventListener('mousedown', () => {
    context.resume();
});
export class Sound {
    constructor(url) {
        this.url = url;
        this.buffer = undefined;
        this.sources = [];
        this.load();
    }
    load() {
        if (!this.url)
            return Promise.reject(new Error(`Missing or invalid URL: ${this.url}`));
        if (this.buffer)
            return Promise.resolve(this.buffer);
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', this.url, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                context.decodeAudioData(request.response, (buffer) => {
                    if (!buffer) {
                        console.log(`Sound decoding error: ${this.url}`);
                        reject(new Error(`Sound decoding error: ${this.url}`));
                        return;
                    }
                    this.buffer = buffer;
                    resolve(buffer);
                });
            };
            request.onerror = (err) => {
                console.log('Sound XMLHttpRequest error:', err);
                reject(err);
            };
            request.send();
        });
    }
    play(volume = 1, time = 0) {
        if (!this.buffer)
            return;
        const source = context.createBufferSource();
        source.buffer = this.buffer;
        const insertedAt = this.sources.push(source) - 1;
        source.onended = () => {
            source.stop(0);
            this.sources.splice(insertedAt, 1);
        };
        source.connect(context.destination);
        source.start(time);
    }
    stop() {
        this.sources.forEach((source) => {
            source.stop(0);
        });
        this.sources = [];
    }
}
