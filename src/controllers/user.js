import path from 'path';

import logger from '../logger/index.js' 

import { newUserMailOptions , transporter } from '../utils/nodemailerSettings.js';
import { createHash , isValidPassword } from '../utils/bCryptSettings.js';

import Singleton from '../utils/Singleton.js';

const { daos } = Singleton.getInstance()
const {usersDao} = daos;

const loginUser = async ( req , res ) => {
  if (ctx.request.isAuthenticated()) {
      ctx.response.redirect('/')
  }else{

      const idMongo = ctx.request.session && ctx.request.session.idMongo;
      console.log('idMOngo loginUSer', idMongo);
      if(idMongo !== undefined){
        const usuario = await usersDao.getById(idMongo);
        if (usuario) {
            ctx.response.redirect('/')
  
        } 
      } else {
        ctx.response.render(path.join(process.cwd(), '/views/pages/login.ejs'))
    }


  }
}

const postLoginUser = async ( req , res ) => {
  const { username , password } = ctx.request.body;
  const user = await usersDao.findUser(username);

  ctx.request.session.idMongo = user.id;

  ctx.response.redirect('/');
}

const failLoginUser = (req , res) => {
  ctx.response.render(path.join(process.cwd(), '/views/pages/faillogin.ejs'))
}

const logoutUser = async ( req , res ) => {
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);

  if (usuario) {
      ctx.request.session.destroy(error => {
          if (!error) {
              ctx.response.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre: usuario.username})
          } else {
              ctx.response.redirect('/')
          }
      })
  } else {
      ctx.response.redirect('/')
  }
}

const signupUser = ( req , res ) => {
  ctx.response.render(path.join(process.cwd(), '/views/pages/signup.ejs'))
}
const postSingupUser = async ( req , res ) => {
  const user = ctx.request.user;
  if ( user) ctx.response.redirect('/')
  else {
      let problema = 'user error signup';
      ctx.response.render(path.join(process.cwd(), '/views/pages/error.ejs'),{problema: problema, link: '/signup'})
  }
}
const failSingupUser = (req , res) => {
  ctx.response.render(path.join(process.cwd(), '/views/pages/failsignup.ejs'))
}

const infoUser = async ( req , res ) => {
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);

  if (!usuario) {
    ctx.response.redirect('/api/users/login')
  }else{
    ctx.response.render(path.join(process.cwd(), '/views/pages/info.ejs'),{usuario})
  }

}

//PASSPORT FUNCTIONS

const loginPassportUser =   async (username , password , done ) => {
  const user = await usersDao.findUser(username);
  
  console.log('loginPassportUser',user);
  if (!user) {
      logger.info('User Not Found with username ',username);
      return done ( null , false )
  } 
  
  if ( !isValidPassword( user , password ) ) {
      logger.info( 'Invalid Password' );
      return done ( null , false )
  }
  
  return done ( null , user )
  
}

const signupPassportUser =   async (req , username , email , done ) => {
  const user = await usersDao.findUser(username);
  let photo = '';
  if (user) {
      logger.info('User already exists');
      return done( null , false )
  } 
  logger.info('prueba passport',ctx.request.body);
  if( ctx.request.body.photo === '') {
    photo = 'https://static.diariosur.es/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--320x378.jpg'
  }else{
    photo = ctx.request.body.photo
  }
  const newUser = {
      username: ctx.request.body.username,
      password: createHash(ctx.request.body.password),
      email: ctx.request.body.email,
      name: ctx.request.body.name,
      lastname: ctx.request.body.lastname,
      phone: ctx.request.body.phone,
      photo: photo
  }

  const idUser = await usersDao.createUser(newUser)
  logger.info('User register succesful iD ',idUser);
  ctx.request.session.idMongo = idUser;
  transporter.sendMail(newUserMailOptions(ctx.request.body.username , photo), ( err , info ) => {
    if(err) {
      logger.error(err);
      return err
    }
    logger.info(info);
  })
  return done( null , idUser)
}

const getHome = async (ctx)=>{   
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const carritoID = ctx.request.session && ctx.request.session.carritoID;
  if (idMongo===undefined){
    ctx.response.render(path.join(process.cwd(), '/views/pages/home.ejs'), {usuario: null , carritoID: carritoID})
  }else{  
    const usuario = await usersDao.getById(idMongo);
  
    ctx.response.render(path.join(process.cwd(), '/views/pages/home.ejs'), {usuario: usuario, carritoID: carritoID})
  }
}

export default {
  loginUser,
  postLoginUser,
  failLoginUser,
  logoutUser,
  signupUser,
  postSingupUser,
  failSingupUser,
  infoUser,
  loginPassportUser,
  signupPassportUser,
  getHome
}