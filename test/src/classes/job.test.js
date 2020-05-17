const chai = require('chai')
const expect = chai.expect
const Job = require('../../../src/classes/job')
const inputData = require('../../fixtures/input.json')
const outputData = require('../../fixtures/output.json')

describe('Job', function () {
  describe('orderTasks method', function () {
    it('should create a proper execution order', async function () {
      const job = new Job()
      job.tasks = inputData.tasks
      const result = await job.orderTasks()
      expect(result).to.be.a('array')
      expect(result).to.deep.equal(outputData)
    })
  })
})
