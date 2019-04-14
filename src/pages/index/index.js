import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  };

  componentDidMount(): void {
    if (localStorage.getItem('token') != null) {
      Taro.redirectTo({url: "/pages/login/login"})
    } else {
      Taro.redirectTo({url: "/pages/post/post"})
    }
  }

  render () {
    return (
      <View className='index'>
      </View>
    )
  }
}
