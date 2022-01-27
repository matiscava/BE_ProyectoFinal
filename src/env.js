const dotenv = require('dotenv')

module.exports = dotenv.config({ 
  path: './data.env',
  silent: true
})
