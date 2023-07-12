export class UserRepositories {
  constructor(userDao) {
    this.userDao = userDao;
  }
  createUser = async ({ user }) => {
    const nwUser = userDTO.nwUser(user);
    await this.userDao.createUser({ nwUser });
  };
  getUsers = async () => await this.userDao.getUsers;
  getUser = async (eMail) => await this.userDao.getUser(eMail);
  userExists = async (eMail) => await this.userDao.userExists(eMail);
  getUserById = async (uId) => await this.userDao.getUserById(uId);
  updateUser = async () => {
    return true;
  };
  deleteUser = async (eMail) => await this.userDao.deleteUser(eMail);
}