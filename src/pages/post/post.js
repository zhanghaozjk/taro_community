import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'

import Logout from "../../components/Logout";
import {commReq} from "../../config/commReq";

export default class Post extends Component {
  config: Config = {
    navigationBarTitleText: '社区'
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentDidMount(): void {
    commReq({
      url: "community/api/post/get/post/all"
    }).then(ret => {
      console.log(ret)
      this.setState({
        text: ret.data.data
      })
      // debugger
    });
  }

  render() {
    return (
      <View>
        <View className='at-article__h2'> 这里是post界面 </View>
        <View className='at-article__h2'>{this.state.text}</View>
        <Logout />
      </View>
    );
  }
}
