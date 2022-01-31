const express = require('express');
const session = require('express-session')
const path = require('path');
const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const productosRoute = require('./router/routeProductos');
const carritoRoute = require('./router/routeCarrito');
const usuariosRoute = require('./router/routeUser');

const { Router } = express;

const { cartDao: cartsDao , productDao: productsDao , userDao: usersDao } = require('./daos');


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


app.get('/', async (req,res)=>{   
    const idMongo = req.session && req.session.idMongo;
    const carritoID = req.session && req.session.carritoID;


    const usuario = await usersDao.getById(idMongo);
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), {usuario: usuario, carritoID: carritoID})
});

app.use('/api/productos', productosRoute);

app.use( '/api/carrito', carritoRoute);

app.use( '/api/users' , usuariosRoute)

app.use((req, res) => {
    res.status(404).json(
        {error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}    
    )
})

module.exports = app
