import Taro, {Component, Config} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'

import Head from '../imgs/head.jpg'
import Location from '../imgs/location.png'

import './singlePost.scss'

export default class SinglePost extends Component {
  config: Config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      avatar: '', //头像
      nickname: '',
      date: '',
      location: '杭州市',
      content: props.data,
      forward: '转发',
      comment: '评论',
      like: '点赞'
    }
  }

  render() {
    // console.log(this.props.data);
    return (
      <View className='everyCard'>
        <View className='topLine'>
          <Image
            src={Head}
            style='width: 60px; height: 60px; padding: 5px 10px 0 5px;'
          />
          <View className='rightPart'>
            <View className='name'>{this.props.nickname}</View> <br/>
            <View className='date_location'>
              {this.props.date}
              {/*<Image*/}
                {/*src={Location}*/}
                {/*style='width: 12px;height: 12px;position: relative;top: 2px;left: 2px;padding: 20px 10px 0 10px; '*/}
              {/*/>*/}
              {this.state.location}
            </View>
          </View>
        </View>
        <View className='content'>{this.props.content}</View>
        <View className='bottomLine'>
          <View className='btn1 div'>转发</View>
          <View className='btn2 div'>评论</View>
          <View className='btn3 div'>点赞</View>
        </View>
      </View>
    );
  }
}

