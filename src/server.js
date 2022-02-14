const express = require('express');
const session = require('express-session')
const path = require('path');
const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const indexRouter = require('./router/index');

const userController = require('./controllers/user');

// const { Router } = express;

// const { getPersistenceMethod } = require('./daos');


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

module.exports = app
