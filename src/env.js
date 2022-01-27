const dotenv = require('dotenv')

module.exports = dotenv.config({ 
  path: './development.env',
  silent: true
})
