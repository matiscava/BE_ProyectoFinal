import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { asPOJO , renameField } from '../utils/objectsUtils.js';


const LocalStrategy = passportLocal.Strategy

const usersRouter = express.Router();

import userController from '../controllers/user.js';

import Singleton from '../utils/Singleton.js';

const { daos } = Singleton.getInstance()
const {usersDao} = daos

/* PASSPORT */

passport.use('login',  new LocalStrategy( userController.loginPassportUser ))

passport.use('signup', new LocalStrategy( 
  {
      passReqToCallback: true
  },
  userController.signupPassportUser
) )

passport.serializeUser( ( user , done) => {
  if(typeof user.id === 'object'){
    const result = asPOJO(user)  
    done( null , result);
  }else{
    done( null , user.id);
  }
} )
passport.deserializeUser( async ( id , done ) => {
  try{
    const user = await usersDao.getById(id)
    return done( null , user.id)
  }catch(err){console.error('Error:', err);}

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

export default usersRouter;
