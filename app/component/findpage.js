import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  BackHandler,
  ToastAndroid,
  TextInput,
  StatusBar,
  View
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'
var DeviceInfo = require('react-native-device-info');
const apiLevel = DeviceInfo.getAPILevel();


/*
props：
bg: bool  导航是否有背景
bgImg: require   导航背景图片
leftClick:  fun   左侧点击按钮事件
left：  require  左侧点击图片
rightClick：  fun   右侧点击按钮事件
right：   require   右侧点击图片
title： string   标题
titleStyle： obj   标题样式
isSroll：  bool   是否滑动
bgStyle：  obj   背景图片样式
*/

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


export default class navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchStr : ''
    };
  }

  _back = () => {
    this.props.navigator.pop()
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator.getCurrentRoutes().length === 1) {
        return false;
      } else {
        this._back();
        return true;
      }
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => { })
  }

  render() {
    let props = this.props
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={props.barStyle} />
        {!!props.bg &&
          <Image
            source={props.bgImg}
            style={[styles.bgImg, props.bgStyle]}
          />
        }
        <View style={styles.context}>
          <TouchableOpacity
            onPress={props.leftClick}
            disabled={!props.leftClick}
          >
            {!!props.left &&
              <Image
                style={styles.leftImg}
                source={props.left}
              />
            }
          </TouchableOpacity>
          <View style={{height:30,width:0.85*width,borderRadius:15,backgroundColor:'white',flexDirection: 'row',alignItems: 'center',paddingHorizontal:15}}>
            <TextInput
              style={{flex:1,height:30,padding:0}}
              placeholder='搜索您想要的商品'
              clearButtonMode='while-editing'
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({searchStr:text})}
            />
            <TouchableOpacity style={{width:25,height:25,alignItems:'center',justifyContent:'center'}} onPress={()=>this.props.search(this.state.searchStr)}>
              <Image
                source={require('../img/find.png')}
                style={{width:20,height:20}}
              />
            </TouchableOpacity>
            
          </View>
        </View>
        {props.isScroll ?
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            automaticallyAdjustContentInsets={false}
            style={{ flex: 1 }}
          >
            {this.props.children}
          </ScrollView>
          :
          this.props.children

        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    ...ifIphoneX({
      paddingBottom: 34
    }, {
        paddingBottom: 0
      })
  },
  context: {
    backgroundColor: '#00000000',
    width: width,
    ...ifIphoneX({
      height: 88,
      paddingTop: 44
    }, {
        height: apiLevel < 20 ? 44 : 64,
        paddingTop: apiLevel < 20 ? 0 : 20,
      }),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0.5,
   
  },
  bgImg: {
    width: width,
    ...ifIphoneX({
      height: 88,
    }, {
        height: apiLevel < 20 ? 44 : 64,
      }),
    position: 'absolute',

  },
  leftImg: {
    height: 22,
    width: 22,
    marginRight: 10
  },
  rightImg: {
    height: 22,
    width: 22,
    marginRight: 10
  },
  txt: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'courier'
  }
});


