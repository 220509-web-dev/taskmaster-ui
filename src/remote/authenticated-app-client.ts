import axios from "axios";

export const authAppClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Authorization': 'asjkhdasjkh239', // TODO apply actual token reference here
        'Accept': 'application/json'
    },

    // prevents Axios from throwing an error if the response status is outside of 200-299
    validateStatus: () => true
});