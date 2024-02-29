import axios from "axios";
const baseUrl = "http://localhost:4001/api/users";

const getUsers = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getUsers };
