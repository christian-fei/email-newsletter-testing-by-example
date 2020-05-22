const db = require('./db')

module.exports = {
  findNotYetReceivedNewsletter: () => {
    return db.get('users').find({
      lastEmailSentAt: null
    })
  }
}
