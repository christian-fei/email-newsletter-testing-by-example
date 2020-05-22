const email = require('./email')

module.exports = {
  sendTo
}

async function sendTo (user) {
  console.log('sending email to user')
  email.send('some email text')
}
