const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const directory = path.join(__dirname, "src/data/insights");

console.log("--------------------------------------------------");
console.log(`Watching for changes in: ${directory}`);
console.log("Any markdown additions or updates will automatically recompile...");
console.log("--------------------------------------------------");

// Ensure directory exists
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

let timeout;
fs.watch(directory, (eventType, filename) => {
  if (filename && filename.endsWith(".md")) {
    // Debounce compiler to prevent multiple executions on quick sequential saves
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(`[Watcher] File change detected: ${filename}. Recompiling...`);
      exec("node compile-insights.js", (error, stdout, stderr) => {
        if (error) {
          console.error(`[Watcher Error] ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`[Watcher Stderr] ${stderr}`);
          return;
        }
        console.log(`[Watcher Success] ${stdout.trim()}`);
      });
    }, 150);
  }
});
