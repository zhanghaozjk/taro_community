import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class SinglePost extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <View>

      </View>
    );
  }
}
