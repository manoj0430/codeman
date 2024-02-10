const Post = require("../models/post");
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating post", err);
    return;
  }
};

//action for deleting post and its related comments

module.exports.destroy = async function(req,res){
  //check whether post present or not in DB
   try{
    const post= await Post.findById(req.params.id);
    //check whether the user who created the post is deleting the post
    if(post.user == req.user.id){
      await post.deleteOne();
      await Comment.deleteMany({post: req.params.id})
      return res.redirect('back');
    }
   }catch(err){
    console.log('Error in Deleting user:', err);
    return res.redirect('back');
   }

}
