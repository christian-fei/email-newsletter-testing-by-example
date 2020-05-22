const test = require('ava')
const sinon = require('sinon')
const db = require('./lib/db')

const userRepository = require('./lib/user-repository')
const emailService = require('./lib/email-service')
const newsletter = require('.')

test.beforeEach(async () => {
  await db.get('users').remove({})
})

test('sends a newsletter to users that did not yet receive it', async t => {
  await db.get('users').insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })

  sinon.spy(userRepository, 'findNotYetReceivedNewsletter')
  sinon.stub(emailService, 'sendTo')

  await newsletter.run(userRepository, emailService)

  t.is(userRepository.findNotYetReceivedNewsletter.callCount, 1)
  t.is(emailService.sendTo.callCount, 1)
  // implement your assertions about arguments, like "recipient", "subject", "content" of the email etc.
})
