const chai = require('chai')
const expect = chai.expect
const Job = require('../../../src/classes/bashJob')
const inputData = require('../../fixtures/output.json')

describe('BashJob class', () => {
  describe('executeTasks method', () => {

    it('should execute task', async () => {
      const job = new Job()
      const result = job.exportTasks(inputData)
     
      expect(result).to.be.a('string')
      expect(result).to.contain('#!/usr/bin/env bash')
      expect(result).to.contain('echo \'Hello World!\' > /tmp/file1')
      expect(result).to.contain('touch /tmp/file3')
      expect(result).to.contain('cat /tmp/file1')
      expect(result).to.contain('touch /tmp/file1')
    })
  })
})
