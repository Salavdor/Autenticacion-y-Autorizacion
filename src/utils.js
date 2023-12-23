import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));


/* ------------------------------------ Sesions ----------------------------------- */

import { connectionString } from './db/connection.js';
import MongoStore from 'connect-mongo';

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

/* ------------------------------------ bcypt ----------------------------------- */

import { hashSync, genSaltSync, compareSync } from "bcrypt";

//registro
export const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

//login

/**
 * 
 * @param {*} password contraseña proporcionada por el usuario, sin hashear
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */

export const isValidPass = (password, user) => {
  return compareSync(password, user.password);
};
