import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    View,
    Platform
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Modal } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { payByAli ,pursePay} from '../action/index';
import {getWallet} from '../../mine/action/index'
import { ToastCom } from '../../component/toast';

const data = [{ isClick: false }, { isClick: false }, { isClick: false }, { isClick: false }, { isClick: false }, { isClick: false }, { isClick: false }]

/**
     * alipay 支付宝
     * wxpay  微信支付
     * unionpay 银联支付
     * quickbill 快钱支付
     * jdpay 京东支付
     * bdwallet 百度钱包
     * tenpay 财付通qq支付
     * applepay 苹果支付
     * yeepay 易宝支付
     * cmbchina 一网通支付
     *
     * 第三方支付平台：
     * 支付宝、微信支付、百度钱包、PayPal、中汇支付、拉卡拉、财付通、融宝、
     * 盛付通、腾付通、通联支付、易宝支付、中汇宝、快钱、国付宝、物流宝、
     * 网易宝、网银在线、环迅支付IPS、汇付天下、汇聚支付、宝易互通、宝付、乐富
     */

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isclick: false,
            isChange: false,
            selected: 'alipay'
        };
    }

    componentWillMount = () =>{
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.wallet',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        // dispatch(getWallet(obj))
    }

    selectPayTyle = (type) => {
        this.setState({
            selected: type
        })
    }

    pay = () => {
        if(this.props.wallet.memberPoints.toFixed(0)>=parseFloat(this.props.payInfo.ordersAmount)){ //积分支付
            if(this.props.wallet.availablePredeposit<90){
                ToastCom({title:'info',info:'余额不足90元，不能使用积分支付,请充值'})
                return
            }
            var timestamp = Date.parse(new Date());
            let obj = {
                method: 'cart.scorePay',
            }
            obj['timestamp'] = timestamp
            obj['sessionId'] = this.props.sessionId
            obj['outTradeNo'] = this.props.payInfo.orderPaySn
            // this.props.navigator.push({ target: 'InputSelect', params: { obj: obj } })
            let { dispatch } = this.props
            dispatch(pursePay(obj, this.props.navigator))
        }else{
            if(this.state.selected === 'yue'){
                var timestamp = Date.parse(new Date());
                let obj = {
                    method: 'cart.balancePay',
                }
                obj['timestamp'] = timestamp
                obj['sessionId'] = this.props.sessionId
                obj['outTradeNo'] = this.props.payInfo.orderPaySn
                if(parseFloat(this.props.wallet.memberPoints.toFixed(0))+parseFloat(this.props.wallet.availablePredeposit)+parseFloat(this.props.wallet.freezePredeposit) < parseFloat(this.props.payInfo.ordersAmount)){
                    ToastCom({title:'info',info:'余额不足，请更换支付方式！'})
                }else{
                    this.props.navigator.push({ target: 'InputSelect', params: { obj: obj } })
                }
            }else if(this.state.selected === 'alipay'){
                var timestamp = Date.parse(new Date());
                let obj = {
                    method: 'cart.getSign',
                }
                obj['timestamp'] = timestamp
                obj['sessionId'] = this.props.sessionId
                obj['outTradeNo'] = this.props.payInfo.orderPaySn
                let { dispatch } = this.props
                dispatch(payByAli(obj, this.props.navigator))
            }
        }
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='德鑫收银台'
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                    rightText='支付说明'
                    rightClick={() => props.navigator.push({target:'PayIntro'})}
                >

                    <View style={{ width: width, height: height - 114 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            automaticallyAdjustContentInsets={false}
                        >
                            <View style={styles.tabView}>
                                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', }}>
                                    <Image
                                        source={require('../../img/pay_n.png')}
                                        style={{ height: 18, width: 18 }}
                                    />
                                    <Text style={{ fontSize: 15, color: 'black', marginLeft: 10 }}>当前待支付金额：</Text>
                                </View>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>{'￥' + this.props.payInfo.ordersAmount}</Text>
                            </View>

                        <View style={styles.tabView}>
                            <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', }}>
                                <Image
                                    source={require('../../img/pay_j.png')}
                                    style={{ height: 18, width: 18 }}
                                />
                                <Text style={{ fontSize: 15, color: 'black', marginLeft: 10 }}>当前可用积分：<Text style={{fontSize: 16, color: '#EA3031', marginLeft: 5 }}>{this.props.wallet.memberPoints.toFixed(0)}</Text></Text>
                            </View>
                            {this.props.wallet.memberPoints.toFixed(0)>0?
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={require('../../img/pay_r.png')}
                            />
                            :
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={require('../../img/pay_u.png')}
                            />
                            }
                            
                        </View>
                            <View style={styles.tabView}>
                                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', }}>
                                    <Image
                                        source={require('../../img/pay_t.png')}
                                        style={{ height: 18, width: 18 }}
                                    />
                                    <Text style={{ fontSize: 15, color: 'black', marginLeft: 10 }}>支付方式</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.tabView, { marginTop: 1 ,marginLeft:4,marginRight:4}]} onPress={() => this.selectPayTyle('yue')}
                            disabled={this.props.wallet.memberPoints.toFixed(0)>=parseFloat(this.props.payInfo.ordersAmount) || (this.props.wallet.availablePredeposit+this.props.wallet.freezePredeposit) === 0 }
                            >
                                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', }}>
                                    <Image
                                        source={require('../../img/pay_q.png')}
                                        style={{ height: 18, width: 18, marginLeft: 5 }}
                                    />
                                    <Text style={{ fontSize: 15, color: 'black', marginLeft: 10 }}>余额支付</Text>
                                </View>
                                {this.props.wallet.memberPoints.toFixed(0)>=parseFloat(this.props.payInfo.ordersAmount) || (this.props.wallet.availablePredeposit+this.props.wallet.freezePredeposit) === 0 ?
                                    <Image
                                    style={{ height: 20, width: 20 }}
                                    source={require('../../img/pay_u.png')}
                                    />
                                :
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={this.state.selected === 'yue' ? require('../../img/pay_r.png') : require('../../img/pay_m.png')}
                                    />
                                }
                            </TouchableOpacity>
                            {this.state.selected === 'yue' &&
                            <View style={[styles.tabView, {marginTop:0.5,marginLeft:7.5,marginRight:7.5,width:width-15}]}>
                                <Text style={{fontSize: 15, color: 'black', marginLeft: 28 }}>钱包余额<Text  style={{fontSize: 15, color: '#EA3031'}}>{'  '+this.props.wallet.availablePredeposit}</Text></Text>
                            </View>
                            }
                            {this.state.selected === 'yue' &&
                            <View style={[styles.tabView, {marginTop:0.5,marginLeft:7.5,marginRight:7.5,width:width-15}]}>
                                <Text style={{fontSize: 15, color: 'black', marginLeft: 28 }}>奖励金额<Text  style={{fontSize: 15, color: '#EA3031'}}>{'  '+this.props.wallet.freezePredeposit}</Text></Text>
                            </View>
                            }
                            <TouchableOpacity style={[styles.tabView, { marginTop: 1 ,marginLeft:4,marginRight:4}]} onPress={() => this.selectPayTyle('alipay')}
                            disabled={this.props.wallet.memberPoints.toFixed(0)>=parseFloat(this.props.payInfo.ordersAmount)}
                            >
                                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', }}>
                                    <Image
                                        source={require('../../img/zfb.png')}
                                        style={{ height: 18, width: 18, marginLeft: 5 }}
                                    />
                                    <Text style={{ fontSize: 15, color: 'black', marginLeft: 10 }}>支付宝支付</Text>
                                </View>
                                {this.props.wallet.memberPoints.toFixed(0)>=parseFloat(this.props.payInfo.ordersAmount)?
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={require('../../img/pay_u.png')}
                                    />
                                    :
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={this.state.selected === 'alipay' ? require('../../img/pay_r.png') : require('../../img/pay_m.png')}
                                    />
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={styles.indexLeftView} onPress={() => this.pay()}>
                            <Text style={styles.setText}>确认支付</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        username: store.mineStore.username,
        carsArr: store.carsStore.carsArr,
        payInfo: store.carsStore.payInfo,
        sessionId: store.userStore.sessionId,
        wallet: store.mineStore.wallet
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    yueView: {
        width: width,
        height: 300,
    },
    tabView: {
        width: width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        marginTop: 20,
        borderBottomWidth: 0.8,
        borderBottomColor: '#d0d0d4'
    },
    otherView: {
        width: width,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderWidth: 1
    },
    bottomView: {
        width: width,
        height: 50,
        backgroundColor: 'white',
        position: 'absolute',
        ...ifIphoneX({
            bottom: 34
        }, {
                bottom: Platform.OS == 'ios' ? 0 : 0,
            }),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    allText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 30,
        color: 'black'
    },
    indexLeftView: {
        height: 35,
        width: width * 0.85,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 17.5
    },
    setText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    numText: {
        color: 'white',
        fontSize: 12
    }
});
