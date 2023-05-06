export class UserRepositories {
    constructor(userDao) {
      this.userDao = userDao;
    }
    createUser = async ({ user }) => {
      const nwUser = user;
      await this.userDao.creatuUser({ nwUser });
    };
    getUsers = async () => await this.userDao.getUsers();
    getUser = async (eMail) => await this.userDao.getUser(eMail);
    userExists = async (eMail) => await this.userDao.userExists(eMail);
    UpdateUser = async () => {
      return true;
    };
    deleteUser = async (eMail) => await this.userDao.deleteUser(eMail);
  }