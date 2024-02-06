const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// we need to tell passport to use local strategy

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function (email, password, done){
    //find user and establish connection
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log('Error in finding user in Passport');
            return done(err);
        }

        //if user not found or password doesnot match
        if(!user || user.password != password){
            console.log('Invalid User/ password');
            return done(null, false);
        }

        return done(null,user);
    })
}
))

//serializing the user to decide which key to be kept in cookie
passport.serializeUser((user,done)=>{
    done(null, user.id);
})

//Deserializing the user from the key in cookies

passport.deserializeUser(id, (err, user)=>{
    if(err){
        console.log('Error in finding user in Passport');
        return done(err);
    }
    return done(null,user);
})

module.exports = passport;