import { createCanvas } from "canvas";
import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const BLUE = "#000078";
const WHITE = "#ffffff";
const FA_PHONE_PATH =
  "M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z";
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

async function saveFontAwesomePhoneIcon() {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">' +
    '<path fill="' +
    BLUE +
    '" d="' +
    FA_PHONE_PATH +
    '"/></svg>';

  await sharp(Buffer.from(svg)).resize(24, 24).png().toFile(join(assetsDir, "icon-phone.png"));
}

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

async function main() {
  await saveFontAwesomePhoneIcon();
  console.log("Icons gerados (telefone: Font Awesome phone, azul sem fundo)");
}

main().catch(function (error) {
  console.error(error);
  process.exit(1);
});
