const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "assets");
const dest = path.join(__dirname, "..", "dist", "electron", "assets");
const distRoot = path.join(__dirname, "..", "dist", "electron");

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(src, dest);

if (!fs.existsSync(distRoot)) fs.mkdirSync(distRoot, { recursive: true });
const preloadSrc = path.join(__dirname, "preload.cjs");
const preloadDest = path.join(distRoot, "preload.cjs");
if (fs.existsSync(preloadSrc)) {
  fs.copyFileSync(preloadSrc, preloadDest);
}
