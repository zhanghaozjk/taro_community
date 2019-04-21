import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'

import {commReq} from "../../config/commReq";
import SinglePost from "../../components/SinglePost";
import {AtActionSheet, AtActionSheetItem, AtNavBar, AtTabBar} from "taro-ui";

import "./post.scss"

export default class Post extends Component {
  config: Config = {
    navigationBarTitleText: '社区'
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      current: 0,
      bottomOpened: false
    }
  }

  handleClick(value) {
    console.log(value);
    this.setState({
      current: value
    })
  }

  componentWillMount(): void {

  }

  componentDidShow(): void {
    commReq({
      url: "community/api/post/get/post/all",
      method: "POST"
    }).then(ret => {
      this.setState({
        text: ret.data.data
      })
      // debugger
    });
  }

  toAddPage() {
    Taro.navigateTo({url: "/pages/post/add"})
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

  logout = () => {
    localStorage.removeItem("token");
    Taro.redirectTo({url: "/pages/index/index"})
  };

  render() {
    console.log(this.state.text);
    let posts = this.state.text ? this.state.text : [];

    let postsList = posts.map(function (post, key) {
      return (<SinglePost key={key} nickname={post.userVO.nickname} content={post.content} date='2019'/>)
    });

    return (
      <View className='window'>
        <AtNavBar
          title='关注'
          fixed
          rightFirstIconType='add'
          rightSecondIconType='user'
          onClickRgIconSt={this.toAddPage}
          onClickRgIconNd={this.showBottom}
        />
        <View className='list-holder'>
          <View className='post-list'>
            {postsList}
          </View>
          <View className='at-article__info'>- 到底了 -</View>
        </View>
        <AtTabBar
          className='tab-bar'
          fixed
          tabList={[
            {title: '首页', iconType: 'home'},
            {title: '发现', iconType: 'search'},
            {title: '我的', iconType: 'user'}
          ]}
          current={this.state.current}
          onClick={this.handleClick.bind(this)}
        />
        <AtActionSheet isOpened={this.state.bottomOpened} cancelText='取消' title='用户管理' onCancel={this.cancelBottom}>
          <AtActionSheetItem onClick={this.logout}>
            退出登录
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}
