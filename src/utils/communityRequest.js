import Taro from "@tarojs/taro";

// 封装一次request，目的是为了更新过期的token
function communityRequest(param) {
  const defaultUrl = 'http://localhost:8080/';
  let authorization = localStorage.getItem("authorization");
  if (authorization != null) {
    //param....
    const defaultParam = {
      header: {
        'content-type': 'application/json'
      }
    };
    param = {
      ...defaultParam,
      ...param,
    };

    // 对url做一层封装
    param.url = (param.url === null || param.url.indexOf(defaultUrl) === -1) ?  defaultUrl + param.url : defaultUrl;

    Taro.request(param).then(
      res => {
        if (res.data.code === 401) {
          if (res.data.msg === "need re-auth" && res.data.data.token != null){
            // 更新一次token之后再次发起请求
            localStorage.setItem("token", res.data.data.token);
            communityRequest(param);
          } else {
            return res;
          }
        } else {
          return res;
        }
      }
    );
  } else {
    return {'data':{'code': 401, "msg": "need auth"}}
  }
}
