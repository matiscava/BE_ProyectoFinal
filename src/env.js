const dotenv = require('dotenv')

module.exports = dotenv.config({ 
  path: './production.env',
  silent: true
})
