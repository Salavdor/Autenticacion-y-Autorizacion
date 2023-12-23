import { createHash, isValidPass } from "../utils.js";
import UserDaoMongoDB from "../daos/mongodb/user.dao.js";

const userDao = new UserDaoMongoDB();

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await userDao.getByEmail(email);
    if (!existUser) {
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        return await userDao.createUser({
          ...user,
          password: createHash(password), 
          role: 'admin'
        });
      }
      return await userDao.createUser({
        ...user,
        password: createHash(password),
      });
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password) => {
  try {
    const userExist = await userDao.getByEmail(email);
    if (userExist) {
      const isValid = isValidPass(password, userExist);
      // console.log('isValid__', isValid);
      if (!isValid) return false;
      else return userExist;
      // !isValid ? false : userExist
    } return false;
  } catch (error) {
    console.log(error);
  }
};

export const getByEmail = async (email) => {
  try {
    const userExist = await userDao.getByEmail(email);
    if (userExist) return userExist;
    return false;
  } catch (error) {
    console.log(error);
  }
};



export const getById = async (id) => {
  try {
    const userExist = await userDao.getById(id);
    if (userExist) return userExist;
    return false;
  } catch (error) {
    console.log(error);
  }
};
