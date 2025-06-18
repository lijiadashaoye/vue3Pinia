import axios from 'axios';
const http = axios.create({
  // 在 vite.config.js 中配置了代理，这里就不需要写了
  // baseURL:import.meta.env.VITE_APP_BASE_URL,
  timeout: 1000 * 20,
  headers: {
    // Authorization: getToken(),
    'Content-Type': 'application/json;charset=utf-8', //请求头
  },
});

// JSON = 'application/json;charset=UTF-8'
// FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8'
// FORM_DATA = 'multipart/form-data;charset=UTF-8'

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);
export default http;
