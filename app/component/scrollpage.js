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
  StatusBar,
  View
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'
var DeviceInfo = require('react-native-device-info');
const apiLevel = Platform.OS === 'android' ? DeviceInfo.getAPILevel() : 30;

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
      state:1
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
        <View style={[styles.context1,props.bgbarStyle]}>
          <Text
            style={[styles.txt, props.titleStyle]}
          >
            {props.title}
          </Text>
        </View>
        <View style={styles.context}>
          <TouchableOpacity
            onPress={props.leftClick}
            disabled={!props.leftClick}
            style={{height:44,justifyContent: 'center',}}
          >
            {!!props.left ?
              <Image
                style={styles.leftImg}
                source={props.left}
              />
              :
              <Text style={{ color: '#fff', fontSize: 15,paddingLeft:15 }}>{props.leftText}</Text>
            }
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={props.rightClick}
            disabled={!props.rightClick}
            style={{height:44,justifyContent: 'center',}}
          >
            {!!props.right ?
              <Image
                style={styles.rightImg}
                source={props.right}
              />
              :
              <Text style={{ color: '#fff', fontSize: 15,paddingRight:15 }}>{props.rightText}</Text>
            }
          </TouchableOpacity>
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
    width: width,
    ...ifIphoneX({
      height: 88,
      paddingTop: 44
    }, {
        height: apiLevel < 20 ? 44 : 64,
        paddingTop: apiLevel < 20 ? 0 : 20,
      }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    position: 'absolute'
  },
  context1: {
    backgroundColor: '#00000000',
    width: width,
    ...ifIphoneX({
      height: 88,
      paddingTop: 44
    }, {
        height: apiLevel < 20 ? 44 : 64,
        paddingTop: apiLevel < 20 ? 0 : 20,
      }),
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
    marginHorizontal: 15
  },
  rightImg: {
    height: 22,
    width: 22,
    marginHorizontal: 15
  },
  txt: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'courier'
  }
});

