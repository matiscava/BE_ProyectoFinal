import FileContainer from "../../containers/FileContainer";

class TicketsDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/tickets.json')
 }
};

export default TicketsDaoFile;