import express from 'express';
import session from 'express-session'
import path from 'path';
import bCrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy

const app = express();

import indexRouter from './router/index.js';

import userController from './controllers/user.js';

import PersistenceFactory from './daos/index.js';
import getPersistence from './utils/getPresistence.js';

const prueba = new PersistenceFactory(getPersistence())
console.log('probando en server.js', prueba);

// const { Router } = express;

// const { getPersistenceMethod } from './daos');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine','ejs')
app.use(session({
    secret:'secretirijillo',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000
    }
}))
app.use( passport.initialize() )
app.use( passport.session() )


app.get('/', userController.getHome );

app.use( '/api' , indexRouter);


app.use((req, res) => {
    res.status(404).json(
        {error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}    
    )
})

export default app
