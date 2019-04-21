import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {router} from "../../config/router";

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  };

  componentDidMount(): void {
    if (localStorage.getItem('token') == null) {
      Taro.redirectTo({url: router.login})
    } else {
      Taro.redirectTo({url: router.post})
    }
  }

  render () {
    return (
      <View />
    )
  }
}
