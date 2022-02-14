const express = require('express');
// const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const nodemailer = require("nodemailer");
// const smtpTransport = require('nodemailer-smtp-transport');
// const logger = require('./../logger')

const usersRouter = express.Router();

// const { userDao } = require('../daos');

const userController = require('../controllers/user');
// const { createHash , isValidPassword } = require('../utils/bCryptSettings') 

/* FUNCIONES */
// function createHash(password) {
//   return bCrypt.hashSync(
//       password,
//       bCrypt.genSaltSync(10),
//       null
//   );
// }
// function isValidPassword( user , password ) {
//   return bCrypt.compareSync( password , user.password )
// }

// const mailOptions = (username,photo) => ({
//   from: 'jorgecoronabackend@gmail.com', // sender address
//   to: ['jorgecoronabackend@gmail.com'], // list of receivers
//   subject: "[ALERT] New User created", // Subject line
//   // text: "Hello world?", // plain text body,
//   attachments: 
//   [
//     {path: photo}
//   ],
//   html: `<h1 style="color: blue;">Se ha creado un nuevo usuario.</h1><p>UserName: ${username}</p>` // html body
// })

/* NODEMAILER */

// const transporter = nodemailer.createTransport( {
//   service: 'gmail',
//   port: 587,
//   auth: {
//     user: 'jorgecoronabackend@gmail.com',
//     pass: 'jorgecorona55'
//   }
// } )   

/* PASSPORT */

passport.use('login',  new LocalStrategy( userController.loginPassportUser ))

passport.use('signup', new LocalStrategy( 
  {
      passReqToCallback: true
  },
  userController.signupPassportUser
) )

passport.serializeUser( ( user , done) => {
  done( null , user.id);
} )
passport.deserializeUser( async ( id , done ) => {

      const user = await userDao.getById(id)

      return done( null , user.id)

} )
//Login
usersRouter.get( '/login' , userController.loginUser )

usersRouter.post( '/login' , 
  passport.authenticate('login', {failureRedirect : '/api/users/faillogin' }) , 
  userController.postLoginUser
  )

usersRouter.get( '/faillogin' , userController.failLoginUser )

//logout

usersRouter.get('/logout', userController.logoutUser )

//signup

usersRouter.get( '/signup' , userController.signupUser )

usersRouter.post( '/signup' ,
 passport.authenticate( 'signup' , {failureRedirect: '/failsignup'} ) ,
 userController.postSingupUser
 )

 usersRouter.get( '/failsignup' , userController.failSingupUser )

//info

usersRouter.get( '/info' , userController.infoUser )

module.exports = usersRouter;
