import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtList, AtListItem, AtNavBar, AtTag, AtTextarea} from "taro-ui";

import './add_post.scss'
import {commReq} from '../../../../config/commReq'
import {PostController} from "../../../../server/controller/PostController";
import {emptyString, getAliKey, getAliMapUrl} from "../../../../utils/ApplicationUtils";

export default class AddPost extends Component {
  config: Config = {
    // navigationBarTitleText: '添加'
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      maxLength: 200,
      location: '所在位置',
      tagSelected: {
        cat: false,
        dog: false
      },
      tag: []
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

  aliLocation = () => {
    Taro.request({
      url: getAliMapUrl(),
      data: {
        key: getAliKey()
      },
      method: "GET",
    }).then(res => {
      this.setState({
        location: res.data.city
      })
    })
  };

  postMessage = () => {
    if (emptyString(this.state.content)) {
      alert('内容为空不得提交')
    } else {
      commReq({
        url: PostController.COMMUNITY_API_POST_PUT_NEW_POST,
        method: 'PUT',
        data: {
          content: this.state.content,
          location: this.state.location === '所在位置' ? '' : this.state.location,
          tags: this.state.tag
        }
      }).then((res) => {
        if (res.data.data.success === true) {
          this.backUpperPage()
        } else {
          alert("内容提交失败")
        }
      })
    }
  };

  catTag = () => {
    let catTagStatus = !this.state.tagSelected.cat;
    let tag = this.state.tag;
    if (catTagStatus && this.state.tag.indexOf('cat') < 0) {
      tag.push('cat')
    } else if(!catTagStatus  && this.state.tag.indexOf('cat') >= 0) {
      let index = tag.indexOf('cat');
      tag.splice(index, 1);
    }
    this.setState({
      tagSelected: {
        ...this.state.tagSelected,
        cat: catTagStatus
      },
      tag: tag
    });
  };

  dogTag = () =>{
    let dogTagStatus = !this.state.tagSelected.dog;
    let tag = this.state.tag;
    if (dogTagStatus && this.state.tag.indexOf('dog') < 0) {
      tag.push('dog')
    } else if (!dogTagStatus  && this.state.tag.indexOf('dog') >= 0) {
      let index = tag.indexOf('dog');
      tag.splice(index, 1);
    }
    this.setState({
      tagSelected: {
        ...this.state.tagSelected,
        dog: dogTagStatus
      },
    });
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
              <AtListItem title={this.state.location} arrow='right' iconInfo={this.iconInfoLocation}
                onClick={this.aliLocation}
              />
              <AtListItem title='谁可以看' arrow='right' extraText='公开' iconInfo={this.iconInfoBlock} />
              <AtListItem title='提醒谁看' arrow='right' iconInfo={this.iconInfoMention} />
            </AtList>
            <View className='at-article__p recommend'>
              <View className='tag text'>推荐到：</View>
              <View className='tag'><AtTag onClick={this.catTag} active={this.state.tagSelected.cat}>猫</AtTag></View>
              <View className='tag'><AtTag onClick={this.dogTag} active={this.state.tagSelected.dog}>狗</AtTag></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
