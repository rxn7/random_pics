export default class Marquee {
    constructor() {
        this.isReady = false;
        this.size = 32;
        this.speed = 100.0;
        this.px = 0;
        this.py = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 32 + 5;
        this.speed = Math.random() * 1000 + 50;
        this.image = new Image();
        this.image.src = `https://picsum.photos/32?nocache=${Math.random()}`;
        this.image.onload = () => this.isReady = true;
        this.px = Math.random() * (window.innerWidth - this.size);
        this.py = Math.random() * (window.innerHeight - this.size);
        this.vx = Math.random();
        this.vy = Math.random();
        const magnitude = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx /= magnitude;
        this.vy /= magnitude;
    }
    update(dt) {
        this.px += this.vx * dt * this.speed;
        this.py += this.vy * dt * this.speed;
        if (this.py < 0) {
            this.py = 0.0;
            this.vy *= -1;
        }
        if (this.px < 0) {
            this.px = 0.0;
            this.vx *= -1;
        }
        if (this.px + this.size > window.innerWidth) {
            this.px = window.innerWidth - this.size;
            this.vx *= -1;
        }
        if (this.py + this.size > window.innerHeight) {
            this.py = window.innerHeight - this.size;
            this.vy *= -1;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.px, this.py, this.size, this.size);
    }
}
