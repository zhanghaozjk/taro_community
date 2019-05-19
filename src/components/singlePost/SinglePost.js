import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './singlePost.scss'
import {commReq} from "../../config/commReq";
import {PostController} from "../../server/controller/PostController";
import {AtAvatar, AtIcon} from "taro-ui";
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
      like: this.props.likePost,
      heart: this.props.likePost? 'heart-2': 'heart',
    }
  }

  onLike = () => {
    let id = this.props.postId;
    let that = this;
    if (!this.state.like) {
      commReq({
        url: PostController.COMMUNITY_API_POST_LIKE_POST,
        data: {id: id},
        method: "post",
        header: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        if (res.data.data.success) {
          that.setState({
            like: true,
            heart: 'heart-2'
          });
          that.props.likeCount++;
        }
      })
    } else {
      commReq({
        url: PostController.COMMUNITY_API_POST_UNLIKE_POST,
        data: {id: id},
        method: "post",
        header: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        if (res.data.data.success) {
          that.setState({
            like: false,
            heart: 'heart'
          });
          that.props.likeCount--;
        }
      })
    }

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
        <View className='bottomLine'>
          <View className='btn1 div'>
            <AtIcon value='external-link' size='18' />
          </View>
          {/*<View className='btn2 div' onClick={this.onComment}>{this.state.comment}</View>*/}
          <View className='btn2 div' onClick={this.onComment}>
            <AtIcon value='message' size='20' /> {this.props.commentCount}
          </View>
          <View className='btn3 div' onClick={this.onLike}>
            <AtIcon value={this.state.heart} size='20' /> {this.props.likeCount}
          </View>
        </View>
      </View>
    );
  }
}

