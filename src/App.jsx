import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notify'
import Create from './components/createNew'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    blogService.getAll()
    .then(blogs => blogs.sort((a, b) => b.likes - a.likes))
    .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        userName, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      
      setErrorMessage(`${userName} logged in successfully`)
      setTimeout(() => {
        setErrorMessage("")
        setPassword("")
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong username or password", exception)
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
    }
  }

  const handleLikes = async(id, updatedBlog) => {
    const blogId = id
    try{
      await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((b) => (b.id === blogId ? updatedBlog : b)))
    } catch (error) {
      console.log("error updating likes:", error.message)
    }
  };

  const handleDelete = async(id) => {
    try{
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setErrorMessage(`Blog deleted successfully`)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    } catch(error){
      console.log("error deleting blog", error.message)
    }
  };

  const addBlog = async (BlogObject) => {
    try {
      const returnedBlog = await blogService.create(BlogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} is added by ${userName}`)
      setTimeout(() => {
        setErrorMessage("")
        setUserName("")
      }, 5000);
    } catch (error) {
      console.error("Error creating blog:", error.message)
      setErrorMessage("Error creating blog")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
    }
  }

  if (user === null) {
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={errorMessage} />
      <p>{user.name} logged in <button onClick={() => window.localStorage.clear()}>logout</button></p>

      <Togglable buttonLabel="Create New">
        <Create
          createBlog={addBlog}
        />
      </Togglable>

      {blogs.map(blog =>
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

export default App

