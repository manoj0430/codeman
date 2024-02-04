const User = require("../models/user");
module.exports.profile = async function (req, res) {
  //Check User Id cookie present or not

  if (req.cookies.user_id) {
    const user = await User.findById(req.cookies.user_id);
    if (user) {
      return res.render("user_profile", {
        title: "User Profile",
        user: user,
      });
    }
  } else {
    return res.redirect("/users/signin");
  }
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
module.exports.createSession = async function (req, res) {
  //Find User
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check whether password is matched or not
      if (user.password != req.body.password) {
        res.redirect("back");
      }

      //create session
      res.cookie("user_id", user.id);
      res.redirect("/users/profile");
    }
  } catch {
    if (err) {
      console.log("Error in signing the user");
      return;
    }
  }
};

// Logout

module.exports.logout = async (req, res) => {
  if (req.cookies.user_id) {
    const user = await User.findById(req.cookies.user_id);
    console.log(req.cookies.user_id);
    req.session.destroy()
    return res.redirect("/users/signin");
  }else{
    return res.redirect("/users/signin");
  }
};
