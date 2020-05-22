const { UsersCollection } = require('./db')

module.exports = {
  findNotYetReceivedNewsletter: () => {
    return UsersCollection.find({
      lastEmailSentAt: null
    })
  }
}
