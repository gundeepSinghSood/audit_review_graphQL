const userResolvver = require('./user')
const projectResolvver = require('./projects')

const rootResoler = {
  ...userResolvver,
  ...projectResolvver
}

module.exports = rootResoler;