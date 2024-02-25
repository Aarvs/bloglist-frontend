import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    blogPosts: (state, action) => {
      return action.payload;
    },

    updatePosts: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },

    deletePosts: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id);
    },

    creatPosts: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const allBlogPosts = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(blogPosts(sortedBlogs));
  };
};

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    const changedBlog = await blogService.update(id, updatedBlog);
    dispatch(updatePosts(changedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(id);
    console.log(deletedBlog);
    dispatch(deletePosts({ id }));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blogObject);
    console.log(addedBlog);
    dispatch(creatPosts(addedBlog));
  };
};

export const { blogPosts, updatePosts, deletePosts, creatPosts } =
  blogSlice.actions;

export default blogSlice.reducer;
