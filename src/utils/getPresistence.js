const getPersistence = () => {
  console.log(process.argv[2])
  return process.argv[2]
}

module.exports = getPersistence;