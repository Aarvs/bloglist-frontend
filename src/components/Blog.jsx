import { useState } from "react"

const Blog = ({ blog }) => {
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
  return(
    <div>
      <div style={hideDetails}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>View Details</button>
      </div> 
      <div style={showDetails}>
        <p>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <button onClick={toggleVisibility} style={{marginBottom: "18px"}}>Hide Details</button>
      </div>
    </div>

  )
}

export default Blog