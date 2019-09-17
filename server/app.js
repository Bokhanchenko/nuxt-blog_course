const express = require('express');
// npm i body-parser (парсер входящих параметров)
const bodyParser = require('body-parser');
// npm i mongoose (для работы с mlab (mongoDB)) https://mlab.com/databases/nuxt-block#users
const mongoose = require('mongoose');
// библиотека для работы с защитой роутов (токены)
const passport = require('passport');
const passportStrategy = require('./middleware/passport-strategy');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const keys = require('./keys');
const app = express();

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((e) => console.error(e));

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// регистрация роутов
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;
