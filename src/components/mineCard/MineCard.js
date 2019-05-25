import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtAvatar} from "taro-ui";

import './mineCard.scss'
import {commReq} from "../../config/commReq";
import {router} from "../../config/router";
import {PostController} from "../../server/controller/PostController";

export default class MineCard extends Component {
  config: Config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.username,
      mineUserVO: {
        nickname: '',
        description: '用一句话介绍自己',
        postCount: '',
        followersCount: '',
        followingCount: ''
      }
    }
  }

  componentWillMount(): void {
    let data = {username: this.state.user};
    data = JSON.parse(JSON.stringify(data));
    commReq({
      url: PostController.COMMUNITY_API_POST_USER_INFORMATION,
      method: "POST",
      data: data,
      header: {'content-type': 'application/x-www-form-urlencoded'}
    }).then(res => {
      this.setState({
        mineUserVO: res.data.data.mineUserVO
      })
    });
  }

  editInfo =() => {
    Taro.navigateTo({url: router.mine_edit})
  }

  render() {
    return (
      <View className='mineCard'>
        <View className='upperLine' onClick={this.editInfo}>
          <View className='avatar'>
              <AtAvatar circle text={this.state.mineUserVO.nickname} size='large' />
          </View>
          <View className='name'>{this.state.mineUserVO.nickname}</View>

        </View>
        <View className='bottomLine'>
          <View className='btn1 div'>
            <View className='up'>{this.state.mineUserVO.postCount}</View>
            <View className='down'>推送</View>
          </View>
          <View className='btn2 div'>
            <View className='up'>{this.state.mineUserVO.followersCount}</View>
            <View className='down'>关注者</View>
          </View>
          <View className='btn3 div' onClick={this.onLike}>
            <View className='up'>{this.state.mineUserVO.followingCount}</View>
            <View className='down'>关注</View>
          </View>
        </View>
      </View>
    );
  }
}
