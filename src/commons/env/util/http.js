import axios from 'axios';
import {qs} from 'common.env';

let baseURL = 'http://qa.365bencao.cn/malls/';

if (location.origin.indexOf('xhjx.') != -1) {
    baseURL = 'http://xhjxcms.365bencao.com/malls/';
} else if (location.origin.indexOf('qaservice.') != -1) {
    baseURL = 'http://qa.365bencao.cn/malls/';
} else {
    baseURL = 'http://qa.365bencao.cn/malls/';
}

export {baseURL};


export function http() {
    //let _opts = Object.assign({}, options);
    axios.defaults.timeout = 5000;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    axios.defaults.baseURL = baseURL;

    return (options) => {
        options.data = qs.stringify(options.data);
        return axios(options);
    };
}
