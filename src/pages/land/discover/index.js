import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtGrid, AtLoadMore, AtSearchBar} from "taro-ui";
import {commReq} from "../../../config/commReq";
import {PostController} from "../../../server/controller/PostController";
import SinglePost from "../../../components/singlePost/SinglePost";

export default class Discover extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      index: 0,
      text: '',
      count: 0
    }
  }

  onSearchChange(value) {
    this.setState({
      search: value
    })
  }

  onSearchAction() {
    console.log("搜索了")
  }

  handleChoice = (item, index) => {
    let that = this;
    if (index === 0) {
      commReq({
        url: PostController.COMMUNITY_API_POST_ALL_HOT,
        method: "POST",
      }).then(ret => {
        let count = ret.data.data.count;
        let text = ret.data.data.postVoList;
        let more = count >= text.length ? 'more' : 'noMore';
        that.setState({
          text: text,
          count: count,
          moreStatus: more
        })
      })
    } else if (index === 1) {
      // todo 同城推荐
    }  else if (index === 2) {
      // todo 对我推荐
    }
  }

  loadMore() {

  }

  render() {
    let posts = this.state.text ? this.state.text : [];

    let postsList = posts.map(function (post, key) {
      return (
        <SinglePost key={key} postId={post.id} nickname={post.userVO.nickname} content={post.content} date={post.date}
                    location={post.location}
                    commentCount={post.commentCount} likeCount={post.likeCount} likePost={post.likePost}
        />)
    });
    return (
      <View>
        <AtSearchBar
          actionName='搜热门'
          value={this.state.search}
          onChange={this.onSearchChange.bind(this)}
          onActionClick={this.onSearchAction.bind(this)}
        />
        <AtGrid
          mode='rect'
          data={[
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
              value: '热门推荐'
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              value: '同城推荐'
            },
            {
              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
              value: '对我推荐'
            },
          ]}
          onClick={this.handleChoice}
        />
        {posts.length === 0 ? null : (
          <View className='list-holder'>
            <View className='post-list'>
              {postsList}
            </View>
            <AtLoadMore
              onClick={this.loadMore.bind(this)}
              status={this.state.moreStatus}
            />
          </View>
        )}
      </View>

    );
  }
}
