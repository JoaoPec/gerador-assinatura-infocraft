import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const BLUE = "#000078";
const WHITE = "#ffffff";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = join(root, "assets");

mkdirSync(assetsDir, { recursive: true });

function save(name, canvas) {
  writeFileSync(join(assetsDir, name), canvas.toBuffer("image/png"));
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawBlueCircle(ctx, size) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2;

  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = BLUE;
  ctx.fill();
}

function drawContactIcon(draw) {
  const size = 24;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  draw(ctx, size);
  return canvas;
}

function drawContactIconBadge(draw) {
  const size = 24;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  drawBlueCircle(ctx, size);
  draw(ctx, size);
  return canvas;
}

function drawSocialIcon(draw) {
  const size = 44;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  drawBlueCircle(ctx, size);
  draw(ctx, size);
  return canvas;
}

save(
  "icon-email.png",
  drawContactIcon((ctx) => {
    ctx.strokeStyle = BLUE;
    ctx.fillStyle = BLUE;
    ctx.lineWidth = 1.8;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeRect(4, 6, 16, 12);
    ctx.beginPath();
    ctx.moveTo(4, 7);
    ctx.lineTo(12, 13);
    ctx.lineTo(20, 7);
    ctx.stroke();
  })
);

save(
  "icon-phone.png",
  drawContactIconBadge((ctx) => {
    ctx.fillStyle = WHITE;
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";

    roundRect(ctx, 9, 4.5, 6, 15, 1.3);
    ctx.stroke();

    roundRect(ctx, 10, 6.5, 4, 10, 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(12, 5.8, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(10.8, 16.5, 2.4, 0.6);
  })
);

save(
  "website-globe.png",
  drawContactIcon((ctx, size) => {
    const cx = size / 2;
    const cy = size / 2;
    const r = 9;
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy, 4, r, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 3, cy - 6);
    ctx.quadraticCurveTo(cx, cy - 8, cx + 3, cy - 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 3, cy + 6);
    ctx.quadraticCurveTo(cx, cy + 8, cx + 3, cy + 6);
    ctx.stroke();
  })
);

save(
  "social-facebook.png",
  drawSocialIcon((ctx, size) => {
    ctx.fillStyle = WHITE;
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("f", size / 2, size / 2 + 2);
  })
);

save(
  "social-linkedin.png",
  drawSocialIcon((ctx, size) => {
    ctx.fillStyle = WHITE;
    ctx.font = "bold 17px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("in", size / 2, size / 2 + 1);
  })
);

save(
  "social-instagram.png",
  drawSocialIcon((ctx, size) => {
    ctx.strokeStyle = WHITE;
    ctx.fillStyle = WHITE;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";

    roundRect(ctx, 12, 12, 20, 20, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(29, 15, 2, 0, Math.PI * 2);
    ctx.fill();
  })
);

console.log("Icons: bola azul + simbolo branco");
