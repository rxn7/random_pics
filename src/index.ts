import Marquee from "./marquee.js";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

window.addEventListener('resize', resize);

let prevTime: DOMHighResTimeStamp = 0;
const marquees: Array<Marquee> = []

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

async function init() {
	resize();

	for(let i=0; i<1_000; ++i) {
		marquees.push(new Marquee());
	}
}

function draw(time: DOMHighResTimeStamp) {
	const dt: number = Math.min((time - prevTime) * 0.001, 1 / 60);
	prevTime = time;

	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for(const marq of marquees) {
		if(!marq.isReady) continue;

		marq.update(dt);
		marq.draw(ctx);
	}

	requestAnimationFrame(draw);
}

init();
requestAnimationFrame(draw);
