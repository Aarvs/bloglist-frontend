import axios from "axios";
const baseUrl = "http://localhost:4001/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// const create = async (newObject) => {
//   const config = {
//     headers: { Authorization: token },
//   };
//   const response = await axios.post(baseUrl, newObject, config);
//   return response.data;
// };

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error.message);
    throw error; // rethrow the error to be caught by the calling code
  }
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default { getAll, create, update, setToken };
