const path = require('path');

const { newUserMailOptions , transporter } = require('../utils/nodemailerSettings');
const { createHash , isValidPassword } = require('../utils/bCryptSettings') 

const PersistenceFactory = require('../daos');
const getPersistence = require('../utils/getPresistence');

let recoveredFactory = null;
// (async () => {
//   recoveredFactory = await PersistenceFactory.getPersistenceMethod(getPersistence())
//   }) ()

 recoveredFactory = PersistenceFactory.getPersistenceMethod(getPersistence())

const factory = recoveredFactory;
const { userDao } = factory

const loginUser = async ( req , res ) => {
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
}

const postLoginUser = async ( req , res ) => {
  const { username , password } = req.body;
  const user = await userDao.findUser(username);

  req.session.idMongo = user.id;

  res.redirect('/');
}

const failLoginUser = (req , res) => {
  res.render(path.join(process.cwd(), '/views/pages/faillogin.ejs'))
}

const logoutUser = async ( req , res ) => {
  const idMongo = req.session && req.session.idMongo;
  const usuario = await userDao.getById(idMongo);

  if (usuario) {
      req.session.destroy(error => {
          if (!error) {
              res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre: usuario.username})
          } else {
              res.redirect('/')
          }
      })
  } else {
      res.redirect('/')
  }
}

const signupUser = ( req , res ) => {
  res.render(path.join(process.cwd(), '/views/pages/signup.ejs'))
}
const postSingupUser = async ( req , res ) => {
  const user = req.user;
  if ( user) res.redirect('/')
  else {
      let problema = 'user error signup';
      res.render(path.join(process.cwd(), '/views/pages/error.ejs'),{problema: problema, link: '/signup'})
  }
}
const failSingupUser = (req , res) => {
  res.render(path.join(process.cwd(), '/views/pages/failsignup.ejs'))
}

const infoUser = async ( req , res ) => {
  const idMongo = req.session && req.session.idMongo;
  const usuario = await userDao.getById(idMongo);

  if (!usuario) {
    res.redirect('/api/users/login')
  }else{
    res.render(path.join(process.cwd(), '/views/pages/info.ejs'),{usuario})
  }

}

//PASSPORT FUNCTIONS

const loginPassportUser =   async (username , password , done ) => {
  const user = await userDao.findUser(username);
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
  const user = await userDao.findUser(username);
  let photo = '';
  if (user) {
      logger.info('User already exists');
      return done( null , false )
  } 
  logger.info('prueba passport',req.body);
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
  logger.info('User register succesful iD ',idUser);
  req.session.idMongo = idUser;
  transporter.sendMail(newUserMailOptions(req.body.username , photo), ( err , info ) => {
    if(err) {
      logger.error(err);
      return err
    }
    logger.info(info);
  })
  return done( null , idUser)
}

const getHome = async (req,res)=>{   
  const idMongo = req.session && req.session.idMongo;
  const carritoID = req.session && req.session.carritoID;


  const usuario = await userDao.getById(idMongo);
  res.render(path.join(process.cwd(), '/views/pages/home.ejs'), {usuario: usuario, carritoID: carritoID})
}

module.exports = {
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