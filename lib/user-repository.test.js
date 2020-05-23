const test = require('ava')
const sinon = require('sinon')
const userRepository = require('./user-repository')
const { UsersCollection } = require('./db')

test.beforeEach(async () => {
  await UsersCollection.remove({})
})

test('find users that did not yet receive the newsletter', async t => {
  await UsersCollection.insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: new Date() })
  await UsersCollection.insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })

  sinon.spy(UsersCollection, 'find')

  const users = await userRepository.findNotYetReceivedNewsletter()
  t.true(Array.isArray(users))
  t.is(users.length, 1)

  t.true(UsersCollection.find.calledOnce)
  t.true(UsersCollection.find.calledWith({ lastEmailSentAt: null }))
})
