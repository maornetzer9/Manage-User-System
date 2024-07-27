import React from "react";


export default function InputModel({
    setInsertOrEditData = () => {},
    handleDetails = () => {},
    mouseHover = {},
    edit = false,
    user = {},
}) 
{

    const fields = 
    [
        { data: user?.address?.street,  name: "street",  title: "Street",   type: "text" },
        { data: user?.address?.city,    name: "city",    title: "City",     type: "text" },
        { data: user?.address?.zipcode, name: "zipcode", title: "Zip Code", type: "text" },
    ];

    const isEditing = edit.userId === user.id && edit.status;


    return (
        <>
            {user.address ? (
                <div className={`more-details ${mouseHover[user.id] ? "open" : ""}`}>
                    {fields.map((field, index) => (
                        <div key={index}>
                            {`${field.title}: `}
                                {isEditing ? (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        onChange={(e) => handleDetails(setInsertOrEditData, e)}
                                        defaultValue={field.data}
                                    />
                                ) : (
                                    <span> {field.data} </span>
                                )}
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
}
