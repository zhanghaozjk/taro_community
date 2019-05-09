import Taro, {Component, Config} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'

import Head from '../../imgs/head.jpg'

import './singlePost.scss'
import {commReq} from "../../config/commReq";
import {PostController} from "../../server/controller/PostController";

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

  onLike = () => {
    let id = this.props.postId;
    commReq({
      url: PostController.COMMUNITY_API_POST_LIKE_POST,
      data: {id: id},
      method: "post",
      header: {'content-type': 'application/x-www-form-urlencoded'}
    })
  };

  render() {
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
              {this.props.date} {this.state.location}
            </View>
          </View>
        </View>
        <View className='content'>{this.props.content}</View>
        <View className='bottomLine'>
          <View className='btn1 div'>{this.state.forward}</View>
          <View className='btn2 div'>{this.state.comment}</View>
          <View className='btn3 div' onClick={this.onLike}>{this.state.like}</View>
        </View>
      </View>
    );
  }
}

