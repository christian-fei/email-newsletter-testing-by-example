const test = require('ava')
const sinon = require('sinon')
const emailService = require('./email-service')
const email = require('./email')

test('sends newsletter to user', async t => {
  const user = { name: 'test', email: 'test@test.com', lastEmailSentAt: null }
  const emailStub = sinon.stub(email, 'send')
  await emailService.sendTo(user)
  t.is(emailStub.callCount, 1)
})
