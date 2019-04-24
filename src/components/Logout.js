import Taro, {Component, Config} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {AtButton} from "taro-ui";
import {router} from "../config/router";
import {BASE_URL} from "../config/commReq";
import {UserController} from "../server/controller/UserController";

export default class Logout extends Component {
  config: Config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  logout = () => {
    localStorage.removeItem("token");
    Taro.request({
      url: BASE_URL + UserController.COMMUNITY_EXPORT_API_USER_LOGOUT,
      method: "POST"
    });
    Taro.redirectTo({url: router.index})
  };

  render() {
    return (
      <Text>
        <AtButton type='secondary' size='small' onClick={this.logout}>退出登陆</AtButton>
      </Text>
    );
  }
}
