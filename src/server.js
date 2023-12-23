import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname, mongoStoreOptions } from './utils.js';
import userRouter from "./routes/user.router.js";
import viewsRouter from './routes/views.router.js'
import "./db/connection.js";
import { connectionString } from "./db/connection.js";
import handlebars from 'express-handlebars';
import "./passport/strategies.js";
import passport from "passport";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use('/views', viewsRouter)

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

export default app;
