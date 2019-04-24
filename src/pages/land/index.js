import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtTabBar} from "taro-ui";
import Post from "./post/index";
import Discover from "./discover/index";
import Mine from "./mine/index";

import './land.scss'

export default class Land extends Component {
  config: Config = {
    navigationBarTitleText: '猫猫狗狗'
  };
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  render() {
    const current = this.state.current;
    let show = null;
    if(current === 0) {
      show = <Post />
    } else if (current === 1) {
      show = <Discover />
    } else if (current === 2) {
      show = <Mine />
    }
    return (
      <View className='window'>
        {show}
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
      </View>
    );
  }
}
