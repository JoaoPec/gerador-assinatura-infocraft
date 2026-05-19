import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const BLUE = "#000078";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = join(root, "assets");

mkdirSync(assetsDir, { recursive: true });

function save(name, canvas) {
  writeFileSync(join(assetsDir, name), canvas.toBuffer("image/png"));
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
    ctx.lineWidth = 1.8;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(9.5, 5);
    ctx.lineTo(14.5, 5);
    ctx.quadraticCurveTo(16, 5, 16, 6.5);
    ctx.lineTo(16, 17.5);
    ctx.quadraticCurveTo(16, 19, 14.5, 19);
    ctx.lineTo(9.5, 19);
    ctx.quadraticCurveTo(8, 19, 8, 17.5);
    ctx.lineTo(8, 6.5);
    ctx.quadraticCurveTo(8, 5, 9.5, 5);
    ctx.stroke();
    ctx.fillRect(11, 17, 2, 1.5);
  })
);

save(
  "website-globe.png",
  drawContactIcon((ctx, size) => {
    const cx = size / 2;
    const cy = size / 2;
    const r = 9;
    ctx.strokeStyle = BLUE;
    ctx.fillStyle = BLUE;
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
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("f", size / 2 + 1, size / 2 + 2);
  })
);

save(
  "social-linkedin.png",
  drawSocialIcon((ctx, size) => {
    ctx.fillStyle = BLUE;
    ctx.font = "bold 18px Arial";
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
    ctx.lineWidth = 2.2;
    ctx.lineJoin = "round";
    ctx.strokeRect(11, 11, 22, 22);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(30, 14, 2.2, 0, Math.PI * 2);
    ctx.fill();
  })
);

console.log("Icons generated in assets/ (cor " + BLUE + ")");
