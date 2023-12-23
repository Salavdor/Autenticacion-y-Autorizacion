import { UserModel } from "./models/user.model.js";

export default class userDaoMongoDB {
  async getByEmail(email) {
    try {
      const response = await UserModel.findOne({ email });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(user) {
    try {
      const response = await UserModel.create(user);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email, password });
      return userExist;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id){
    try {
      const userExist = await UserModel.findById(id)
      // console.log(userExist);
      if(userExist){
       return userExist
      } return false
    } catch (error) {
      console.log(error)
      // throw new Error(error)
    }
  }
}


