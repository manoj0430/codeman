const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    //We need to check whether post is present or not, the only we need to add a comment
    const post= await Post.findById(req.body.post);

    if(post){
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        post.save();
    }
}