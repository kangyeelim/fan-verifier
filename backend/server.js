const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
let User = require('./models/user.model');

require('dotenv').config();
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
//creates express server
const app = express();
const port = process.env.PORT || 5000;

//cors middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: `http://localhost:${port}/auth/facebook/callback`,
    profileFields: ["email", "name", "id"]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(JSON.stringify(profile))
    const { email, name, id } = profile._json;
    User.findOne({
            'facebookId': id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found so create a new user with values from Facebook
            if (!user) {
                user = new User({
                    name,
                    email,
                    facebookId: id
                });
                newUser.save()
                  .then(() => res.json('FB User added!'))
                  .then(() => done(null, profile))
                  .catch(err => res.status(400).json('Error: ' + err));
            } else {
                //found user
                return done(err, user);
            }
        });
  }
));

const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');
const fbUsersRouter = require('./routes/fbUsers');

app.use('/questions', questionsRouter);
app.use('/users', usersRouter);
app.use('/', fbUsersRouter);

//starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
