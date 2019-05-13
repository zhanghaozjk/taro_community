import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtNavBar, AtList, AtListItem} from "taro-ui";

export default class index extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  backUpperPage() {
    Taro.navigateBack({delta: 1})
  }

  componentWillUnmount(): void {
    alert("destroy")
  }

  render() {
    return (
      <View>
        <AtNavBar
          title='编辑资料'
          fixed
          leftIconType='chevron-left'
          leftText='返回'
          onClickLeftIcon={this.backUpperPage}
        />
      </View>
    );
  }
}
