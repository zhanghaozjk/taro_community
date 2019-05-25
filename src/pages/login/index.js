import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtButton, AtForm, AtInput, AtToast} from "taro-ui";

import './login.scss'
import {BASE_URL} from '../../config/commReq'
import {UserController} from "../../server/controller/UserController";
import {router} from "../../config/router";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem("username") == null ? "": sessionStorage.getItem("username"),
      password: '',
      atToastShow: false,
      atToastText: '',
    }
  }

  config: Config = {
    navigationBarTitleText: '登陆'
  };

  // 登陆逻辑
  doLogin = () => {
    if (this.state.username === '') {
      this.showLoginErrorToast("用户名不得为空");
      return;
    }

    if (this.state.password === '') {
      this.showLoginErrorToast("密码不得为空");
      return;
    }

    // 登陆
    Taro.request({
      url: BASE_URL + UserController.COMMUNITY_EXPORT_API_USER_LOGIN,
      data: {'username': this.state.username, 'password': this.state.password},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST"
    }).then(res => {
      // 正常情况登陆
      if (res.data.code === 200 && res.data.data.token != null) {
        localStorage.setItem("token", res.data.data.token),
        Taro.redirectTo({
          url: router.land
        })
      } else if(res.data.code === 200 && res.data.data.status ==="0") {
        // 邮箱需要验证逻辑
        // 发起发出邮件的请求
        Taro.request({
          url: BASE_URL + UserController.COMMUNITY_EXPORT_API_USER_EMAIL_REGISTER_SEND_CODE,
          data: {email: res.data.data.email, username: res.data.data.username},
          header: {
            'content-type': 'application/json'
          },
          method: "POST"
        });
        Taro.redirectTo({
          url: router.register_email + '?username='+res.data.data.username+"&email="+res.data.data.email
        })
      } else if (res.data.code === 401 && res.data.msg === "Unauthorized") {
        this.showLoginErrorToast("用户名或密码错误");
      }
    });
  };


  render() {
    return (
      <View className='lg-base'>
        <View className='at-article__h1'> 欢迎 </View>
        <View className='at-article__h2'> 登陆到宠物社区 </View>

        <AtForm>
          <AtInput
            name='username'
            title='用户名'
            type='text'
            placeholder='请输入用户名'
            value={this.state.username}
            onChange={this.handleChangeUsername.bind(this)}
            className='lg-input'
            clear
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='请输入密码'
            value={this.state.password}
            onChange={this.handleChangePassword.bind(this)}
            clear
          />
          <AtToast
            isOpened={this.state.atToastShow}
            status='{error}'
            text={this.state.atToastText}
            className='errorToast'
            icon='close'
            onClose={this.errorToast}
          />
        </AtForm>
        <AtButton type='primary' className='lg-button-login' onClick={this.doLogin}>登陆</AtButton>
        <AtButton type='secondary' className='lg-button-register' onClick={this.toRegist}>注册</AtButton>
      </View>
    );
  }


  handleChangeUsername(value) {
    this.setState({
      username: value
    });
    sessionStorage.setItem("username", value);
    localStorage.setItem("username", value);
    return value
  }


  handleChangePassword(value) {
    this.setState({
      password: value
    });
    return value
  }


  showLoginErrorToast(text) {
    this.setState({
      atToastShow: true,
      atToastText: text,
      password: ''
    });
  }

  errorToast = () => {
    this.setState(({
      atToastShow: false,
      atToastText: '',
    }))
  };

  toRegist = () => {
    Taro.redirectTo({url: router.register})
  };
}
