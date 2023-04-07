const EventEmitter = require("events")
const fs = require("fs-extra")

const storageFilePath = "data/storage.json"
const emitter = new EventEmitter()

let brainLock = false

module.exports = {
  async read(key) {
    if (brainLock) {
      await new Promise((resolve) => emitter.once("unlocked", resolve))
    }
    brainLock = true

    ensureFileExists(storageFilePath)

    const data = fs.readJSONSync(storageFilePath)

    const value = data[key]

    brainLock = false
    emitter.emit("unlocked")
    return value
  },
  async write(key, val) {
    if (brainLock) {
      await new Promise((resolve) => emitter.once("unlocked", resolve))
    }
    brainLock = true

    ensureFileExists(storageFilePath)

    const data = fs.readJSONSync(storageFilePath)
    data[key] = val

    fs.writeJSONSync(storageFilePath, data, { spaces: 2 })

    brainLock = false
    emitter.emit("unlocked")
  },
}

function ensureFileExists(filePath) {
  fs.ensureFileSync(filePath)

  const data = fs.readFileSync(filePath)
  if (data.length === 0) {
    fs.writeJSONSync(filePath, {}, { spaces: 2 })
  }
}
