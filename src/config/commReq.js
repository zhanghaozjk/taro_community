import Taro from '@tarojs/taro'
import {router} from "./router";
import {UserController} from "../server/controller/UserController";

// export const BASE_URL = 'http://47.103.6.12:8080/';
export const BASE_URL = 'http://localhost:8080/';

export function commReq(param) {
  const defaultUrl = BASE_URL;
  let authorization = localStorage.getItem("token");
  if (authorization != null) {
    //param....
    const defaultHeader = {
      'content-type': 'application/json',
    };
    param.header = {
      ...defaultHeader,
      ...param.header,
      'Authorization': authorization
    };

    // 对url做一层封装
    if (param.url === null) {
      param.url = defaultUrl;
    } else {
      if (param.url.indexOf(defaultUrl) === -1) {
        param.url = defaultUrl + param.url
      }
    }

    param = {
      ...param,
    };

    return Taro.request(param).then(res => {
      if (res.data.code === 401) {
        if (res.data.msg === "need re-auth" && res.data.data.token != null) {
          // 更新一次token之后再次发起请求
          localStorage.setItem("token", res.data.data.token);
          return commReq(param);
        } else {
          return res;
        }
      } else {
        return res;
      }
    });
  } else {
    // todo 更新token 覆盖promise
    Taro.redirectTo({url: router.login});
    return new Promise(function (resolve) {
      resolve({'data': {'code': 401, "msg": "need auth"}});
    });
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  Taro.request({
    url: BASE_URL + UserController.COMMUNITY_EXPORT_API_USER_LOGOUT,
    method: "POST"
  });
  Taro.redirectTo({url: router.index});
}
