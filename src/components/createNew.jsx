import React from 'react';

const Create = ({ title, setTitle, url, setUrl, likes, setLikes, addBlog }) => {
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
