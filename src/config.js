const config = {
  PERS: process.env.PERS,
  FILE_PATH: process.env.FILE_PATH,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_HOST,
  DB_HOST: process.env.DB_HOST,
  DB_SQLITE_PATH: process.env.DB_SQLITE_PATH
}

const options = {
    ...config,
    mongodb: {
      host: 'mongodb://localhost/ecommerce',
      cnxStr: `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_DATABASE}?retryWrotes=true&w=majority`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateOmdex: true,
        serverSelectionTimeoutMS: 5000
      }
    },
    file: {
      path: `./${config.FILE_PATH}`
    },
    firestore: {
      "type": "service_account",
      "project_id": "proyectofinalbe-b686f",
      "private_key_id": "7fa3d70aa9088dd440d3c972d3f318150a5e4fbe",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8BsLUQtVyN8gX\nFr7/isjoK2D9vJ7G/JDEhkn4wv3Tw7zvrojY0nHc27eEKWxznPlIMgXu/cLh6Pvk\n/fqbNilIvmpYYXzJ6fWkKuzjzdfUDaPJTNiaFqsV61y0Ny815RuiTTq0lc1WOYdx\nba7apP3er03hcx2lGr5AggNA6hSUeSeoS6IfOXbhhxUmaMbp3vGICUXxv6at73LU\nC6sAoRtWju95qQmWYC/wlg9xmBdBt3QIq3IY20yA1T4fe1/Yg2J7DGobYrFpuVWc\nrjWdky1LZxrN0TT8F2C2VcJaV3cVLoN13GC2PdP3G3CkpGMosOXFRUgc4IwLVT7F\nga+OUE7ZAgMBAAECggEAGe82zU9AoKX4B9M/2gB7EKb3FFiBcAHjN/Ar4M+Icj6T\n311sC7gPM37s06JhDptOuPoJXnsK990KbX3opKL2U83L3k/oBfOqyY+QKCW6yMlu\n13OthqdsxrO1kDfyX5Uv2BWd7M2iymtZ9rfBv++1ApOcguW9Z4oGRuCH8Vq4JvhH\n+mzhm/ZFHgQsnVxDA6nnV9nlXR8FYkOf/yIXD3m/rudvRAVyfDWoSnpvevmzA8YW\n56qvmYZ43QugLnuyLD2qtAQvS2nvI1LwTKzuFX/NwsYUPyl+7F7wuPZEjhUUqSvu\nDkm1irpRHw7VJhga0XtOkKT4ZYq9oTcIZ891PXqZTwKBgQD7yLPF2bhGTamFoH0Q\n1jpROfBsEFAHV/DKRdUm9u2oUURCZtQ/qgUybtCo/ncBLzRxP9iPXGf8BbxhRd1n\nfCGuoIZ0/UVgEs+FseQB6uAZpYKvCgRNaDsNy/QSuqFpIT823OVhaNzBXTpt4Gil\nrLwPjCypj7LhKUYCriG3KFLn4wKBgQC/LMFkFdEios9s2Bhci3CLlOejhQQ31PQo\njidjKAXpv6KMdtLZQRI1HBTIYiHPBI+mmFnsO0e7mfAlY5in3NUNVxB2aRXsuZB8\npxWDFNifNSA/J14AHuqb17uonm7Si1FLbiMjmKh8dyGlTEaz2lgKfT9jcm0V65lK\nw/11DSPTEwKBgHlTcS05iI54BeQaPanLUTaq0KuCAM5JFgKiO+AWxNaCsn28xzIW\nX4K521pTpEyxzndz6IrMYF8U9H17CQFA04ouWBwvnyp4Zf9qhRBXeb1h/+MQ1Jno\nS+yOBwKvY/Ag0TFCqFWUDiwvHGSt6j9LSSPEzBC46d2N4eqQtjZn++s5AoGAFwY3\n4Gr0PhynqK859+NfUaBEaaA6itLd+Qht2/ZVB/rpg8tHx5ybqcPRCPUwpzMgbesJ\nYXceQ4zdrFMbbpQdILcsp2Yums0ahrjE0X2wPTRzxsdh/de7X7uSwVMbe8YFq3T/\nTGk1WZArgDH4je6tDc5Z1QtR8gLm+mcyXmePufsCgYEAswUlMz2ocS0PmZrqv5Ot\namPjY6Ry/BhnuTZEcrzonKsOB1f5wzK1up3ATsQz7IahhycW6SYM0QqU8n+/1xrS\nL7rbISNNzty/lnwmiAxZKKTRdaCW5SLEHfFVxM+AVdEeOE3y84zhXKqdX3ejn89X\nSJ+W7i3oIYrSOuRn3I+3Lvk=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-mnu25@proyectofinalbe-b686f.iam.gserviceaccount.com",
      "client_id": "109277741933662349123",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mnu25%40proyectofinalbe-b686f.iam.gserviceaccount.com"
    },
    mysql: {
      client: 'mysql',
      connection: {
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'matinico11',
          database: 'ecommerce'
      },
      pool: { min: 0, max: 7}
    },
    sqlite: {
      client: 'sqlite3',
      connection: {
          filename: `./${config.FILE_PATH}`
      },
      useNullAsDefault: true
    }
  };
  
  module.exports = options;
  