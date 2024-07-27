import React from "react";
import InputModel from "../UI/InputModel";
import { handleDetails, handleUpdateUser, handleDeleteUser } from "../utilities/users";
import { headContentAnimation } from "../utilities/motion";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "../layout/user.css";

export default function User({
    user = {},
    edit = false,
    insertOrEditData = {},
    mouseHover = false,
    previewPosts = {},
    setUsers = () => {},
    setEdit = () => {},
    handleTogglePreview = () => {},
    setInsertOrEditData = () => {},
    handleMouseHover = () => {},
}) {

    const isEditing = edit.userId === user.id && edit.status;

    const handleEdit = (userId) => setEdit((prevState) => ({
        userId,
        status: prevState.userId === userId ? !prevState.status : true
    }));

    return (
        <motion.div
            {...headContentAnimation}
            className={`user-card ${ previewPosts[user.id] ? "user-card-active" : "" }`}
        >
            <div className="user-inner-card">
                <div>
                    <button onClick={() => handleTogglePreview(user.id)}> <GiHamburgerMenu/> </button> 
                    <button onClick={() => handleEdit(user.id)}> <FaEdit/> </button> 
                </div>

                <span
                    style={{ cursor: "pointer", userSelect: "none"}}
                    onClick={() => handleTogglePreview(user.id)}
                >
                    ID: {user.id}
                    <motion.span
                        className="click-animate"
                        {...headContentAnimation}
                    >
                        Click Here
                    </motion.span>
                </span>

                {!isEditing ? (
                    <>
                        <span> Name: {user.name} </span>
                        <span> Email: {user.email} </span>
                    </>
                ) : (
                    <>
                        Name: <input
                            type="text"
                            name="name"
                            defaultValue={user.name}
                            onChange={(e) =>
                                handleDetails(setInsertOrEditData, e)
                            }
                        />
                        Email : <input
                            type="email"
                            name="email"
                            onChange={(e) =>
                                handleDetails(setInsertOrEditData, e)
                            }
                            defaultValue={user.email}
                        />
                    </>
                )}
                <div
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => handleMouseHover(user.id, true)}
                >
                    <button>More Details</button>
                    <span className="click-animate"> Hover Me </span>

                    <div>
                        <button
                            onClick={() =>
                                handleUpdateUser(
                                    edit,
                                    handleMouseHover,
                                    insertOrEditData,
                                    setUsers,
                                    user.id,
                                    setInsertOrEditData
                                )
                            }
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDeleteUser(setUsers, user.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="buttons-container">
                <InputModel
                    edit={edit}
                    key={user.id}
                    handleDetails={handleDetails}
                    mouseHover={mouseHover}
                    setInsertOrEditData={setInsertOrEditData}
                    user={user}
                />
            </div>
        </motion.div>
    );
}
