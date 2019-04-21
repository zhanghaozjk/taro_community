import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtButton, AtForm, AtIcon, AtInput, AtToast} from "taro-ui";

import {BASE_URL} from "../../config/commReq";
import './regist.scss'
import {UserController} from "../../server/controller/UserController";
import {router} from "../../config/router";
import {checkEmail} from "../../utils/ApplicationUtils";

export default class index extends Component {
  config: Config = {
    navigationBarTitleText: '注册'
  }

  constructor(props) {
    super(props);
    this.state = {
      email: sessionStorage.getItem("username") == null ? '' : sessionStorage.getItem("username"),
      password: '',
      passwordVisible: 'password',
      verifyCode: '',
      username: '',
      atToastShow: false,
      atToastText: '',
      abroadClick: false
    }
  }

  checkEmailExist = () => {
    if (checkEmail(this.state.email)) {
      Taro.request({
        url: BASE_URL + UserController.COMMUNITY_EXPORT_API_EMAIL_CHECK,
        data: {'email': this.state.email},
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
      }).then(res => {
        if (res.data.data.email === this.state.email && res.data.data.exist === false) {
          this.setState({
            abroadClick: false,
            atToastShow: false,
            atToastText: '',
          });
        } else {
          this.setState({
            atToastShow: true,
            atToastText: '该邮箱已经存在',
            abroadClick: true
          })
        }
      })
    } else {
      this.setState({
        atToastShow: true,
        atToastText: '邮箱格式错误',
        abroadClick: true
      })
    }
  };


  render() {
    return (
      <View className='rg-base'>
        <View className='at-article__h1'> 注册 </View>
        <View className='at-article__h2'> 宠物社区 </View>

        <AtForm>
          <AtInput
            name='email'
            title='电子邮件'
            type='text'
            placeholder='请输入您的邮箱'
            value={this.state.email}
            onChange={this.handleChangeEmail.bind(this)}
            className='rg-input'
            onBlur={this.checkEmailExist}
            clear
          />
          <AtInput
            name='password'
            title='密码'
            type={this.state.passwordVisible}
            placeholder='请输入密码'
            value={this.state.password}
            onChange={this.handleChangePassword.bind(this)}
            clear
          >
            <View><AtIcon value='eye' onClick={this.handleChangeVisible} /></View>
          </AtInput>
        </AtForm>
        <AtToast
          isOpened={this.state.atToastShow}
          status='{error}'
          text={this.state.atToastText}
          className='errorToast'
          icon='close'
          onClose={this.errorToast}
        />
        <View className='at-article__info rg-login' onClick={this.toLogin}>已有账户，去登录</View>
        <AtButton type='primary' className='rg-button-register' onClick={this.doRegist}>注册</AtButton>

      </View>
    );
  }

  doRegist = () => {
    if (this.state.abroadClick) {
      this.setState({
        atToastShow: true,
        atToastText: '邮箱不合法'
      });
      return;
    }
    // 第一次请求 请求注册成功/失败
    Taro.request({
      url: BASE_URL + UserController.COMMUNITY_EXPORT_API_USER_EMAIL_REGISTER,
      data: {email: this.state.email, password: this.state.password},
      header: {
        'content-type': 'application/json'
      },
      method: "POST"
    }).then(res => {
      if (res.data.code === 200 && res.data.msg === this.state.email) {
        this.setState({
          // 更新返回的username
          username: res.data.data.username
        });
        // 发起发出邮件的请求
        Taro.request({
          url: BASE_URL + UserController.COMMUNITY_EXPORT_API_USER_EMAIL_REGISTER_SEND_CODE,
          data: {email: this.state.email, password: this.state.password, username: this.state.email},
          header: {
            'content-type': 'application/json'
          },
          method: "POST"
        }).then(anoRes => {
          if (anoRes.data.code === 200 && anoRes.data.msg === this.state.email) {
            Taro.redirectTo({url: router.register_email + '?email=' + this.state.email + "&username=" + this.state.username});
          } else {
            this.setState({
              atToastShow: true,
              atToastText: '注册失败'
            });
          }
        })
      } else {
        this.setState({
          atToastShow: true,
          atToastText: '注册失败'
        });
      }
    })
  };

  toLogin = () => {
    Taro.redirectTo({url: router.login})
  };

  handleChangeEmail(value) {
    this.setState({
      email: value
    });
    sessionStorage.setItem("email", value);
  }

  handleChangePassword(value) {
    this.setState({
      password: value
    })
  }

  handleChangeVisible = () => {
    this.setState({
      passwordVisible: this.state.passwordVisible === 'text' ? 'password' : 'text'
    })
  };

  errorToast = () => {
    this.setState({
      atToastShow: false,
      atToastText: ''
    })
  };
}
