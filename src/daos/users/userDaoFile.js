
const FileContainer = require("../../containers/FileContainer");

class UserDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/users.json')
 }
};

module.exports = UserDaoFile;