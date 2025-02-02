import axios from "axios";
const baseUrl = "http://localhost:4001/api/login";

const login = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
