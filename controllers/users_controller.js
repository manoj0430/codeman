module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile"
  });
};


// Render SignUp page

module.exports.signUp = function(req,res){
  return res.render('user_sign_up',{
      title: 'Codeial|| SignUp'
  });
};

// Render SignIn page

module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
      title: 'Codeial || SignIn'
  });
};

//get Sign Up Data

