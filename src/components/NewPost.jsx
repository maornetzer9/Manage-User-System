import React, { useState } from 'react';
import axios from 'axios';
import '../layout/new-post.css';

export default function NewPost({ user, posts = [], setPosts = () => {}, handlePreviewNewPost = () => {} }) {

    const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

    const [newPost, setNewPost] = useState({ title: '', body: '', userId: user.id });

    // Handle the new post data
    const handleDetails = ({ target: { name, value } }) => setNewPost({ ...newPost, [name]: value });

    // Handle adding a new post for a user
    const handleNewPost = async () => {
        try {
            const { data } = await axios.post(POSTS_URL, newPost);

            const updatedPosts = [...posts, data];
            setPosts(updatedPosts);

            // Store the updated posts for the specific user in session storage
            sessionStorage.setItem(`posts_user_${user.id}`, JSON.stringify(updatedPosts));

            handlePreviewNewPost(false);
        } catch (err) {
            console.error("Failed to add new post", err);
        }
    };

    return (
        <div className='new-post-form'>
            <h1> New Post {user?.name} </h1>
            <div>
                Title:
                <input 
                    type="text" 
                    name='title' 
                    placeholder='Enter title' 
                    onChange={handleDetails} 
                    value={newPost.title} 
                />
            </div>
            <div>
                Body:
                <input 
                    type="text" 
                    name='body' 
                    placeholder='Enter body' 
                    onChange={handleDetails} 
                    value={newPost.body} 
                />
            </div>
                <div 
                    className='btns-form'
                >
                    <button onClick={handleNewPost}> Add </button>
                    <button onClick={() => handlePreviewNewPost(false)}> Cancel </button>
                </div>
        </div>
    );
}
