import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components';
import {AtNavBar, AtInput, AtAvatar, AtSlider, AtSwitch, AtDivider, AtToast} from "taro-ui";

import './mineEdit.scss';
import {commReq} from "../../../../config/commReq";
import {UserController} from "../../../../server/controller/UserController";

export default class index extends Component {
  config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      userInformationVO: {
        nickname: '',
        catWeight: 0,
        dogWeight: 0,
        otherWeight: 0
      },
      max: 100,
      nicknameEditable: false,
      otherPets: false,
      changed: false
    };
  }

  backUpperPage = () => {
    if (this.state.changed) {
      commReq({
        url: UserController.COMMUNITY_API_USER_INFORMATION,
        method: "PUT",
        data: this.state.userInformationVO,
      }).then(res => {
        res = res.data.data;
        if (!res.success) {
          setTimeout(1500);
        }
        Taro.navigateBack({delta: 1});
      })
    } else {
      Taro.navigateBack({delta: 1});
    }
  };

  componentWillMount() {
    let that = this;
    commReq({
      url: UserController.COMMUNITY_API_USER_INFORMATION,
      method: "GET"
    }).then(res => {
      let data = res.data.data.userInformationVO;
      if (data.otherWeight > 0) {
        that.setState({
          otherPets: true
        })
      }
      that.setState({
        userInformationVO: data
      });
    });
  }

  editNickname = () => {
    this.setState({
      nicknameEditable: true
    })
  };

  saveNickname = () => {
    this.setState({
      nicknameEditable: false
    })
  };

  handleChangeNickname(value) {
    const userInformationVO = {
      ...this.state.userInformationVO,
      nickname: value
    };
    this.setState({
      userInformationVO,
      changed: true
    })
  }

  handleChangeWeight(value) {
    if (this.state.userInformationVO.catWeight !== value.value) {
      const userInformationVO = {
        ...this.state.userInformationVO,
        catWeight: value.value,
        dogWeight: this.state.max - value.value,
      };
      this.setState({
        userInformationVO,
        changed: true
      })
    }
  }

  changeOtherPets = () => {
    this.setState({
      otherPets: !this.state.otherPets,
    });
    // 喜欢其他类型的宠物
    if (this.state.otherPets) {
      const userInformationVO = {
        ...this.state.userInformationVO,
        otherWeight: 50
      };
      this.setState({
        userInformationVO,
        changed: true
      })
    } else {
      // 不喜欢其他类型的宠物
      const userInformationVO = {
        ...this.state.userInformationVO,
        otherWeight: 0
      };
      this.setState({
        userInformationVO,
        changed: true
      })
    }
  };

  render() {
    return (
    <View className='editPage'>
      <AtNavBar title='编辑资料' fixed leftIconType='chevron-left' leftText='返回' onClickLeftIcon={this.backUpperPage} />
      <View className='editHolder'>
        <AtDivider content='一般信息设置' fontColor='#CCC' />
        <View className='avatar'>
          <AtAvatar circle text={this.state.userInformationVO.nickname} size='large'/>
        </View>
        <AtInput
          title='昵称'
          editable={this.state.nicknameEditable}
          value={this.state.userInformationVO.nickname}
          onClick={this.editNickname}
          onBlur={this.saveNickname}
          name='nickname'
          onChange={this.handleChangeNickname.bind(this)}
        />
        <AtDivider content='宠物喜好设置' fontColor='#CCC' />
        <View className='propsView'>
          <View className='catView'>猫 {this.state.userInformationVO.catWeight}</View>
          <View className='dogView'>{this.state.userInformationVO.dogWeight} 狗</View>
        </View>
        <AtSlider min={0} max={this.state.max} value={this.state.userInformationVO.catWeight}
          onChanging={this.handleChangeWeight.bind(this)}
        />
        <AtSwitch title='其他类型宠物' checked={this.state.otherPets} onChange={this.changeOtherPets} />
      </View>
    </View>
    );
  }
}
