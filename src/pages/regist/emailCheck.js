import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './regist.scss'
import {AtButton, AtForm, AtIcon, AtInput, AtToast} from "taro-ui";
import {BASE_URL} from "../../config/commReq";

export default class emailCheck extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      email: this.$router.params.email,
      username: this.$router.params.username,
      verifyCode: '',
      atToastShow: false,
      atToastText: '',
      regSuccess: false
    }
  }

  handleChangeVerifyCode(value) {
    this.setState({
      verifyCode: value
    })
  }

  doVerify = () => {
    Taro.request({
      url: BASE_URL + "community/export/api/user/email/register/verify",
      data: {'email': this.state.email, 'username': this.state.username, 'verifyCode': this.state.verifyCode},
      header: {
        'content-type': 'application/json'
      },
      method: "POST"
    }).then(res => {
      if (res.data.data.email === this.state.email && res.data.data.verify === true) {
        this.setState({
          atToastText: '注册成功，请登录',
          regSuccess: true
        })
      } else {
        this.setState({
          atToastShow: true,
          atToastText: '注册失败，请重试'
        })
      }
    })
  };

  errorToast = () => {
    if (this.state.regSuccess === true) {
      Taro.redirectTo({url: "/pages/index/index"})
    } else {
      this.setState({
        atToastShow: false,
        atToastText: ''
      })
    }
  };

  reMail = () => {
    // 发起发出邮件的请求
    Taro.request({
      url: BASE_URL + "community/export/api/user/email/register/send/code",
      data: {email: this.state.email, password: this.state.password, username: this.state.username},
      header: {
        'content-type': 'application/json'
      },
      method: "POST"
    }).then(anoRes => {
      if (anoRes.data.code === 200 && anoRes.data.msg === this.state.email) {
        Taro.redirectTo({url: '/pages/regist/emailCheck?email=' + this.state.email + "&username=" + this.state.username});
      } else {
        this.setState({
          atToastShow: true,
          atToastText: '注册失败'
        });
      }
    })
  };

  backRegister = () => {
    Taro.redirectTo({
      url: "/pages/regist/regist"
    })
  }

  render() {
    return (
      <View className='rg-base'>
        <View className='at-article__h1'> <AtIcon value='chevron-left' onClick={this.backRegister} /> 注册</View>
        <View className='at-article__h2'> 最后一步：您还需要邮箱验证 </View>
        <View className='at-article__p'> 已将注册邮件发送至您的邮箱: </View>
        <View className='at-article__h3 rg-email'> {this.state.email} </View>
        <AtForm>
          <AtInput
            name='verifyCode'
            title='验证码'
            type='text'
            placeholder='请输入您收到的验证码'
            maxLength='6'
            value={this.state.verifyCode}
            onChange={this.handleChangeVerifyCode.bind(this)}
            className='rg-input'
          />
        </AtForm>
        <View className='at-article__info rg-login' onClick={this.reMail}>未收到邮件，点击重新发送</View>
        <AtButton type='primary' className='rg-button-register' onClick={this.doVerify}>验证</AtButton>
        <AtToast
          isOpened={this.state.atToastShow}
          status='error'
          text={this.state.atToastText}
          className='errorToast'
          icon='close'
          onClose={this.errorToast}
        />
        <AtToast
          isOpened={this.state.regSuccess}
          text={this.state.atToastText}
          icon='check'
          status='success'
          onClose={this.errorToast}
        />
      </View>
    );
  }
}
