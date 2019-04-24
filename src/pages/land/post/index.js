import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtActionSheet, AtActionSheetItem, AtNavBar} from "taro-ui";

import {commReq, logout} from "../../../config/commReq";
import SinglePost from "../../../components/SinglePost";

import {PostController} from "../../../server/controller/PostController";
import {router} from "../../../config/router";

export default class Post extends Component {
  config: Config = {
    navigationBarTitleText: '社区'
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      bottomOpened: false
    }
  }

  componentWillMount(): void {
    commReq({
      url: PostController.COMMUNITY_API_POST_GET_POST_ALL,
      method: "POST"
    }).then(ret => {
      this.setState({
        text: ret.data.data.postVoList
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

  render() {
    let posts = this.state.text ? this.state.text : [];

    let postsList = posts.map(function (post, key) {
      return (<SinglePost key={key} nickname={post.userVO.nickname} content={post.content} date='2019' />)
    });
    {/*<View className='window'>*/}

    return (
      <View>
        <AtNavBar
          title='关注'
          fixed
          rightFirstIconType='add'
          rightSecondIconType='user'
          onClickRgIconSt={this.toAddPage}
        />
        <View className='list-holder'>
          <View className='post-list'>
            {postsList}
          </View>
          <View className='at-article__info'>- 到底了 -</View>
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