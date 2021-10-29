const Axios = require('axios');

const BASE_URL = (process.env.NODE_ENV === 'production') ? '/' : 'https://';
const axios = Axios.create({
    withCredentials: false
});

async function ajax(endpoint, method, data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    }
    catch (err) {
        console.log(err, 'Error At Fetching Data ...')
    }
}

module.exports = {
    get(endpoint) {
        return ajax(endpoint, 'GET');
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data);
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    remove(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}