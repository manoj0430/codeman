const Post = require("../models/post");
module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
    .populate("user")
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec();

    return res.render("home", {
      title: "Codeial || Posts",
      posts: posts,
    });
  } catch (err) {
    console.log("Error in fetching posts", err);
    return;
  }
};
