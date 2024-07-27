import '../layout/user.css';
import Posts from "./Posts";
import Todos from "./Todos";
import NewUser from "./NewUser";
import User from "./User";
import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { handleFetchUsers } from '../utilities/users';
import Loader from '../UI/Loader';

export default function Users() {

    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState({userId: 0, status: false});
    const [search, setSearch] = useState("");
    const [mouseHover, setMouseHover] = useState({});
    const [previewPosts, setPreviewPosts] = useState({});
    const [previewNewPost, setPreviewNewPost] = useState(false);
    const [insertOrEditData, setInsertOrEditData] = useState({ name: "", email: "", address: { street: "", city: "", zipcode: 0 }});

    const filterUsers = users.filter((user) => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search));

    const handleSearch = ({ target: { value } }) => setSearch(value);
    const handlePreviewNewPost = (boolean) => setPreviewNewPost(boolean);

    const handleTogglePreview = (userId) => {
        setPreviewPosts((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId],
        }));
    };

    const handleMouseHover = (userId, isHovering) => {
        setMouseHover((prevState) => ({
            ...prevState,
            [userId]: isHovering,
        }));
    };

    useEffect(() => { handleFetchUsers( setUsers ); }, []);

    if (!users.length) return <div> <Loader /> </div>;

    return (
        <>
            <Navbar
                handleSearch={handleSearch}
                handlePreviewNewPost={handlePreviewNewPost}
            />
                {previewNewPost ? 
                    <motion.div
                        initial={{ y: '0%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '-50%', opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        
                        <NewUser 
                            users={users} 
                            setUsers={setUsers} 
                            handlePreviewNewPost={handlePreviewNewPost}
                        /> 

                    </motion.div> 
                : null}

                { filterUsers.map((user) => (
                    <div key={user.id} className={`user-container ${previewPosts[user.id] ? 'open' : ''}`}>
                        <User
                            edit={edit} 
                            user={user}
                            setEdit={setEdit}
                            previewPosts={previewPosts}
                            insertOrEditData={insertOrEditData}
                            setInsertOrEditData={setInsertOrEditData}
                            handleTogglePreview={handleTogglePreview}
                            handleMouseHover={handleMouseHover}
                            mouseHover={mouseHover}
                            setUsers={setUsers}
                        />
                        <div>
                        {previewPosts[user.id] &&  
                            <motion.div 
                                className="user-details-form"
                                initial={{ y: '-20%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                exit={{ y: '-100%', opacity: 0 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            >
                                <Todos user={user} /> 
                                <Posts user={user} /> 
                            </motion.div>
                        }
                        </div>
                    </div>
                ))}
        </>
    );
}
