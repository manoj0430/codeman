const Post = require("../models/post");
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if(req.xhr){
      return res.status(200).json(
        {
          data:{
            post: post
          },
          message: 'Post Created'
        }
      )
    }
    req.flash('success', 'Post Published');
    return res.redirect("back");
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
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

      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id: req.params.id
          },
          message: 'Post Deleted'
        })
      }
      req.flash('success', 'Post deleted Successfully');
      return res.redirect('back');
    }else{
      req.flash('error', 'You cannot delete this post');
      return res.redirect('back');
    }
   }catch(err){
    req.flash('error',err);
    return res.redirect('back');
   }

}
