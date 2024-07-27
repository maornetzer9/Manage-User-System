import React, { useState } from 'react';
import '../layout/new-user.css';
import { handleNewUser, handleNewUserDetails } from '../utilities/users';
 
export default function NewUser( { users = [], setUsers = () => {}, handlePreviewNewPost = () => {} } ) {


    const [ newUser, setNewUser ] = useState({id: "", name: "", email: "", address: { street: "", city: "", zipcode: 0 }});
   
  return (
    <div className='new-user-form'>

            <h1> Add New User </h1>

        <div 
            className='new-user-input-form'
        >
            Name :     <input type="text"  placeholder='Enter Name'     name='name'    onChange={(e) => handleNewUserDetails(setNewUser, e)}/>
            Email :    <input type="email" placeholder='Enter Email'    name='email'   onChange={(e) => handleNewUserDetails(setNewUser, e)}/>
            Street :   <input type="text"  placeholder='Enter Street'   name='street'  onChange={(e) => handleNewUserDetails(setNewUser, e)}/>
            City :     <input type="text"  placeholder='Enter City'     name='city'    onChange={(e) => handleNewUserDetails(setNewUser, e)}/>
            Zip Code : <input type="text"  placeholder='Enter Zip Code' name='zipcode' onChange={(e) => handleNewUserDetails(setNewUser, e)}/>
            
        </div>

        <div 
            className='btns-form'
        >
            <button 
                onClick={() => handleNewUser( newUser, users, setUsers, handlePreviewNewPost )}
            >
                Add 
            </button>

            <button onClick={() => handlePreviewNewPost(false)}> Cancel </button>
        </div>

    </div>
  )
}
