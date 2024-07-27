import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const TODOS_URL = "https://jsonplaceholder.typicode.com/users";

export const handleFetchUsers = async (setUsers = () => {}) => {
    try
    {
        const usersSession = JSON.parse(sessionStorage.getItem('users'));
        
        if( usersSession !== null ) return setUsers(usersSession);
        
        const { data } = await axios.get(`${USERS_URL}?_limit=3`);
        sessionStorage['users'] = JSON.stringify(data);
        setUsers(data);
    }
    catch(err)
    {
        console.error("Failed to fetch users", err);
    }
};


export const handleDetails = ( setInsertOrEditData = () => {}, { target: { name, value } }) => {

    setInsertOrEditData((prevState) => {
        const newState = { ...prevState };

            if (name in newState) 
            {
                newState[name] = value;
            } 
            else 
            {
                const [addressKey] = name.split(".");
                newState.address[addressKey] = value;
            }
        return newState;
    });
};


export const handleUpdateUser = async ( edit, handleMouseHover = () => {}, insertOrEditData = {}, setUsers = () => {}, userId = 0, setInsertOrEditData = () => {}) => {
    try 
    {
        let updatedUsers;
        const { name, email, address } = insertOrEditData;
        
        if( !edit.status ) return alert('Need to be on edit mode before update...')
        if( !name || !email || !address.city || !address.street || !address.zipcode ) return alert('One of the details are missing...')

        const updatedUser = { ...insertOrEditData, id: userId };
        const { data } = await axios.put(`${USERS_URL}/${userId}`, updatedUser );
        const usersSession = JSON.parse(sessionStorage.getItem('users'));

        if(usersSession !== null)
        {
            updatedUsers = usersSession.map((user) => (user.id === userId ? data : user));
            sessionStorage['users'] = JSON.stringify(updatedUsers);

            handleMouseHover(userId, false);
            setInsertOrEditData({id: "", name: '', email: "", address: { city: "", street: "", zipcode: 0 }});
        }
        else
        {
            updatedUsers = prevUsers.map((user) => (user.id === userId ? data : user));
            sessionStorage['users'] = JSON.stringify(updatedUsers); 

            setUsers(updatedUsers)
            handleMouseHover(userId, false);
            setInsertOrEditData({name: '', email: "", address: { city: "", street: "", zipcode: 0 }});
        }
    } 
    catch (err) 
    {
        console.error("Failed to update user", err);
    }
};


export const handleDeleteUser = async (setUsers = () => {}, userId = 0) => {
    try 
    {
        let updatedUsers;
        const usersSession = JSON.parse(sessionStorage.getItem('users') || []);

        await axios.delete(`${USERS_URL}/${userId}`);

        if(usersSession !== null)
        {
            updatedUsers = usersSession.filter((user) => user.id !== userId);
            sessionStorage['users'] =JSON.stringify(updatedUsers);
            setUsers(updatedUsers);
        }
        else
        {
            setUsers((prevUser) => {
                updatedUsers = prevUser.filter((user) => user.id !== userId);
                return updatedUsers
                
            })
            sessionStorage['users'] = JSON.stringify(updatedUsers);
        }
    } 
    catch (err) 
    {
        console.error("Failed to delete user", err);
    }
};


export const handleNewUserDetails = (setNewUser = () => {}, { target: { name, value } }) => {

    if (['street', 'city', 'zipcode'].includes(name)) 
        
    {
        setNewUser((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    } 
    else 
    {
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
};
 

export const handleNewUser= async ( newUser = {}, users = [], setUsers = () => {}, handlePreviewNewPost = () => {} ) => {
    try
    {   
        const id = users[users.length - 1].id + 1;
        const { data } = await axios.post(TODOS_URL, newUser);
        data.id = id;

        const updatedUsers = [...users, data]; 
        sessionStorage['users'] = JSON.stringify(updatedUsers);

        setUsers([ ...users, data ]);
        handlePreviewNewPost( false );
        return users
    }
    catch(err)
    {
        console.error("Failed to add new user",err);
    }
}