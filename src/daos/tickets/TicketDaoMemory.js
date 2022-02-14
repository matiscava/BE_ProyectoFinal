const MemoryContainer = require("../../containers/MemoryContainer");

class TicketDaoMemory extends MemoryContainer {
  constructor() {
    super([])
  }
}

module.exports = TicketDaoMemory;