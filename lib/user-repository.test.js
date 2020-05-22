const test = require('ava')
const db = require('./db')
const userRepository = require('./user-repository')

test.beforeEach(async () => {
  await db.get('users').remove({})
})

test('find users that did not yet receive the newsletter', async t => {
  await db.get('users').insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })

  const users = await userRepository.findNotYetReceivedNewsletter()
  t.true(Array.isArray(users))
  t.is(users.length, 1)
})
