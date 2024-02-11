{
    //method to submit form data using AJAX
    let createForm= function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newDomForm(data.data.post);
                    $('.posts_container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to create a post in DOM

    let newDomForm = function(post){
        return $(`
                <li id="post-${post.id}">
                    <p>
                        
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small>
                        
                        
                        ${post.content} 
                        <br>
                        <small>
                        ${post.user.name}
                        </small>
                    </p>
            
                <!-- create a form for comments -->
                    
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Write a comment..." required>
                            <input type="hidden" name="post" value="${post._id} ">
                            <input type="submit" value="Add Comment">
                        </form>
                    
            
                    <div class="post_comments_container">
                        <ul class="posts_comments-${post._id} ">
                            
                        </ul>
                
                    </div>
                
            </li>
    `)
    }

    //method to delete post from DOm
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createForm();
}