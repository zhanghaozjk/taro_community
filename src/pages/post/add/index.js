import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtList, AtListItem, AtNavBar, AtTextarea} from "taro-ui";

import './index.scss'
import emptyString from "../../../utils/ApplicationUtils";
import {commReq} from '../../../config/commReq'

export default class AddPost extends Component {
  config: Config = {
    // navigationBarTitleText: '添加'
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      maxLength: 200
    }
  }

  textHandler(event) {
    this.setState({
      content: event.target.value
    })
  };

  iconInfoLocation = {value: 'map-pin'};
  iconInfoBlock = {value: 'user'};
  iconInfoMention = {value: 'streaming'};

  backUpperPage() {
    Taro.navigateBack({delta: 1})
  }

  postMessage = () => {
    if (emptyString(this.state.content)) {
      alert('内容为空不得提交')
    } else {
      commReq({
        url: 'community/api/post/put/new/post',
        method: 'PUT',
        data: {content: this.state.content}
      }).then((res) => {
        if (res.data.data.success === true) {
          this.backUpperPage()
        } else {
          alert("内容提交失败")
        }
      })
    }
  };

  render() {
    return (
      <View>
        <View>
          <AtNavBar
            fixed
            leftIconType='chevron-left'
            leftText='返回'
            title='发表消息'
            rightFirstIconType='check'
            onClickLeftIcon={this.backUpperPage}
            onClickRgIconSt={this.postMessage}
          />
        </View>
        <View className='text_area'>
          <AtTextarea className='text_box'
                      value={this.state.content}
                      maxLength={this.state.maxLength}
                      onChange={this.textHandler.bind(this)}
                      placeholder='这一刻的想法...'
                      fixed
                      height='350'
          />
          <View className='test_area_list'>
            <AtList hasBorder>
              <AtListItem title='所在位置' arrow='right' iconInfo={this.iconInfoLocation}/>
              <AtListItem title='谁可以看' arrow='right' extraText='公开' iconInfo={this.iconInfoBlock}/>
              <AtListItem title='提醒谁看' arrow='right' iconInfo={this.iconInfoMention}/>
            </AtList>
          </View>
        </View>
      </View>
    );
  }
}
