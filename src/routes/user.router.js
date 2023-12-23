import { Router } from "express";
import * as UserController from "../controllers/user.controllers.js";
import passport from 'passport';


const router = Router();


router.get("/", UserController.loginForm);
router.get("/register", UserController.registerForm);
router.get("/profile", UserController.profile);
router.get("/register-error", UserController.registerError);


router.post("/register", passport.authenticate('register'), UserController.register);
router.post("/login", passport.authenticate('login'), UserController.login);
router.post("/logout", UserController.logout);

export default router;
