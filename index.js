module.exports = {
  run
}

async function run (userRepository, emailService) {
  const users = await userRepository.findNotYetReceivedNewsletter()
  for (const user of users) {
    await emailService.sendTo(user)
  }
}
