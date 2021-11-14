import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "https://api.spoonacular.com/recipes",
});
