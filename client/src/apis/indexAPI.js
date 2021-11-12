import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000" || "https://planner-ricmat19.herokuapp.com",
});
