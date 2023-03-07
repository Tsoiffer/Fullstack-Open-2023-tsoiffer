import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const createPerson = (newPerson) => {
  console.log("createPerson");
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => {
    console.log("promise fulfilled");
    return response.data;
  });
};

const getAll = () => {
  console.log("getAll");
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log("promise fulfilled");
    console.log(response);
    return response.data;
  });
};

export default { getAll, createPerson };
