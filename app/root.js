import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  NetInfo,
  Platform,
  Modal,
  Alert,
  NativeAppEventEmitter,
  BackHandler
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import { connect } from 'react-redux';
import { changeShow, changeShowStr } from './home/action/index'
import JPushModule from 'jpush-react-native';
var DeviceInfo = require('react-native-device-info');
const apiLevel = DeviceInfo.getAPILevel();

//main
import Main from './main/view/main'
import Ad from './main/view/ad'
import Launch from './main/view/launch'

//登录注册等user
import Login from './user/view/login'
import Regist from './user/view/regist'
import PaySelect from './user/view/payselect'
import Forget from './user/view/forget'
import Reset from './user/view/reset'
import ResetPay from './user/view/resetpay'
import LoginBy from './user/view/loginby'
import Tiaokuan from './user/view/tiaokuan'

//发现find
import MyPush from './find/view/mypush'
import NewGift from './find/view/newgift'

//购物车cars
import SureOrder from './cars/view/sureorder'
import Payment from './cars/view/payment'
import PayIntro from './cars/view/payIntro'

//首页home
import GoodsDetails from './home/view/goodstetails'
import NewYear from './home/view/newyear'
import QR from './home/view/qr'
import GoodsList from './home/view/goodsList'
import SpecialProList from './home/view/specialProList'

//我的mine
import MyOrder from './mine/view/myorder'
import MyPurse from './mine/view/mypurse'
import MyPersonal from './mine/view/mypersonal'
import MyAddr from './mine/view/myaddr'
import EditAddr from './mine/view/editaddr'
import MyTicket from './mine/view/myticket'
import Overdue from './mine/view/overdue'
import ChongZhi from './mine/view/chongzhi'
import ApproveReal from './mine/view/approvereal'
import ResultPage from './mine/view/resultPage'
import Settings from './mine/view/settings'
import TiXian from './mine/view/tixian'
import InputSelect from './mine/view/inputselect'
import Bank from './mine/view/bank'
import SelectBank from './mine/view/selectBank'
import AddBank from './mine/view/addbank'
import About from './mine/view/about'
import Lianxi from './mine/view/lianxi'
import SelectAddr from './mine/view/selectaddr'
import UpdateAddr from './mine/view/updateAddr'
import Back from './mine/view/back'
import OrderDetail from './mine/view/orderdetail'
import YueliOrder from './mine/view/yueliOrder'
import YueliRecord from './mine/view/yueliRecord'
import YueliTixian from './mine/view/yueliTixian'
import YueliZaitou from './mine/view/yueliZaitou'

//消息news
import News from './news/view/main'
import Content from './news/view/content'

//分类
import FindGoodsList from './cate/view/findGoodsList'

// import Home from './home/view/main'
// import Find from './find/view/main'
// import Cars from './cars/view/main'
// import Mine from './mine/view/main'
// import Cate from './cate/view/main'


class root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  // componentDidMount() {
  //   NetInfo.addEventListener(
  //     'change',
  //     (connectionInfo) => {
  //     }
  //   )
  // }

  componentDidMount() {
    // 新版本必需写回调函数
    // JPushModule.notifyJSDidLoad();
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad((resultCode) => {
        if (resultCode === 0) { }
      });
    }

    // 接收自定义消息
    JPushModule.addReceiveCustomMsgListener((message) => {
      this.setState({ pushMsg: message });
    });
    // 接收推送通知
    JPushModule.addReceiveNotificationListener((message) => {
      let { dispatch } = this.props
      dispatch(changeShow(true))
      if (Platform.OS === 'android') {
        dispatch(changeShowStr(message.alertContent))
      } else {
        dispatch(changeShowStr(message.aps.alert))
      }
      var currentDate = new Date()
      JPushModule.sendLocalNotification({
        id: 5,
        content: 'content',
        extra: { key1: 'value1', key2: 'value2' },
        fireTime: currentDate.getTime() + 3000,
        badge: 8,
        sound: 'fasdfa',
        subtitle: 'subtitle',
        title: 'title'
      })
    });
    // 打开通知
    JPushModule.addReceiveOpenNotificationListener((map) => {
      // 可执行跳转操作，也可跳转原生页面
      // this.props.navigation.navigate("SecondActivity");
    });

    NativeAppEventEmitter.addListener(
      'ReceiveNotification',
      (message) => {
        dispatch(changeShowStr(message.alertContent))
      }
    )
  }

  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
    NativeAppEventEmitter.removeAllListeners();
    DeviceEventEmitter.removeAllListeners();
  }



  renderScene(route, navigator) {
    switch (route.target) {
      // case 'Home':
      //   return <Home {...route.params} navigator={navigator} />
      // case 'Find':
      //   return <Find {...route.params} navigator={navigator} />
      // case 'Cars':
      //   return <Cars {...route.params} navigator={navigator} />
      // case 'Mine':
      //   return <Mine {...route.params} navigator={navigator} />
      // case 'Cate':
      //   return <Cate {...route.params} navigator={navigator} />
      //main
      case "Main":
        return <Main {...route.params} navigator={navigator} />
      case "Launch":
        return <Launch {...route.params} navigator={navigator} />
      case "Ad":
        return <Ad {...route.params} navigator={navigator} />
      //user
      case "Login":
        return <Login {...route.params} navigator={navigator} />
      case "Regist":
        return <Regist {...route.params} navigator={navigator} />
      case "PaySelect":
        return <PaySelect {...route.params} navigator={navigator} />
      case "Forget":
        return <Forget {...route.params} navigator={navigator} />
      case "Reset":
        return <Reset {...route.params} navigator={navigator} />
      case "ResetPay":
        return <ResetPay {...route.params} navigator={navigator} />
      case "LoginBy":
        return <LoginBy {...route.params} navigator={navigator} />
      case "Tiaokuan":
        return <Tiaokuan {...route.params} navigator={navigator} />

      //我的
      case "MyOrder":
        return <MyOrder {...route.params} navigator={navigator} />
      case "MyPurse":
        return <MyPurse {...route.params} navigator={navigator} />
      case "MyPersonal":
        return <MyPersonal {...route.params} navigator={navigator} />
      case "MyAddr":
        return <MyAddr {...route.params} navigator={navigator} />
      case "EditAddr":
        return <EditAddr {...route.params} navigator={navigator} />
      case "MyTicket":
        return <MyTicket {...route.params} navigator={navigator} />
      case "Overdue":
        return <Overdue {...route.params} navigator={navigator} />
      case "ChongZhi":
        return <ChongZhi {...route.params} navigator={navigator} />
      case "ApproveReal":
        return <ApproveReal {...route.params} navigator={navigator} />
      case "ResultPage":
        return <ResultPage {...route.params} navigator={navigator} />
      case "Settings":
        return <Settings {...route.params} navigator={navigator} />
      case "TiXian":
        return <TiXian {...route.params} navigator={navigator} />
      case "InputSelect":
        return <InputSelect {...route.params} navigator={navigator} />
      case "Bank":
        return <Bank {...route.params} navigator={navigator} />
      case "SelectBank":
        return <SelectBank {...route.params} navigator={navigator} />
      case "AddBank":
        return <AddBank {...route.params} navigator={navigator} />
      case "About":
        return <About {...route.params} navigator={navigator} />
      case "Lianxi":
        return <Lianxi {...route.params} navigator={navigator} />
      case "SelectAddr":
        return <SelectAddr {...route.params} navigator={navigator} />
      case "UpdateAddr":
        return <UpdateAddr {...route.params} navigator={navigator} />
      case "Back":
        return <Back {...route.params} navigator={navigator} />
      case "OrderDetail":
        return <OrderDetail {...route.params} navigator={navigator} />
      case "YueliOrder":
        return <YueliOrder {...route.params} navigator={navigator} />
      case "YueliRecord":
        return <YueliRecord {...route.params} navigator={navigator} />
      case "YueliTixian":
        return <YueliTixian {...route.params} navigator={navigator} />
      case "YueliZaitou":
        return <YueliZaitou {...route.params} navigator={navigator} />

      //首页
      case "GoodsDetails":
        return <GoodsDetails {...route.params} navigator={navigator} />
      case "NewYear":
        return <NewYear {...route.params} navigator={navigator} />
      case "QR":
        return <QR {...route.params} navigator={navigator} />
      case "GoodsList":
        return <GoodsList {...route.params} navigator={navigator} />
      case "SpecialProList":
        return <SpecialProList {...route.params} navigator={navigator} />
      //购物车
      case "SureOrder":
        return <SureOrder {...route.params} navigator={navigator} />
      case "Payment":
        return <Payment {...route.params} navigator={navigator} />
      case "PayIntro":
        return <PayIntro {...route.params} navigator={navigator} />
      //发现
      case "MyPush":
        return <MyPush {...route.params} navigator={navigator} />
      case "NewGift":
        return <NewGift {...route.params} navigator={navigator} />
      //消息
      case "News":
        return <News {...route.params} navigator={navigator} />
      case "Content":
        return <Content {...route.params} navigator={navigator} />
      //分类
      case "FindGoodsList":
        return <FindGoodsList {...route.params} navigator={navigator} />
    }
  }


  render() {
    return <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={'#00000000'}
        translucent={apiLevel > 20}
        barStyle="light-content" />
      <Navigator
        initialRoute={Platform.OS == 'ios' ? { target: 'Ad', component: Ad } : { target: 'Launch', component: Launch }}
        ref="navigator"
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
        configureScene={(route, routeStack) => {
          switch (route.direction) {
            case "right":
              return Navigator.SceneConfigs.PushFromRight
            case "bottom":
              return Navigator.SceneConfigs.FloatFromBottom
            default:
              return Navigator.SceneConfigs.PushFromRight
          }
        }} />
    </View>
  }
}

function select(store) {
  return {
  }
}


export default connect(select)(root);
