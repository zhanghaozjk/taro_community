import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'

import {AtCard} from "taro-ui";
import './articleCard.scss'

export default class ArticleCard extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  jump2WeChatArticle = () => {
    Taro.navigateTo({url: this.props.link})
  };

  render() {
    return (
      <View>
        <View className='article-card' onClick={this.jump2WeChatArticle}>
          <AtCard
            note={this.props.createTime}
            extra={this.props.author}
            title={this.props.title}
          >
            {this.props.description}
          </AtCard>
        </View>
      </View>
    );
  }
}
