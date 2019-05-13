import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtInput, AtTabs, AtTabsPane} from "taro-ui";

import PostCard from "../../components/commentCard/post/PostCard";
import './comment.scss'
import CommentCard from "../../components/commentCard/comment/CommentCard";
import {commReq} from "../../config/commReq";
import {PostController} from "../../server/controller/PostController";

export default class Comment extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      inputContent: ''
    }
  }

  tabHandle(value) {
    this.setState({
      current: value
    })
  }

  handleChangeInput(value) {
    this.setState({
      inputContent: value
    })
  }

  addComment =() => {
    let inputContent = this.state.inputContent;
    const that=this;
    commReq({
      url: PostController.COMMUNITY_API_POST_COMMENT_ADD,
      data: {postId: this.$router.params.id, comment: inputContent},
      method: 'PUT',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.data.success === true) {
        that.setState({
          inputContent: ''
        })
      }
    });
  };

  render() {
    return (
      <View className='commentPage'>
        <PostCard postId={this.$router.params.id} nickname={this.$router.params.nickname}
                  date={this.$router.params.date} location={this.$router.params.location}
                  content={this.$router.params.content}
        />
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            {title: '评论'},
            {title: '转发'},
          ]}
          onClick={this.tabHandle.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View>
              <CommentCard postId={this.$router.params.id} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='font-size:18px;text-align:center;height:100px;'>转发的内容</View>
          </AtTabsPane>
        </AtTabs>
        <AtInput placeholder='友善的言论会让社区更美好哦～'
                 border={false}
                 value={this.state.inputContent}
                 onChange={this.handleChangeInput.bind(this)}
        >
          <View onClick={this.addComment}>发送</View>
        </AtInput>
        </View>
    );
  }
}

