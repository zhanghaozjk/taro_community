import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtActionSheet, AtActionSheetItem, AtLoadMore, AtNavBar} from "taro-ui";

import {commReq, logout} from "../../../config/commReq";
import SinglePost from "../../../components/singlePost/SinglePost";

import {PostController} from "../../../server/controller/PostController";
import {router} from "../../../config/router";
import MineCard from "../../../components/mineCard/MineCard";

export default class Post extends Component {
  config: Config = {
    navigationBarTitleText: '社区'
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      bottomOpened: false,
      count: 0,
      moreStatus: 'more'
    }
  }

  componentWillMount(): void {
    commReq({
      url: PostController.COMMUNITY_API_POST_GET_POST_ALL,
      method: "POST",
      data: {username: localStorage.getItem("username")},
      header: {'content-type': 'application/x-www-form-urlencoded'}
    }).then(ret => {
      let count = ret.data.data.count;
      let text = ret.data.data.postVoList;
      let more = count >= text.length ? 'more' : 'noMore';
      this.setState({
        text: text,
        count: count,
        moreStatus: more
      })
    });
  }

  loadMore () {
    let that = this;
    this.setState({
      moreStatus: 'loading'
    });
    // 开始加载
    commReq({
      url: PostController.COMMUNITY_API_POST_GET_POST_ALL,
      method: "POST",
      data: {start: this.state.text.length, username: localStorage.getItem("username")},
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      let text = that.state.text.concat(res.data.data.postVoList);
      let more = text.length >= that.state.count ? 'noMore' : 'more';
      that.setState({
        text: text,
        moreStatus: more
      })
    });
  }

  toAddPage() {
    Taro.navigateTo({url: router.post_add})
  }

  showBottom = () => {
    this.setState({
      bottomOpened: true
    })
  };

  cancelBottom = () => {
    this.setState({
      bottomOpened: false
    })
  };

  showBottom = () => {
    this.setState({
      bottomOpened: true
    })
  };

  cancelBottom = () => {
    this.setState({
      bottomOpened: false
    })
  };



  render() {
    let posts = this.state.text ? this.state.text : [];

    let postsList = posts.map(function (post, key) {
      return (<SinglePost key={key} postId={post.id} nickname={post.userVO.nickname} content={post.content} date={post.date} location={post.location}
        commentCount={post.commentCount} likeCount={post.likeCount} likePost={post.likePost}
      />)
    });

    return (
      <View>
        <AtNavBar
          title='我 的'
          fixed
          rightFirstIconType='add'
          rightSecondIconType='user'
          onClickRgIconSt={this.toAddPage}
          onClickRgIconNd={this.showBottom}
        />
        <View className='list-holder'>
          <MineCard />
          <View className='post-list'>
            {postsList}
          </View>
          <AtLoadMore
            onClick={this.loadMore.bind(this)}
            status={this.state.moreStatus}
          />
        </View>
        <AtActionSheet isOpened={this.state.bottomOpened} cancelText='取消' title='用户管理' onCancel={this.cancelBottom}>
          <AtActionSheetItem onClick={logout}>
            退出登录
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}
