const MemoryContainer = require("../../containers/MemoryContainer");

class UserDaoMemory extends MemoryContainer {
  constructor() {
    super([])
  }
}

module.exports = UserDaoMemory;