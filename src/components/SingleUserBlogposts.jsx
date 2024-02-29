import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usersDetails } from "../reducers/usersReducer";

const IndividualBlogposts = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(usersDetails())
    }, [dispatch])


    const id = useParams().id
    console.log(id)
    const users = useSelector(state => state.userList)
    const userBlogs = users.find((user => user.id === id))
    const userWithBlogs = userBlogs? userBlogs.blogs : []
    
    console.log(users)
    console.log(userBlogs)
    // console.log(userBlogs.blogs)

    if(!userBlogs){
        return <div>Loading.......</div>
    }
    return(
        <div>
            <h3>{userBlogs.userName}</h3>

            {userWithBlogs.length < 1 && <h3>No Blogs created</h3>}

            {userWithBlogs.length >= 1 && 
                <ul>
                    {userWithBlogs.map(blog => (
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    ))}
                </ul>
            }

        </div>
    )
}

export default IndividualBlogposts