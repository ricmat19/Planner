import axios from 'axios';

export default axios.create({
    baseURL: "https://www.eventbriteapi.com/v3",
});