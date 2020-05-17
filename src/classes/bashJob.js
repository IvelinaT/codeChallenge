'use-strict'
const fs = require('fs')
const path = require('path')
const Job = require('./job')

module.exports = class BashJob extends Job {
  exportTasksInFile (tasks, filename) {
    const result = tasks.map((orderedTask) => orderedTask.command)
    result.unshift('#!/usr/bin/env bash\n')
    filename = path.resolve(path.dirname(require.main.filename), filename)
    
    var file = fs.createWriteStream(filename, { mode: 0o755 })
    file.on('finish', function () {
      console.log('file has been written')
    })
    file.on('error', function (err) {
      throw new Error(`Error creating bash fiile: ${err}`)
    })
    result.forEach(function (v) {
      file.write(v + '\n')
    })
    file.end()

    return filename
  }
}
