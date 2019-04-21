import Taro, {Component, Config} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {AtButton} from "taro-ui";
import {router} from "../config/router";

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
