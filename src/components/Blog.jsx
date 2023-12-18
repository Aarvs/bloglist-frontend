import { useState } from "react"

const Blog = ({ blog, update, remove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideDetails = {display: visible ? 'none' : ''}
  const showDetails = {display: visible ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Here i used a local storage method to get the userName of the user who post the blog.
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
  const user = JSON.parse(loggedUserJSON)
  console.log(user.name)

  const handleLike = (event) =>{
    event.preventDefault()
    const updatedBlog = {...blog, likes: blog.likes + 1}
    update(blog.id, updatedBlog)
  }

  const deleteBlog = (event) =>{
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${user.userName}`)){
      remove(blog.id)
    }
  }

  return(
    <div style={blogStyle}>
      <div style={hideDetails}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>View Details</button>
        <button onClick={deleteBlog}>remove</button>
      </div> 
      <div style={showDetails}>
        <p>Title:{blog.title} {blog.author}</p>
        <p>Url:{blog.url}</p>
        <p>Likes:{blog.likes} <button onClick={handleLike}>like</button></p>
        <p>Name:{user.userName}</p>
        <button onClick={toggleVisibility} style={{marginBottom: "18px"}}>Hide Details</button>
      </div>
    </div>

  )
}

export default Blog