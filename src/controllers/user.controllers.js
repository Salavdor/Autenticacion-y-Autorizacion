import * as UserServices from "../services/user.services.js";
import UserDaoMongoDB from "../daos/mongodb/user.dao.js";

const userDao = new UserDaoMongoDB();


export const loginForm = async (req, res, next) => {
  try {
    res.render('login')
  } catch (error) {
    next(error);
  }
};

export const registerForm = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    const userData = {
      firstname: req.session.first_name,
      role: req.session.role
    }
    console.log(userData);
    res.render('profile', {userData: userData})
  } catch (error) {
    next(error);
  }
};

export const registerError = async (req, res, next) => {
  try {
    res.render('register-error')
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const id = req.session.passport.user;
    const user = await userDao.getById(id);
    console.log("controller register", user);
    if (user) res.redirect("/api/users");
    else res.redirect("/api/users/register-error");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const id = req.session.passport.user;
    const user = await userDao.getById(id);
    console.log(user);
    if (user) {
      req.session.email = email;
      req.session.password = password;
      req.session.first_name = user.first_name;
      req.session.role = user.role;
      res.redirect("/api/users/profile");
    } else res.redirect("/api/users/error-login");
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/api/users/");
  } catch (error) {
    console.log(error);
  }
};
