'use-strict'
const { exec } = require('child_process')
const Job = require('./job')

module.exports = class WebJob extends Job {
  async executeTasks (tasks) {
    const result = await Promise.all(tasks.map(async (task) => {
      const executed = await WebJob.executeTask(task)
      return executed
    }))
    return result
  }

  static executeTask (task) {
    return new Promise((resolve, reject) => {
      exec(task.command, (error, stdout, stderr) => {
        if (error) return reject(error)
        if (stderr) return reject(stderr)
        // console.log(task.command)
        resolve({ name: task.name, command: task.command })
      })
    })
  }
}
