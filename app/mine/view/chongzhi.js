import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    View,
    TextInput
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度
var screenWidth = Dimensions.get('window').width;

import { Tabs, WhiteSpace, Modal } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { ChongZhi } from '../action/index';



class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginBtnBg: { backgroundColor: '#d2d2d2' },
            loginBtnTitleColor: { color: '#595959' },
            border: { borderColor: '#d2d2d2' },
            money: '0'
        };
    }


    changeUserName = () => {
        let { dispatch } = this.props
        dispatch(changeName())
    }

    onChange = (value) => {
        this.setState({
            value,
        });
    };

    pushCZMoney = () => {
        if (this.state.money === '0' || parseFloat(this.state.money) > (50000 - this.props.wallet.availablePredeposit) || parseFloat(this.state.money) < 100 || !this.state.money || parseFloat(this.state.money) > 9999) {
            if (parseFloat(this.state.money) > 9999) {
                Modal.alert('警告 \n ', '您输入的金额超过单次最大金额，请重新输入！ \n  ', [
                    { text: '确定', onPress: () => console.log('ok'), style: { color: 'red' } },
                ]);
            } else {
                Modal.alert('警告 \n ', '您输入的金额有误，请重新输入！ \n  ', [
                    { text: '确定', onPress: () => console.log('ok'), style: { color: 'red' } },
                ]);
            }
        } else if (!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) {
            Modal.alert('警告 \n ', '未实名认证无法充值！ \n  ', [
                { text: '确定', onPress: () => console.log('ok'), style: { color: 'red' } },
            ]);
        } else {
            Modal.alert(<Text style={{ marginBottom: 10 }}>{'提示 \n '}</Text>,
                <Text textAlign='center'>{'您输入的金额是：' + this.state.money + ' \n '}</Text>,
                [
                    { text: '取消', onPress: () => console.log('ok'), style: { color: 'red' } },
                    { text: '确定', onPress: () => this.submit(), style: { color: 'red' } },
                ]);
        }
    }

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


    submit = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.rechange',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['amount'] = this.state.money
        obj['type'] = '3'
        obj['paymentMethod'] = 'alipay'
        let { dispatch } = this.props
        dispatch(ChongZhi(obj, this.props.navigator))
    }

    phoneNumTextWatch(text) {

        if (text.length > 0) {
            this.setState({
                loginBtnBg: { backgroundColor: 'red' },
                loginBtnTitleColor: { color: '#ffffff' },
                border: { borderColor: 'red' },
                money: text
            });
        } else {
            this.setState({
                loginBtnBg: { backgroundColor: '#d2d2d2' },
                loginBtnTitleColor: { color: '#595959' },
                border: { borderColor: '#d2d2d2' },
                money: text
            });
        }
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='充值'
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >


                    <View style={{ width: width, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', }}>
                        <View style={{ width: 0.5 * width, paddingVertical: 30, alignItems: 'center', }}>
                            <Text style={{ fontSize: 16, }}>已存金额(元)</Text>
                            <Text style={{ fontSize: 17, color: '#EA3130', marginTop: 5 }}>{this.props.wallet.availablePredeposit}</Text>
                        </View>
                        <View style={{ height: 40, backgroundColor: '#F5F4F5', width: 0.8 }} />
                        <View style={{ width: 0.5 * width, paddingVertical: 30, alignItems: 'center', }}>
                            <Text style={{ fontSize: 16, }}>剩余额度(元)</Text>
                            <Text style={{ fontSize: 17, color: '#EA3130', marginTop: 5 }}>{50000 - this.props.wallet.availablePredeposit}</Text>
                        </View>
                    </View>
                    <View style={styles.contextView}>
                        <View style={styles.twoView}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>输入金额：</Text>
                            <TextInput
                                style={styles.textInputStylePhoneNum}
                                keyboardType='numeric'
                                maxLength={10}
                                multiline={false}
                                clearButtonMode='while-editing'
                                placeholderTextColor={'#939393'}
                                underlineColorAndroid='transparent'
                                ref='phoneNum'
                                onChangeText={(text) => this.phoneNumTextWatch(text)}
                            />
                        </View>
                        <View style={styles.threeView}>
                            <TouchableOpacity onPress={() => this.pushCZMoney()}>
                                <View ref='loginBtn'
                                    style={[styles.loginBtnStyle, this.state.loginBtnBg]}
                                >
                                    <Text style={[styles.loginBtnTitle, this.state.loginBtnTitleColor]}>确 认</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>




                    <View style={{ padding: 15, width: width, marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>友情提示：</Text>
                        <Text style={{ marginLeft: 15, marginTop: 3, color: '#888888', fontSize: 14 }}>(1)充值前请先进行实名认证</Text>
                        <Text style={{ marginLeft: 15, color: '#888888', fontSize: 14 }}>(2)现版本仅支持支付宝充值，更多方式，敬请期待！</Text>
                        <Text style={{ marginLeft: 15, color: '#888888', fontSize: 14 }}>(3)单次充值金額不能低于100元</Text>
                        <Text style={{ marginLeft: 15, color: '#888888', fontSize: 14 }}>(3)单次充值金額最多不能高于9999元</Text>
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        userInfo: store.userStore.userInfo,
        wallet: store.mineStore.wallet
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    contextView: {
        width: width,
        backgroundColor: '#ffffff',
        marginTop: 20,
        alignItems: 'center',
    },
    oneView: {
        width: 0.9 * width,
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#f9f9f9',
        justifyContent: 'space-between'
    },
    twoView: {
        width: 0.9 * width,
        padding: 15,

    },
    threeView: {
        width: 0.9 * width,
        paddingHorizontal: 20,
        paddingBottom: 15
    },

    textInputStylePhoneNum: {
        width: screenWidth * 0.8,
        height: 46,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'black',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ababab',
        fontSize: 17,
        fontWeight: 'bold'
    },
    loginBtnStyle: {
        height: 40,
        borderRadius: 20,
        width: screenWidth * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    loginBtnTitle: {
        fontSize: 18,
    },
    inputView: {
        borderRadius: 23,
        height: 46,
        width: 0.9 * width,
        borderWidth: 0.5,
        marginTop: 50
    }


});
