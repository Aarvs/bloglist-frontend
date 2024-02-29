import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/notify'
import Create from './components/createNew'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { addNotification } from './reducers/notifyReducer'
import { useDispatch, useSelector } from 'react-redux'
import { allBlogPosts, createBlog, deleteBlog, updateBlog } from './reducers/blogsReducer'
import { loggedUser } from './reducers/loggedInReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import AllUsers from './components/UserList'
import IndividualBlogposts from './components/SingleUserBlogposts'

const App = () => {

  const allBlogs = useSelector(state => state.userList)

  const dispatch = useDispatch()

  const thisUser = useSelector(state => state.user[0])
  console.log(thisUser)

  const blogPosts = useSelector(state => state.posts)

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    dispatch(allBlogPosts())
  }, [])

  useEffect(() => {
    if (thisUser) {
      const user = typeof thisUser === 'string' ? JSON.parse(thisUser) : thisUser;
      console.log(user)
      blogService.setToken(user.token)
      setUserName(user.userName)
    }
  }, [thisUser])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loggedUser(userName, password))
      dispatch(addNotification(`${userName} logged in succesfully`, 5))
      // setUserName("")
      setPassword("")
      

    } catch (exception) {
      dispatch(addNotification(`wrong username or password ${exception}`, 5))
    }
  }

  const handleLikes = async(id, updatedBlog) => {
    const blogId = id
    try{
      dispatch(updateBlog(id, updatedBlog))
    } catch (error) {
      console.log("error updating likes:", error.message)
    }
  };

  const handleDelete = async(id) => {
    try{
      dispatch(deleteBlog(id))
      dispatch(addNotification(`Blog deleted successfully`, 5))

    }catch(error){
      console.log("error deleting blog", error.message)
    }
  };

  const addBlog = async (BlogObject) => {
    try {
      dispatch(createBlog(BlogObject))
      dispatch(addNotification(`a new blog is added`, 5))
    } catch (error) {
      console.error("Error creating blog:", error.message)
      dispatch(addNotification(`Error creating blog`, 5))
    }
  }

  if (thisUser == null && !window.localStorage.getItem("loggedBlogappUser")) {
    return (
      <Togglable buttonLabel="Login First">
        <LoginForm
          userName={userName}
          password={password}
          handleUserNameChange={({target}) => setUserName(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleSubmit={handleLogin}
       />
      </Togglable>
    )
  }

  // const match = useMatch('users/:id')
  // const SingleUserBlogs = match
  //     ? allBlogs.find(user => user.id === Number(match.params.id))
  //     : null
  
  // console.log(SingleUserBlogs)
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{userName} logged in <button onClick={() => window.localStorage.clear()}>logout</button></p>

      <div style={{padding: 10}}>
        <Link to="/users">users</Link>
      </div>

      <Togglable buttonLabel="Create New">
        <Create
          createBlog={addBlog}
        />
      </Togglable>

      <Routes>
          <Route path="/users" element={<AllUsers/>}/>   
          <Route path='/users/:id' element={<IndividualBlogposts/>}/>      
      </Routes>

      {blogPosts.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          update={handleLikes} 
          remove={handleDelete} 
        />
      )}
    </div>
  )
}

export default App;







