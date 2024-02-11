const Post = require("../models/post");
const User = require('../models/user');
module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate("user")
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec();

    const users = await User.find({});

    return res.render("home", {
      title: "Codeial || Posts",
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.log("Error in fetching posts", err);
    return;
  }
};
