import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtButton, AtGrid, AtLoadMore, AtSearchBar} from "taro-ui";
import {commReq} from "../../../config/commReq";
import {PostController} from "../../../server/controller/PostController";
import SinglePost from "../../../components/singlePost/SinglePost";
import {emptyString, getAliKey, getAliMapUrl} from "../../../utils/ApplicationUtils";

import './discover.scss'
import {ArticleController} from "../../../server/controller/ArticleController";
import ArticleCard from "../../../components/articleCard/ArticleCard";

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
      count: 0,
      moreText: '',
      articles: ''
    }
  }

  onSearchChange(value) {
    this.setState({
      search: value
    })
  }

  onSearchAction() {
    this.loadingArticles(this.state.search);
  }

  loadingArticles = (title) => {
    let {articles, text} = this.state;
    let that = this;
    if (title == null || emptyString(title)) {
      title = "*";
    }
    if (text !== '') {
      this.setState({
        text: ''
      })
    }
    commReq({
      url: ArticleController.COMMUNITY_API_ARTICLE_LIST + title,
      method: "GET"
    }).then(res => {
      articles = res.data.data.articles;
      that.setState({
        index: -1,
        articles: articles
      })
    })
  };

  componentWillMount(): void {
    if (sessionStorage.getItem("currentLocation") == null) {
      let location;
      Taro.request({
        url: getAliMapUrl(),
        data: {
          key: getAliKey()
        },
        method: "GET",
      }).then(res => {
        location = res.data.city;
        sessionStorage.setItem("currentLocation", location);
      });
    }
    this.loadingArticles();
  }

  handleChoice = (item, index) => {
    let that = this;
    let data;
    // 同城推荐
    if (index === 1) {
      let location = sessionStorage.getItem("currentLocation");
      data = {location: location}
    }
    if (index === 0 || index === 1) {
      commReq({
        url: PostController.COMMUNITY_API_POST_ALL_HOT,
        method: "POST",
        data: data,
        header: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(ret => {
        let count = ret.data.data.count;
        let text = ret.data.data.postVoList;
        let more = text.length >= count ? 'noMore' : 'more';
        that.setState({
          text: text,
          count: count,
          moreStatus: more,
          index: index,
          moreText: '加载更多',
          articles: ''
        })
      })
    } else if (index === 2) {
      this.changeUserRecommend();
    }
  };

  loadMore() {
    let that = this;
    that.setState({
      moreStatus: 'loading'
    });
    let data = {start: this.state.text.length};
    let index = this.state.index;
    if (index === 1) {
      let location = sessionStorage.getItem("currentLocation");
      data = {
        ...data,
        location: location
      }
    }
    if (index === 0 || index === 1) {
      commReq({
        url: PostController.COMMUNITY_API_POST_ALL_HOT,
        method: "POST",
        data: data,
        header: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(ret => {
        let count = ret.data.data.count;
        let text = that.state.text.concat(ret.data.data.postVoList);
        let more = text.length >= count ? 'noMore' : 'more';
        that.setState({
          text: text,
          count: count,
          moreStatus: more,
          moreText: '加载更多',
          articles: ''
        })
      })
    } else if (index === 2) {
      this.changeUserRecommend();
    }
  }

  changeUserRecommend = () => {
    let index = 2;
    commReq({
      url: PostController.COMMUNITY_API_POST_ALL_USER_RECOMMEND,
      method: "POST"
    }).then(ret => {
      this.setState({
        text: ret.data.data.postVoList,
        index: index,
        moreText: '换一批',
        moreStatus: 'more',
        articles: ''
      })
    });
  };

  render() {
    let posts = this.state.text ? this.state.text : [];
    let articles = this.state.articles ? this.state.articles : [];
    let postsList = posts.map(function (post, key) {
      return (
        <SinglePost key={key} postId={post.id} nickname={post.userVO.nickname} content={post.content} date={post.date}
                    location={post.location} commentCount={post.commentCount} likeCount={post.likeCount}
                    likePost={post.likePost}
        />)
    });
    let articlesList = articles.map(function (article, key) {
      return (
        <ArticleCard key={key} articleId={article.id} title={article.title} link={article.link} author={article.author}
                     description={article.description} createTime={article.createTime}
        />)
    });
    return (
      <View>
        <AtSearchBar
          actionName='搜索'
          placeholder='搜热门文章'
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
        {
          this.state.index === 2 ?
            <View className='changeRecommend'>
              <AtButton type='secondary' onClick={this.changeUserRecommend}>换一批</AtButton>
            </View>
            : null
        }
        <View className='discover'>
          {posts.length === 0 ? null : (
            <View className='list-holder'>
              <View className='post-list'>
                {postsList}
              </View>
              <AtLoadMore
                onClick={this.loadMore.bind(this)}
                status={this.state.moreStatus}
                moreText={this.state.moreText}
              />
            </View>
          )}
          {articles.length === 0 ? null : (
            <View className='list-holder'>
              <View className='post-list'>
                {articlesList}
              </View>
            </View>
          )}
        </View>
      </View>

    );
  }
}
