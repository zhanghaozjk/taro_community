import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";

import 'taro-ui/dist/style/index.scss'
import './app.scss'
import Index from "./pages/index";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   console.log(process.env);
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/login/login',
      '/pages/post/post',
      '/pages/post/add',
      '/pages/regist/regist',
      '/pages/regist/emailCheck'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount() {
    if (localStorage.getItem('token') == null) {
      Taro.redirectTo({url: "/pages/login/login"})
    } else {
      Taro.redirectTo({url: "/pages/post/post"})
    }
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <View>
        <Index />
      </View>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
