import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtList, AtListItem} from "taro-ui";

import './commentCard.scss'
import {commReq} from "../../../config/commReq";
import {PostController} from "../../../server/controller/PostController";

export default class CommentCard extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      comment: []
    }
  }

  componentWillMount(): void {
    commReq({
      url: PostController.COMMUNITY_API_POST_COMMENT_GET + this.props.postId
    }).then(res => {
      this.setState({
        comment: res.data.data.postComment.comment
      })
    })
  }

  render() {
    let commentList = this.state.comment.map(function (comment, key) {
      return (<AtListItem key={key} title={comment.nickname} note={comment.content} />)
    });

    return (
      <View className='commentCard'>
        <AtList>
          {commentList}
        </AtList>
      </View>
    );
  }
}
