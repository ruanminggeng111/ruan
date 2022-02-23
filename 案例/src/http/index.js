import axios from 'axios'


// 设置基地址
const instance = axios.create({
    // baseURL: 'https://www.liulongbin.top:8888/api/private/v1'
    baseURL: 'http://123.57.143.201:8888/api/private/v1'
});


// 拦截器

// Add a request interceptor   请求拦截器
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    
// 传递请求头
// 先判断下本地是否有token 有就传递  没有就不传递
if(localStorage.getItem('token')){
    config.headers.Authorization=localStorage.getItem('token')
}

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor  响应拦截器
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response,"response")
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default instance;