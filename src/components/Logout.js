import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtButton} from "taro-ui";

export default class Logout extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  logout = () => {
    localStorage.removeItem("token");
    Taro.redirectTo({url: "/pages/index/index"})
  }

  render() {
    return (
      <View>
        <AtButton type='secondary' size='small' onClick={this.logout}>退出登陆</AtButton>
      </View>
    );
  }
}
