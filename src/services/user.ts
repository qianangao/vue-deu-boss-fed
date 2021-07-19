import request from "@/utils/request";
import qs from "qs";

interface User {
  phone: string;
  password: string;
}
/**
 *
 * @param data
 * 用户模块接口
 */
export const login = (data: User) => {
  return request({
    method: "post",
    url: "/front/user/login",
    // headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  });
};
export const getUserInfo = () => {
  return request({
    method: "get",
    url: "/front/user/getInfo"
  });
};
// 分页查询用户信息
export const getUserList = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/user/getUserPages',
    data
  })
}
