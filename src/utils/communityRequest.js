import Taro from "@tarojs/taro";

import {BASE_URL} from '../config/commReq'

// 封装一次request，目的是为了更新过期的token
export default function communityRequest(param) {
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

    return Taro.request(param).then(res=>{
      console.log(res);
      if (res.data.code === 401) {
        if (res.data.msg === "need re-auth" && res.data.data.token != null){
          // 更新一次token之后再次发起请求
          localStorage.setItem("token", res.data.data.token);
          // debugger
          return communityRequest(param);
        } else {
          return res;
        }
      } else {
        return res;
      }
    });
  } else {
    Taro.redirectTo({url: "/pages/login/login"});
    return new Promise(function(resolve) {
      resolve({'data':{'code': 401, "msg": "need auth"}});
    });
  }
}
