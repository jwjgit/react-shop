
// 我的订单中一个订单模块
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Modal } from 'antd-mobile'

import { connect } from 'react-redux';
import { getPayInfo } from '../../../cars/action/index';

// orderState  : 0:已取消;10:待付款;20:待发货;30:待收货;40:交易完成;50:已提交;60:已确认;

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isclick: false
        };
    }

    pay = (obj) => {
        let { dispatch } = this.props
        dispatch(getPayInfo(obj))
        this.props.navigator.push({ target: 'Payment' })
    }




    render() {
        let props = this.props.info
        var allnum = 0
        for(let i in props.orderGoodsList){
            allnum += props.orderGoodsList[i].goodsNum
        }
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigator.push({ target: 'OrderDetail', params: { orderSn: props.orderSn,orderState: props.orderState} })}>
                <View style={styles.oneView}>
                    <Text style={{ fontSize: 13, color: 'black', fontWeight: 'bold' }}>{'订单号:' + props.orderSn}</Text>
                    {
                        props.orderState == 10 && <Text style={{ fontSize: 13, color: '#ea3131' }}>待付款</Text>||
                        props.orderState == 20 && <Text style={{ fontSize: 13, color: '#ea3131' }}>待发货</Text>||
                        props.orderState == 30 && <Text style={{ fontSize: 13, color: '#ea3131' }}>待收货</Text>||
                        props.orderState == 40 && <Text style={{ fontSize: 13, color: '#ea3131' }}>交易完成</Text>||
                        props.orderState == 0 && <Text style={{ fontSize: 13, color: '#ea3131' }}>已取消</Text>
                    }
                </View>
                {props.orderGoodsList.map((item, i) => (
                    <View style={styles.twoView} key={i}>
                        <Image
                            source={{ uri: 'http://img.njdexin.cn' + item.goodsImage }}
                            style={{ height: 60, width: 60, marginRight: 10 }}
                        />
                        <Text style={{ fontSize: 14, color: '#5C5C5C', width: width - 120 }}>{item.goodsName}</Text>
                        <Text style={{ fontSize: 14, color: '#5C5C5C'}}>X{item.goodsNum}</Text>
                    </View> 
                ))}
                
                <View style={styles.threeView}>
                    <Text style={{ fontSize: 13, color: 'black' }}>{'共' + allnum + '件商品  实付款：'}
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>{'￥' + props.orderTotalPrice}</Text></Text>
                </View>
                <View style={styles.fourView}>
                    {props.orderState === 10 ?
                        <TouchableOpacity style={styles.borderView} onPress={() => this.pay(props)}>
                            <Text style={{ fontSize: 13, color: '#ea3131' }}>去支付</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.borderView1}>
                            <Text style={{ fontSize: 13, color: 'black' }}>查看详情</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        recomList: store.mineStore.recomList
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'white',
        marginBottom: 10
    },
    oneView: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    twoView: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4'
    },
    threeView: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomWidth: 0.5,
        borderBottomColor: '#d0d0d4'
    },
    fourView: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    borderView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#ea3131',
        width: 80
    },
    borderView1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: 'black',
        width: 80
    }



});
