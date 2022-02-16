
import FileContainer from "../../containers/FileContainer.js";

class UserDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/users.json')
 }
};

export default UserDaoFile;