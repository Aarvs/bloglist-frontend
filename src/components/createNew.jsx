import React from 'react';
import { useState } from 'react';

const Create = ({createBlog}) => {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState(0)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      url,
      likes
    })
    // Clear the form fields after successful blog creation
    setTitle("")
    setUrl("")
    setLikes(0)
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          Likes:
          <input type="number" value={likes} onChange={(e) => setLikes(e.target.value)} />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default Create;
