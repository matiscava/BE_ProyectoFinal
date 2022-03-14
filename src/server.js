import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import render from 'koa-ejs';
import Router from 'koa-router';

// import express from 'express';
import session from 'express-session';
import path from 'path';
import bCrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LocalStrategy = passportLocal.Strategy

// const app = express();
const app = new Koa();
const router = new Router({
    prefix: '/'
})

import indexRouter from './router/index.js';

import userController from './controllers/user.js';

app.use(koaBody())

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
})
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(serve(path.resolve(__dirname,"/public")));
// app.set('views', './views');
// app.set('view engine','ejs')
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
app.use( router.routes() )


router.get( '/', userController.getHome );

// app.use( '/api' , indexRouter);
router.use( '/api', indexRouter.routes() );


app.use((ctx) => {
    ctx.response.status(404).json(
        {error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}    
    )
})

export default app
