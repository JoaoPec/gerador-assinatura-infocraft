import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const BLUE = "#000078";
const SOCIAL_BG = "#eef2ff";
const SOCIAL_BORDER = "#c5cee8";
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

function drawContactIcon(draw) {
  const size = 24;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  draw(ctx, size);
  return canvas;
}

function drawSocialIcon(draw) {
  const size = 44;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);

  roundRect(ctx, 0, 0, size, size, 9);
  ctx.fillStyle = SOCIAL_BG;
  ctx.fill();

  roundRect(ctx, 0.5, 0.5, size - 1, size - 1, 9);
  ctx.strokeStyle = SOCIAL_BORDER;
  ctx.lineWidth = 1;
  ctx.stroke();

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
  drawContactIcon((ctx) => {
    ctx.strokeStyle = BLUE;
    ctx.fillStyle = BLUE;
    ctx.lineWidth = 1.7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    roundRect(ctx, 7, 2.5, 10, 19, 2.8);
    ctx.stroke();

    roundRect(ctx, 8.5, 5, 7, 12.5, 1.2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(12, 4.2, 0.7, 0, Math.PI * 2);
    ctx.fill();

    roundRect(ctx, 10.5, 17.2, 3, 1.2, 0.6);
    ctx.fill();
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
    ctx.fillStyle = BLUE;
    ctx.font = "bold 26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("f", size / 2 + 1, size / 2 + 2);
  })
);

save(
  "social-linkedin.png",
  drawSocialIcon((ctx, size) => {
    ctx.fillStyle = BLUE;
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("in", size / 2, size / 2 + 1);
  })
);

save(
  "social-instagram.png",
  drawSocialIcon((ctx, size) => {
    ctx.strokeStyle = BLUE;
    ctx.fillStyle = BLUE;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.strokeRect(13, 13, 18, 18);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(28, 16, 2, 0, Math.PI * 2);
    ctx.fill();
  })
);

console.log("Icons generated in assets/ (cor " + BLUE + ")");
