// You can import your modules
// import index from '../src/index'

import nock from 'nock'
import delay from 'delay'
// Requiring our app implementation
import myProbotApp from '../src'
import { Probot } from 'probot'
// Requiring our fixtures
import payload from './fixtures/create.branch.json'
import JIRA_RESPONSE from './fixtures/jira.response'
const fs = require('fs')
const path = require('path')

process.env.JIRA_URL = 'http://orga.atlassian.net'

describe('My Probot app', () => {
  let probot: any
  let mockCert: string

  beforeAll((done: Function) => {
    fs.readFile(path.join(__dirname, 'fixtures/mock-cert.pem'), (err: Error, cert: string) => {
      if (err) return done(err)
      mockCert = cert
      done()
    })
  })

  beforeEach(() => {
    nock.disableNetConnect()
    probot = new Probot({ id: 123, cert: mockCert })
    // Load our app into probot
    probot.load(myProbotApp)
  })

  it('creates a pull request when a jira branch is created', async (done) => {
    // Test that we correctly return a test token
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' })

    // Test that a comment is posted
    nock('http://orga.atlassian.net')
      .post('/rest/api/3/search', (body: any) => {
        expect(body).toMatchObject({
          validateQuery: false,
          jql: 'issueKey in (BO-1234)',
          fieldsByKeys: true,
          fields: ['issuetype', 'parent', 'summary']
        })
        return true
      })
      .reply(200, JIRA_RESPONSE)

    nock('https://api.github.com')
      .post('/repos/Codertocat/Hello-World/pulls', (body: any) => {
        done(expect(body).toMatchSnapshot())
        return true
      })
      .reply(200, {})

    // Receive a webhook event
    await probot.receive({ name: 'create', payload })
  })

  it('does not create a pull request when a non jira branch is created', async (done) => {
    // Test that we correctly return a test token
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' })

    // // Test that a comment is not posted
    nock('http://orga.atlassian.net')
      .post('/rest/api/3/search', (body: any) => {
        done('should not be invoked')
        return true
      })
      .reply(500)

    // Receive a webhook event
    await probot.receive({ name: 'create', payload: { ...payload, ref: 'non-jira' } })
    await delay(200)
    done()
    // expect(nock.)
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
