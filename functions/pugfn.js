'use strict'

const path = require('path')
const load = (file) => require(path.join(__dirname, file))

const manifest = load('../manifest.json')

module.exports = {
  asset: (file) => {
    if(process.env.NODE_ENV === 'development') return file

    const filename = path.basename(file)
    const dirname  = path.dirname(file)

    if(!(filename in manifest)){
      console.error(`${file} not found in manifest`)
      return file
    }

    return path.join(dirname, manifest[filename])
  },
}
