const { spawnSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

const root = path.join(__dirname, "..")
const input = path.join(root, "public", "dafae.mp4")
const output = path.join(root, "public", "dafae-720p.mp4")

if (!fs.existsSync(input)) {
  console.error(`Missing input video: ${input}`)
  process.exit(1)
}

const ffmpegCheck = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" })
if (ffmpegCheck.error) {
  console.error("ffmpeg was not found in PATH. Install ffmpeg first, then run this script again.")
  process.exit(1)
}

const args = [
  "-y",
  "-i",
  input,
  "-vf",
  "scale='min(1280,iw)':-2,fps=24",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "26",
  "-movflags",
  "+faststart",
  "-an",
  output,
]

const result = spawnSync("ffmpeg", args, { stdio: "inherit" })
process.exit(result.status ?? 1)
