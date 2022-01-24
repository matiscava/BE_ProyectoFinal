const dotenv = require('dotenv')

exports.module = dotenv.config({ 
  path: './.env',
  silent: true
})
