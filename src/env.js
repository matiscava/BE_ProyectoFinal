const dotenv = require('dotenv')

exports.module = dotenv.config({ 
  path: './produccion.env',
  silent: true
})
