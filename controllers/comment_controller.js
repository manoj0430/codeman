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
    
            res.redirect('/');
        }
    }catch(err){
        console.log('Error in fetching comments', err);
        return;
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
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }

}catch(err){
    console.log(`Error in deleting comment: ${err}`);
    return ;
}
}