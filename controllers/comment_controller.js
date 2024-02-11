const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    //We need to check whether post is present or not, the only we need to add a comment

    try{
        const post= await Post.findById(req.body.post);

        if(post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
    
            post.comments.push(comment);
            post.save();
            req.flash('success', 'Commented Successfully');
            res.redirect('/');
        }else{
            req.flash('error', 'You cannot post a comment');
            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}


module.exports.destroy = async function(req,res){

try{
    const comment = await Comment.findById(req.params.id);
    

    if(comment.user == req.user.id ){
        //before deleting the comment directly we need to save postId in some variable
        let postId= comment.post;
        await comment.deleteOne();
        await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
        req.flash('success', 'Comment Deleted Successfully');
        return res.redirect('back');
    }else{
        req.flash('error', 'You cannot delete this comment');
        return res.redirect('back');
    }

}catch(err){
    req.flash('error', err);
    return res.redirect('back');
}
}