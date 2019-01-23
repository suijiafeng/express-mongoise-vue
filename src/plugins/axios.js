"use strict";

import Vue from 'vue';
import axios from "axios";
import { Message, Loading } from 'element-ui';



// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
let loading 
function startLoading(){
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
})
}
function endLoading(){
  loading.close()
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    //加载
    startLoading()
    if(localStorage.eleToken){
    let AUTH_TOKEN = localStorage.getItem('eleToken')
    config.headers.Authorization= AUTH_TOKEN
    console.log("请求拦截")
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);

    const {status} = error.response
    if(status==401){
      Message.error("token存在，请重新登录")
      router.push('/login')
    }
  }
);

function auth (){
   _axios.get("http://localhost:3000/users/userList",{name:1233321}).then(res=>{
      console.log("dddd",res)
    }).catch(err=>{
      console.log('err',err)
    })
}

// Add a response interceptor
_axios.interceptors.response.use(
  
  function(response) {
    endLoading()
    // Do something with response data
   
    // auth()
    console.log("看看response",response)
    return response;
  },
  function(error) {
    endLoading()
    Message.error(error.response.data)
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
