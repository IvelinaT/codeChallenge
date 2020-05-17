const chai = require('chai')
const expect = chai.expect
const Job = require('../../../src/classes/webJob')
const outputData = require('../../fixtures/output.json')

describe('WebJob class', () => {
  describe('executeTasks method', () => {
    it('should execute task', async () => {
      const job = new Job()
      const taskStub = sinon.stub()
      taskStub.onCall(0).callsFake('executeTask').returns({ name: 'task-1', command: 'touch /tmp/file1' })
      taskStub.onCall(1).callsFake('executeTask').returns({ name: 'task-3', command: 'echo \'Hello World!\' > /tmp/file1' })
      taskStub.onCall(2).callsFake('executeTask').returns({ name: 'task-2', command: 'cat /tmp/file1' })
      taskStub.onCall(3).callsFake('executeTask').returns({ name: 'task-4', command: 'touch /tmp/file1' })
      const result = await job.executeTasks(outputData)
      expect(result).to.be.a('array')
      expect(result).to.deep.equal(outputData)
    })
  })
})
