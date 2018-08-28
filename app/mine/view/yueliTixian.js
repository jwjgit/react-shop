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
            method: 'regular.withDraw',
            type: '4',
            paymentMethod: 'unionpay'
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['sessionId'] = this.props.sessionId
        jsonArr['orderSn'] = this.props.orderSn
        this.props.navigator.push({ target: 'InputSelect', params: { obj: jsonArr } })
    }

    shiji = () => {
        if (!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) {
            Modal.alert('警告 \n ', '未实名认证无法提现！ \n  ', [
                { text: '确定', onPress: () => this.props.navigator.push({ target: 'ApproveReal' }), style: { color: 'red' } },
            ]);
        } else {
            let num = parseFloat(this.props.reoAmount) * 0.993
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

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'white', marginTop: 15 ,borderTopWidth:0.5,borderTopColor:'#D0D0D4',borderBottomWidth:0.5,borderBottomColor:'#D0D0D4', shadowColor: 'rgba(0,0,0,0.5)',shadowOffset: { width: 0, height:10 },shadowRadius:10}}
                            onPress={() => this.props.navigator.push({ target: 'SelectBank' })}
                        >
                            <Image
                                source={{ uri: props.moBank.bankLogo }}
                                style={{ width: 40, height: 40 }}
                            />
                            <View style={{ width: 0.7 * width }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:5}}>
                                    <Text style={{ fontSize: 16, color: 'black'}}>{props.moBank.bankName}</Text>
                                    <Text style={{ fontSize: 14, color: 'gray', marginLeft: 10 }}>{props.moBank.type}</Text>
                                </View>
                                <Text style={{ fontSize: 12, color: '#5A5A5A' }}>{strid}</Text>
                            </View>
                            <Image
                                source={require('../../img/mine_to.png')}
                                style={{ height: 15, width: 15 }}
                            />
                        </TouchableOpacity>
                        <View style={{ paddingTop:15,paddingBottom:28,paddingHorizontal:15, backgroundColor: 'white', marginTop: 21 ,borderTopWidth:0.5,borderTopColor:'#D0D0D4',borderBottomWidth:0.5,borderBottomColor:'#D0D0D4'}}>
                            <Text style={{ fontSize: 17, color: 'black' }}>提现金额</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, paddingBottom: 10, borderBottomColor: '#D0D0D4', borderBottomWidth: 0.5,}}>
                                <Image
                                    source={require('../../img/rmb.png')}
                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                />
                                <Text style={{fontSize:40,color:'#888'}}>{this.props.reoAmount}</Text>
                            </View>
                            <TouchableOpacity style={styles.loginBtnStyle} onPress={() => this.shiji()}>
                                <Text style={styles.loginBtnTitle}>提现</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 15, width: width,}}>
                            <Text style={{ color: '#000000', fontSize: 14,lineHeight:25 ,marginBottom:5}}>友情提示：</Text>
                            <Text style={{ color: '#888888', fontSize: 14 ,lineHeight:25 }}>1.提现将收取0.7%的手续费</Text>
                            <Text style={{  color: '#888888', fontSize: 14 ,lineHeight:25 }}>2.现版本仅支持银行卡提现，更多方式敬请期待！</Text>

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
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    loginBtnStyle: {
        height: 44,
        borderRadius: 5,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA3130',
        marginTop: 28
    },
    //登录按钮,可用状态
    loginBtnTitle: {
        fontSize: 18,
        color: 'white'
    },
    
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },


});
