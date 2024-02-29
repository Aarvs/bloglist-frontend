import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { usersDetails } from "../reducers/usersReducer"

const AllUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(usersDetails())
    }, [dispatch])
    
    const users = useSelector(state => state.userList)
    

    console.log(users)
    return(
        <div>
            <h3>Users</h3>
            <h5>blogs created</h5>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}: </Link>
                        <span style={{display:"flex", alignItems:"center"}}>{user.blogs.length}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllUsers

