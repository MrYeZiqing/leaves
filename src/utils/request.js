import axios from 'axios';
import {Toast} from 'antd-mobile';

const instance = axios.create({
    // 服务器地址需要自己配置和开发
    baseURL: '/api',
    timeout: 10000,
    withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        config.headers = {
            'x-requested-with': '',
            authorization: ''
        };
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        // 你的业务数据
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        const { response } = error;
        if (response) {
            if (response.status === 404) {
                Toast.info('请求资源未发现');
            } else if (response.status === 403) {
                Toast.info(response.data.msg, () => {
                    window.location.href = '/admin/login';
                });
            } else {
                Toast.info(response.data.msg);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
