import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import NewPost from './NewPost';
import Loader from '../UI/Loader';
import '../layout/posts.css';

export default function Posts({ user = {} }) {

    const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

    const [posts, setPosts] = useState([]);
    const [previewNewPost, setPreviewNewPost] = useState(false);

    const handlePreviewNewPost = (boolean) => setPreviewNewPost(boolean);

    const handleFetchPosts = useCallback(async () => {
        try 
        {
            // Fetch posts from session storage using a unique key for each user
            const postsSession = JSON.parse(sessionStorage.getItem(`posts_user_${user.id}`));

            if (postsSession !== null) return setPosts(postsSession);

            const { data } = await axios.get(`${POSTS_URL}?userId=${user.id}&_limit=3`);
            setPosts(data);

            // Store the fetched posts for the specific user in session storage
            sessionStorage.setItem(`posts_user_${user.id}`, JSON.stringify(data));
        } 
        catch (err) 
        {
            console.error("Error to fetch posts", err);
        }
    }, [user.id]);

    useEffect(() => { handleFetchPosts(); }, [handleFetchPosts]);

    if (!posts.length) return <div> <Loader /> </div>;

    return (
        <div className="posts-container">
            {
            !previewNewPost ? 
                <div >
                    <div className="posts-header">
                        <h3>Posts - {user.name}</h3>
                        <button onClick={() => handlePreviewNewPost(true)}>Add</button>
                    </div>

                    {posts.map((post) => {
                        return (
                            <div key={post.id} className="post-item">
                                <span> Title: {post?.title} </span>
                                <span> Body: {post?.body}</span>
                            </div>
                        );
                    })}
                </div> 
            :  
                <NewPost 
                    user={user} 
                    posts={posts} 
                    setPosts={setPosts} 
                    handlePreviewNewPost={handlePreviewNewPost}
                />  
            }
        </div>
    );
}
