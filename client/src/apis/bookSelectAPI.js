import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "https://www.googleapis.com/books/v1/volumes/volumeId",
});
