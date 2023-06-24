import axios from 'axios';

const fetchALlUser = () => {
  return axios.get("https://reqres.in/api/users?page=1")
};

export { fetchALlUser };
