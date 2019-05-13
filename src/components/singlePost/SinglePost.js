import Taro, {Component, Config} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'

import Head from '../../imgs/head.jpg'

import './singlePost.scss'
import {commReq} from "../../config/commReq";
import {PostController} from "../../server/controller/PostController";
import {AtAvatar} from "taro-ui";
import {router} from "../../config/router";

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

  onComment = () => {
    let params = '?id=' + this.props.postId + '&nickname=' + this.props.nickname + '&date=' + this.props.date +
      '&location=' + this.state.location + '&content=' + this.props.content;
    Taro.navigateTo({url: router.comment + params})
  };

  render() {
    return (
      <View className='everyCard'>
        <View className='topLine'>
          {/*<Image*/}
          {/*src={Head}*/}
          {/*style='width: 60px; height: 60px; margin: 5px 10px 0 5px; border-radius:50%;'*/}
          {/*/>*/}
          <View className='avatar'>
            <AtAvatar circle text={this.props.nickname}/>
          </View>
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
          <View className='btn2 div' onClick={this.onComment}>{this.state.comment}</View>
          <View className='btn3 div' onClick={this.onLike}>{this.state.like}</View>
        </View>
      </View>
    );
  }
}

