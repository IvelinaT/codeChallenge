'use-strict'
const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')
const middleware = require('./src/middlewares/middleware')

const app = express()
const port = process.env.PORT || 4000

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

const dataSchema = {
  tasks: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      command: Joi.string().required(),
      requires: Joi.array().items(Joi.string().required())
    })
  )
}

app.post('/', middleware(dataSchema, 'body'), async (req, res) => {
  const jobData = JSON.stringify(req.body)
  const data = JSON.parse(jobData)
  const Job = require('./src/classes/bashJob')
  const newJob = new Job()
  newJob.tasks = data.tasks
  const orderedTasks = newJob.orderTasks()
  try {
    // export tasks in bash file
    const file = await newJob.exportTasks(orderedTasks, 'results.sh')
    res.send(file)
  } catch (err) {
    res.send({ error: err.message })
  }
})

app.post('/tasks', middleware(dataSchema, 'body'), async (req, res) => {
  const jobData = JSON.stringify(req.body)
  const data = JSON.parse(jobData)
  const Job = require('./src/classes/webJob')
  const newJob = new Job()
  newJob.tasks = data.tasks
  const orderedTasks = newJob.orderTasks()
  try {
    // execute tasks
    await newJob.executeTasks(orderedTasks)
    res.json(orderedTasks)
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
