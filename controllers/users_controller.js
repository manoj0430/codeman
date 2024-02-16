  const User = require("../models/user");
  const fs= require('fs');
  const path= require('path');
  module.exports.profile = async function (req, res) {
    const user = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user
    });
  };

  //update
  module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
      try{
        let user=await User.findById(req.params.id);

        User.uploadedAvatar(req, res, function(err){
          if(err){
            console.log(`Multer err: ${err}`);
            return;
          }
          //we store the file alongside user
          user.name = req.body.name;
          user.email= req.body.email;
          if(req.file){
            if(user.avatar){
              fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            user.avatar= User.avatarPath + '/' + req.file.filename;
            console.log(user.avatar);
          }
          user.save();
          return res.redirect('back');
        })
      }catch (err) {
        console.log("error in the avatar", err);
        return;
      }
    }
     
    // }else{
    //   return res.status(401).send('UnAuthorized');
    // }
  }

  // Render SignUp page

  module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
    }
    return res.render("user_sign_up", {
      title: "Codeial|| SignUp",
    });
  };

  // Render SignIn page

  module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
    }
    return res.render("user_sign_in", {
      title: "Codeial || SignIn",
    });
  };

  //get Sign Up Data

  // module.exports.create= function(req,res){
  //     //check whether password and confirm password are same
  //     if(req.body.password != req.body.confirm_password){
  //       return res.redirect('back');
  //     }

  //     //check whether email already exits or not
  //     User.findOne({email: req.body.email}, function(err,user){
  //       if(err){console.log("Error in finding the user", err); return;}

  //         if(!user){
  //           User.create(req.body, function(err,user){
  //             if(err){console.log("Error in creating user while signing up", err); return;}

  //             return res.redirect('/users/signin');
  //           })
  //         }else{
  //           return res.direct('back');
  //         }

  //     })

  // }

  module.exports.create = async function (req, res) {
    //check whether password and confirm password are same
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    try {
      // Check whether email id exits or not
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        await User.create(req.body);

        return res.redirect("/users/signin");
      } else {
        return res.redirect("back");
      }
    } catch (err) {
      console.log("error in creating/sign up the user", err);
      return;
    }
  };

  // To sign in and create a session
  module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Sucessfully!!');
    return res.redirect("/");
  };


  //signout

  module.exports.destroySession = function(req,res){
    //first logout
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', 'Successfully Logged off!!');
      res.redirect('/');
    });
  }

