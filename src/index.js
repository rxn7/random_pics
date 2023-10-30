import Marquee from "./marquee.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
window.addEventListener('resize', resize);
let prevTime = 0;
const marquees = [];
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
async function init() {
    resize();
    for (let i = 0; i < 1000; ++i) {
        marquees.push(new Marquee());
    }
}
function draw(time) {
    const dt = Math.min((time - prevTime) * 0.001, 1 / 60);
    prevTime = time;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const marq of marquees) {
        if (!marq.isReady)
            continue;
        marq.update(dt);
        marq.draw(ctx);
    }
    requestAnimationFrame(draw);
}
init();
requestAnimationFrame(draw);
