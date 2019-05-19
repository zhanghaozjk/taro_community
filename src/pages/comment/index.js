import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtInput, AtTabs, AtTabsPane, AtToast} from "taro-ui";

import PostCard from "../../components/commentCard/post/PostCard";
import './comment.scss'
import CommentCard from "../../components/commentCard/comment/CommentCard";
import {commReq} from "../../config/commReq";
import {PostController} from "../../server/controller/PostController";
import {emptyString} from "../../utils/ApplicationUtils"

export default class Comment extends Component {
  config: Config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      inputContent: '',
      showToast: false,
      toastText: '',
      showComment: true
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
    if (!emptyString(inputContent)) {
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
            inputContent: '',
            showComment: !that.state.showComment,
          })
        }
      });
    } else {
      this.setState({
        showToast: true,
        toastText: '评论内容不得为空'
      })
    }
  };

  toastClose = () => {
    this.setState({
      showToast: false,
      toastText: ''
    })
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
              <CommentCard key={this.state.showComment?'2':'1'} postId={this.$router.params.id} />
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
          name='inputBox'
        >
          <View onClick={this.addComment}>发送</View>
        </AtInput>
        <AtToast isOpened={this.state.showToast} text={this.state.toastText} icon='close' onClose={this.toastClose} />
        </View>
    );
  }
}

