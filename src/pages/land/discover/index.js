import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtSearchBar} from "taro-ui";

export default class Discover extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  onSearchChange (value) {
    this.setState({
      search: value
    })
  }

  onSearchAction () {
    console.log("搜索了")
  }

  render() {
    return (
      <View>
        <AtSearchBar
          actionName='搜热门'
          value={this.state.search}
          onChange={this.onSearchChange.bind(this)}
          onActionClick={this.onSearchAction.bind(this)}
        />
      </View>
    );
  }
}
