import Axios from 'axios';

const BASE_URL = (process.env.NODE_ENV === 'production') ? '/' : 'https://';
const BASE_URL_NETLIFY = (process.env.NODE_ENV === 'production') ? '/' : '';

const axios = Axios.create({
    withCredentials: false
});

async function ajax(endpoint, method, data = null, isNetlifyBaseUrl = false ) {

    try {
        const res = await axios({
            url: `${isNetlifyBaseUrl ? BASE_URL_NETLIFY : BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    }
    catch (err) {
        console.log(err, 'Error At Fetching Data ...')
    }
}

const exportedObj = {

    get(endpoint, data , isNetlifyBaseUrl) {
        return ajax(endpoint, 'GET', data , isNetlifyBaseUrl);
    },
    post(endpoint, data, isNetlifyBaseUrl) {
        return ajax(endpoint, 'POST', data, isNetlifyBaseUrl);
    },
    put(endpoint, data, isNetlifyBaseUrl) {
        return ajax(endpoint, 'PUT', data, isNetlifyBaseUrl)
    },
    remove(endpoint, data, isNetlifyBaseUrl) {
        return ajax(endpoint, 'DELETE', data, isNetlifyBaseUrl)
    }

}

export default exportedObj;