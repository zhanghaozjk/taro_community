import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class test extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }
  componentDidMount(): void {
    Taro.request({
      url: ""
    })
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
