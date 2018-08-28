import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Modal, Steps } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'


import { getbankList } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            isClick: false
        };
    }

    componentWillMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.bankCardList',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getbankList(obj))
    }


    cash = () => {
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'buyer.cash',
            type: '4',
            paymentMethod: 'unionpay'
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['sessionId'] = this.props.sessionId
        jsonArr['amount'] = this.state.amount
        this.props.navigator.push({ target: 'InputSelect', params: { obj: jsonArr } })
    }

    shiji = () => {
        if (this.state.amount === '0' || parseFloat(this.state.amount) > (this.props.wallet.availablePredeposit + this.props.wallet.freezePredeposit).toFixed(2) || parseFloat(this.state.amount) < 100 || !this.state.amount || parseFloat(this.state.amount) > 50000) {
            Modal.alert('警告 \n ', '您输入的金额有误，请重新输入！ \n  ', [
                { text: '确定', onPress: () => console.log('ok'), style: { color: 'red' } },
            ]);
        } else if (!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) {
            Modal.alert('警告 \n ', '未实名认证无法提现！ \n  ', [
                { text: '确定', onPress: () => this.props.navigator.push({ target: 'ApproveReal' }), style: { color: 'red' } },
            ]);
        } else {
            let num = parseFloat(this.state.amount) * 0.993
            Modal.alert(<Text style={{ marginBottom: 10 }}>{'提示 \n '}</Text>,
                <Text textAlign='center'>{'实际到账金额：' + num.toFixed(2) + ' \n '}</Text>,
                [
                    { text: '取消', onPress: () => console.log('ok'), style: { color: 'red' } },
                    { text: '确定', onPress: () => this.cash(), style: { color: 'red' } },
                ]);
        }
    }


    render() {
        let props = this.props
        let strid = ''
        if (!!props.moBank.cardNo) {
            let arr = props.moBank.cardNo.split('')
            let font = arr[0] + arr[1] + arr[2] + arr[3]
            let next = arr[arr.length - 4] + arr[arr.length - 3] + arr[arr.length - 2] + arr[arr.length - 1]
            strid = font + '  ****  ****  ' + next
        }

        return (
            <View style={styles.container}>
                <ScrollPage
                    bg={true}
                    bgImg={require('../../img/navbar_bg.png')}
                    title={'提现'}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                >
                    <View style={styles.container}>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'white', marginTop: 15 }}
                            onPress={() => this.props.navigator.push({ target: 'SelectBank' })}
                        >
                            <Image
                                source={{ uri: props.moBank.bankLogo }}
                                style={{ width: 40, height: 40 }}
                            />
                            <View style={{ width: 0.7 * width }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{props.moBank.bankName}</Text>
                                    <Text style={{ fontSize: 14, color: 'gray', marginLeft: 10 }}>{props.moBank.type}</Text>
                                </View>
                                <Text style={{ fontSize: 14, color: 'black' }}>{strid}</Text>
                            </View>
                            <Image
                                source={require('../../img/mine_to.png')}
                                style={{ height: 15, width: 15 }}
                            />
                        </TouchableOpacity>
                        <View style={{ padding: 15, backgroundColor: 'white', marginTop: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>提现金额</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row', borderBottomColor: '#D0D0D4', borderBottomWidth: 0.5, marginTop: 20, paddingBottom: 10 }}>
                                <Image
                                    source={require('../../img/rmb.png')}
                                    style={{ height: 40, width: 40, marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder='请输入金额'
                                    style={styles.phoneInput}
                                    keyboardType='numeric'
                                    //secureTextEntry={true}
                                    multiline={false}
                                    clearButtonMode='while-editing'
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor={'#bcbcbc'}
                                    onChangeText={(text) => this.setState({ amount: text })}
                                />
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 13 }}>{'可用余额：' + (this.props.wallet.availablePredeposit + this.props.wallet.freezePredeposit).toFixed(2) + '元'}</Text>
                            <TouchableOpacity style={styles.loginBtnStyle} onPress={() => this.shiji()}>
                                <Text style={styles.loginBtnTitle}>确认提现</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 15, width: width, marginTop: 10 }}>
                            <Text style={{ color: '#000000', fontSize: 14 }}>友情提示：</Text>
                            <Text style={{ marginLeft: 15, marginTop: 3, color: '#888888', fontSize: 14 }}>(1)提现金額不能低于100元，最多不能高于5万元</Text>
                            <Text style={{ marginLeft: 15, color: '#888888', fontSize: 14 }}>(2)提现将收取0.7%的手续费</Text>
                            <Text style={{ marginLeft: 15, color: '#888888', fontSize: 14 }}>(3)现版本仅支持银行卡提现，更多方式，敬请期待！</Text>

                        </View>

                    </View>

                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        moBank: store.mineStore.moBank,
        userInfo: store.userStore.userInfo,
        wallet: store.mineStore.wallet
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    loginBtnStyle: {
        height: 40,
        borderRadius: 20,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop: 20
    },
    //登录按钮,可用状态
    loginBtnTitle: {
        fontSize: 18,
        color: 'white'
    },
    phoneInput: {
        width: 0.8 * width,
        borderRadius: 5,
        height: 40,
        backgroundColor: 'white',
        fontSize: 16,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },


});
