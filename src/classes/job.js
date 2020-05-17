'use-strict'
module.exports = class Job {
  constructor (tasks) {
    this.tasks = tasks
  }

  orderTasks () {
    let orderedTasks = []
    this.tasks.map((task) => {
      if (task.requires && task.requires.length) {
        orderedTasks = Job.AddRequirements(
          task.requires,
          this.tasks,
          orderedTasks
        )
      }
      const alreadyInserted = orderedTasks.find((el) => el.name === task.name)
      if (!alreadyInserted) {
        orderedTasks.push({
          name: task.name,
          command: task.command
        })
      }
    })
    return orderedTasks
  }

  static AddRequirements (taskRequirements, tasks, alreadyOrdered) {
    taskRequirements.map((required) => {
      const requirementTask = tasks.find((el) => el.name === required)
      if (requirementTask.requires && requirementTask.requires.length) {
        alreadyOrdered = Job.AddRequirements(
          requirementTask.requires,
          tasks,
          alreadyOrdered
        )
      }
      const alreadyInserted = alreadyOrdered.find((el) => el.name === required)
      if (!alreadyInserted) {
        alreadyOrdered.push({
          name: requirementTask.name,
          command: requirementTask.command
        })
      }
    })
    return alreadyOrdered
  }
}
