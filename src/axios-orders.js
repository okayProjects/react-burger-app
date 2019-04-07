import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myreactburger-91980.firebaseio.com/'
})

export default instance;