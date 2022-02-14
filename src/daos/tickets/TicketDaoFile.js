
const FileContainer = require("../../containers/FileContainer");

class TicketsDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/tickets.json')
 }
};

module.exports = TicketsDaoFile;