const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// we need to tell passport to use local strategy

passport.use(new LocalStrategy({
    usernameField: 'email'
},
async function (email, password, done){
    try {
        //find user and establish connection
        const user = await User.findOne({email: email});
        
        //if user not found or password does not match
        if(!user || user.password != password){
            console.log('Invalid User/ password');
            return done(null, false);
        }

        return done(null,user);
    } catch (err) {
        console.log('Error in finding user in Passport');
        return done(err);
    }
}
))

//serializing the user to decide which key to be kept in cookie
passport.serializeUser((user,done)=>{
    done(null, user.id);
})

//Deserializing the user from the key in cookies

passport.deserializeUser(async(id,done)=>{

    try{
        const user= await User.findById(id);
        return done(null,user);

    }catch(err){
        console.log('Error in finding user --> Passport');
            return done(err);
    }
   
})

passport.checkAuthentication = function(req,res, next){
    //if user is signed in, pass the request to next controller
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/signin');
    
}

//if user is signed in, send those details to view
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;