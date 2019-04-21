import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";

import 'taro-ui/dist/style/index.scss'
import './app.scss'
import Index from "./pages/index";
import {router} from "./config/router"
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   console.log(process.env);
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      '/pages/index',
      '/pages/login',
      '/pages/land/post',
      '/pages/land/post/add',
      '/pages/register',
      '/pages/register/emailCheck'
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
      Taro.redirectTo({url: router.login})
    } else {
      Taro.redirectTo({url: router.post})
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

Taro.render(<App />, document.getElementById('app'));
