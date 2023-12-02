import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notify'
import Create from './components/createNew'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      url: url,
      likes: likes,
    }

    try {
      const returnedBlog = await blogService.create(newBlog)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      // Clear the form fields after successful blog creation
      setTitle("")
      setUrl("")
      setLikes(0)
      setErrorMessage(`a new blog ${returnedBlog.title} is added by ${userName}`)
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
    } catch (error) {
      console.error("Error creating blog:", error.message)
      setErrorMessage("Error creating blog")
      setTimeout(() => {
        setErrorMessage("")
        setUserName("")
      }, 5000);
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            userName:
            <input type="text" name='userName' value={userName} onChange={({ target }) => setUserName(target.value)} />
          </div>
          <div>
            password:
            <input type="password" name='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={errorMessage} />
      <p>{user.name} logged in <button onClick={() => window.localStorage.clear()}>logout</button></p>

      <Create
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
        likes={likes}
        setLikes={setLikes}
        addBlog={addBlog}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App

