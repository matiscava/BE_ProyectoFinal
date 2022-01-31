const express = require('express');
const usersRouter = express.Router();
const path = require('path');
const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { productDao: productsDao , userDao , cartDao: cartsDao} = require('../daos');


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
      let photo = '';
      if (user) {
          console.log('User already exists');
          return done( null , false )
      } 
      console.log('prueba passport',req.body);
      if( req.body.photo === '') {
        photo = 'https://static.diariosur.es/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--320x378.jpg'
      }else{
        photo = req.body.photo
      }
      const newUser = {
          username: req.body.username,
          password: createHash(req.body.password),
          email: req.body.email,
          name: req.body.name,
          lastname: req.body.lastname,
          phone: req.body.phone,
          photo: photo
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
//Login
usersRouter.get( '/login' , async ( req , res ) => {
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

usersRouter.post( '/login' , passport.authenticate('login', {failureRedirect : '/api/users/faillogin' }) , async ( req , res ) => {
  const { username , password } = req.body;
  const user = await userDao.findUser(username);

  req.session.idMongo = user._id;

  res.redirect('/');

})

usersRouter.get( '/faillogin' , (req , res) => {
  res.render(path.join(process.cwd(), '/views/pages/faillogin.ejs'))
} )
//logout
usersRouter.get('/logout', async ( req , res ) => {
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

usersRouter.get( '/signup' , async ( req , res ) => {
  res.render(path.join(process.cwd(), '/views/pages/signup.ejs'))

})
usersRouter.post( '/signup' , passport.authenticate( 'signup' , {failureRedirect: '/failsignup'} ) , async ( req , res ) => {
  const user = req.user;
  if ( user) res.redirect('/')
  else {
      let problema = 'user error signup';
      res.render(path.join(process.cwd(), '/views/pages/error.ejs'),{problema: problema, link: '/signup'})
  }
})
usersRouter.get( '/failsignup' , (req , res) => {
  res.render(path.join(process.cwd(), '/views/pages/failsignup.ejs'))
} )

module.exports = usersRouter;
