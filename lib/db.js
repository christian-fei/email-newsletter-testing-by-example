const monk = require('monk')
const db = monk(process.env.MONGO_URL)

module.exports = {
  UsersCollection: db.get('users')
}
