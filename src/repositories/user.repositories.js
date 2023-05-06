export class UserRepositories {
  constructor(userDao) {
    this.userDao = userDao;
  }
  addUser = async (user) => {};
  getUsers = async () => await this.userDao.find({});

  getUser = async (eMail) => await this.userDao.find({ eMail });
}
