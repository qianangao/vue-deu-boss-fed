import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";
import qs from "qs";
const request = axios.create({});

function redirectLogin () {
  router.push({
    name: "login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

function refreshToken () {
  return axios.create()({
    method: "post",
    url: "/front/user/refresh_token",
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  });
}

request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { user } = store.state;
    if (user && user.access_token) {
      config.headers.Authorization = user.access_token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 添加响应拦截器
let isRefreshing = false
let requests: any[] = []
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  async function (error) {
    if (error.response) {
      // 请求发出去了收到响应了，但是状态码超过2xx范围了
      const { status } = error.response;
      if (status === 400) {
        Message.error("请求参数错误");
      } else if (status === 401) {
        // token无效(没有提供token，token是无效的，token过期了)
        // 如果有refresh_token则尝试使用refresh_token获取新的access_token

        if (!store.state.user) {
          redirectLogin();
          return Promise.reject(error);
        }
        if (!isRefreshing) {
          isRefreshing = true
          refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新Token失败！')
            }
            store.commit('setUser', res.data.content)
            requests.forEach(cb => cb())
            requests = []
            return request(error.config)
          }).catch(err => {
            console.log(err);
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRefreshing = false // 重置刷新状态
          })
        }
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
        // try {
        //   const { data } = await axios.create()({
        //     method: "post",
        //     url: "/front/user/refresh_token",
        //     data: qs.stringify({
        //       refreshtoken: store.state.user.refresh_token
        //     })
        //   });
        //   store.commit('setUser', data.content)
        //   return request(error.config)
        // } catch (error) {
        //   redirectLogin()
        //   return Promise.reject(error)
        // }
      } else if (status === 403) {
        Message.error("没有权限，请联系管理员");
      } else if (status === 404) {
        Message.error("请求资源不存在");
      } else if (status >= 500) {
        Message.error("服务端错误，请联系管理员");
      }
    } else if (error.request) {
      // 请求发出去没有收到响应
      Message.error("请求超时，请刷新重试！");
    } else {
      // 请求时触发了一个错误
      Message.error(`请求失败：${error.message}`);
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
