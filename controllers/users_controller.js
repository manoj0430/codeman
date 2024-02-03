const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
  });
};

// Render SignUp page

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial|| SignUp",
  });
};

// Render SignIn page

module.exports.signIn = function (req, res) {
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
module.exports.createSession = function (req, res) {};
