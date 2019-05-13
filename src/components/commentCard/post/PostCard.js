import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtAvatar} from "taro-ui";

import './postCard.scss'

export default class PostCard extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <View className='postCard'>
        <View className='topLine'>
          <View className='avatar'>
            <AtAvatar circle text={this.props.nickname}/>
          </View>
          <View className='rightPart'>
            <View className='name'>{this.props.nickname}</View> <br/>
            <View className='date_location'>
              {this.props.date} {this.props.location}
            </View>
          </View>
        </View>
        <View className='content'>{this.props.content}</View>
      </View>
    );
  }
}
