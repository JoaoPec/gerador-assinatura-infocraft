import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = join(root, "assets");

const files = {
  logo: "infocraft-logo-crop.png",
  computer: "computer-icon.png",
  certification: "mps-br-certification.png",
  connector: "qr-connector.png",
  website: "website-globe.png",
  email: "icon-email.png",
  phone: "icon-phone.png",
  facebook: "social-facebook.png",
  linkedin: "social-linkedin.png",
  instagram: "social-instagram.png"
};

const inline = {};

for (const [key, file] of Object.entries(files)) {
  const buffer = readFileSync(join(assetsDir, file));
  const mime = "image/png";
  inline[key] = "data:" + mime + ";base64," + buffer.toString("base64");
}

const output =
  "window.INLINE_SIGNATURE_ASSETS = " + JSON.stringify(inline, null, 2) + ";\n";

writeFileSync(join(root, "assets-inline.js"), output, "utf8");
console.log("Wrote assets-inline.js");
