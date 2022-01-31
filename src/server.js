const express = require('express');
const session = require('express-session')
const path = require('path');
const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const productosRouter = require('./router/routeProductos');
const carritoRoute = require('./router/routeCarrito');
const { userDao } = require('./daos');

const { Router } = express;

// const PORT = 8080;

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

/* FUNCIONES */
function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    );
}
function isValidPassword( user , password ) {
    return bCrypt.compareSync( password , user.password )
}
// function checkAuthentication(req,res,next){
//     if(req.isAuthenticated()){
//         //req.isAuthenticated() will return true if user is logged in
//         res.redirect("/");
//         next();
//     } else{
//         res.redirect("/login");
//     }
// }

/* PASSPORT */

passport.use('login',  new LocalStrategy(
    async (username , password , done ) => {
        const user = await userDao.findUser(username);
        if (!user) {
            console.log('User Not Found with username ',username);
            return done ( null , false )
        } 
        
        if ( !isValidPassword( user , password ) ) {
            console.log( 'Invalid Password' );
            return done ( null , false )
        }
        
        return done ( null , user )
        
    }
))

passport.use('signup', new LocalStrategy( 
    {
        passReqToCallback: true
    },
    async (req , username , email , done ) => {
        const user = await userDao.findUser(username);
        if (user) {
            console.log('User already exists');
            return done( null , false )
        } 
        const newUser = {
            username: req.body.username,
            password: createHash(req.body.password),
            email: req.body.email
        }

        const idUser = await userDao.createUser(newUser)
        console.log('User register succesful iD ',idUser);
        req.session.idMongo = idUser;

        return done( null , idUser)
    }
) )

passport.serializeUser( ( user , done) => {
    done( null , user._id);
} )
passport.deserializeUser( async ( id , done ) => {

        const user = await userDao.getById(id)

        return done( null , user._id)

} )


app.get('/', (req,res)=>{   
    res.redirect('/api/productos')
});

app.use('/api/productos', productosRouter);

app.use( '/api/carrito', carritoRoute);

//Login
app.get( '/login' , async ( req , res ) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }else{

        const idMongo = req.session && req.session.idMongo;
        const usuario = await userDao.getById(idMongo);


        if (usuario) {
            res.redirect('/')

        } else {
            res.render(path.join(process.cwd(), '/views/pages/login.ejs'))
        }
    }
})

app.post( '/login' , passport.authenticate('login', {failureRedirect : '/faillogin' }) , async ( req , res ) => {
    const { username , password } = req.body;
    const user = await userDao.findUser(username);

    req.session.idMongo = user._id;

    res.redirect('/');

})

app.get( '/faillogin' , (req , res) => {
    res.render(path.join(process.cwd(), '/views/pages/faillogin.ejs'))
} )
//logout
app.get('/logout', async ( req , res ) => {
    const idMongo = req.session && req.session.idMongo;
    const usuario = await userDao.getById(idMongo);

    if (usuario) {
        req.session.destroy(error => {
            if (!error) {
                res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre: usuario})
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})


//signup

app.get( '/signup' , async ( req , res ) => {
    res.render(path.join(process.cwd(), '/views/pages/signup.ejs'))
 
})
app.post( '/signup' , passport.authenticate( 'signup' , {failureRedirect: '/failsignup'} ) , async ( req , res ) => {
    const user = req.user;
    if ( user) res.redirect('/')
    else {
        let problema = 'user error signup';
        res.render(path.join(process.cwd(), '/views/pages/error.ejs'),{problema: problema, link: '/signup'})
    }
})
app.get( '/failsignup' , (req , res) => {
    res.render(path.join(process.cwd(), '/views/pages/failsignup.ejs'))
} )


app.use((req, res) => {
    res.status(404).json(
        {error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}    
    )
})

// PORT =  process.env.PORT || 8080;
// app.listen(PORT, ()=>{
//     console.log(`Servidor funcionando en el puerto: ${PORT}`);
// });
module.exports = app
