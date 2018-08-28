import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    View,
    Modal,
    Platform,
    ActivityIndicator
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Drawer } from 'antd-mobile'
import GoodsIndex from '../../cars/view/component/goodsindex'
import ScrollPage from '../../component/scrollpage'

import { getPayInfo } from '../../cars/action/index';
import { ToastCom } from '../../component/toast';
import { cancelOrder, finishOrder,getOrderDetail  } from '../action/index'

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // addr: props.info.address,
            // goodsList: props.info.orderGoodsList,
            // orderTotalPrice: props.info.orderTotalPrice,
            // orderSn: props.info.orderSn,
            // outTradeNo: props.info.paySn,
            // paySn: props.info.paySn,
            // createTimeStr: props.info.createTimeStr,
            // paymentTimeStr: props.info.paymentTimeStr,
            // shippingTimeStr: props.info.shippingTimeStr,
            // shippingCode: props.info.shippingCode,
            // finnshedTimeStr: props.info.finnshedTimeStr,
            // shippingFee : props.info.shippingFee,
            // stateStr: '',
            img: require('../../img/p1.png')
        };
    }

    componentDidMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.getOrderDetail',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['orderSn'] = this.props.orderSn
        let { dispatch } = this.props
        dispatch(getOrderDetail(obj))

        switch (this.props.orderState) {
            case 10:
                this.setState({
                    stateStr: '等待买家付款',
                    img: require('../../img/p1.png')
                })
                break
            case 20:
                this.setState({
                    stateStr: '等待卖家发货',
                    img: require('../../img/p2.png')
                })
                break
            case 30:
                this.setState({
                    stateStr: '等待买家收货',
                    img: require('../../img/p3.png')
                })
                break
            default:
                this.setState({
                    stateStr: '买家已收货',
                    img: require('../../img/p4.png')
                })
                break
        }
    }

    pay = () => {
        let { dispatch } = this.props
        dispatch(getPayInfo(this.props.orderDetail))
        this.props.navigator.push({ target: 'Payment' })
    }

    cancelOrderById = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.cancelOrder',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['orderSn'] = this.props.orderDetail.orderSn
        obj['outTradeNo'] = this.props.orderDetail.outTradeNo
        obj['cancelCause'] = '不想要了'
        let { dispatch } = this.props
        dispatch(cancelOrder(obj, this.props.navigator))
    }

    finishOrderById = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.finishOrder',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['orderSn'] = this.props.orderDetail.orderSn
        
        let { dispatch } = this.props
        dispatch(finishOrder(obj, this.props.navigator))
    }

    renderBottom = () => {
        switch (this.props.orderState) {
            case 10:
                return (
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={{ height: 30, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderColor: '#ea3131', borderWidth: 1, marginRight: 15 }}
                            onPress={() => this.pay()}
                        >
                            <Text style={{ fontSize: 13, color: '#ea3131' }}>付款</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 30, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderColor: '#000000', borderWidth: 1, marginRight: 15 }}
                            onPress={() => this.cancelOrderById()}
                        >
                            <Text style={{ fontSize: 13, color: '#000000' }}>取消订单</Text>
                        </TouchableOpacity>
                    </View>
                )
            case 20:
                return (
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={{ height: 30, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderColor: '#000000', borderWidth: 1, marginRight: 15 }}
                            onPress={() => this.props.navigator.push({ target: 'Lianxi' })}
                        >
                            <Text style={{ fontSize: 13, color: '#000000' }}>联系客服</Text>
                        </TouchableOpacity>
                    </View>
                )
            case 30:
                return (
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={{ height: 30, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderColor: '#000000', borderWidth: 1, marginRight: 15 }}
                            onPress={() => ToastCom({ title: 'info', info: '暂不支持，请自行查询！' })}
                        >
                            <Text style={{ fontSize: 13, color: '#000000' }}>查看物流</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 30, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderColor: '#ea3131', borderWidth: 1, marginRight: 15 }}
                            onPress={() => this.finishOrderById()}
                        >
                            <Text style={{ fontSize: 13, color: '#ea3131' }}>确认收货</Text>
                        </TouchableOpacity>
                    </View>
                )
            default:
                return (
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={{ height: 30, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderColor: '#000000', borderWidth: 1, marginRight: 15 }}
                            onPress={() => this.props.navigator.push({ target: 'Lianxi' })}
                        >
                            <Text style={{ fontSize: 13, color: '#000000' }}>联系客服</Text>
                        </TouchableOpacity>
                    </View>
                )
        }
    }

    render() {
        let props = this.props
        // console.log(props.expressVoList)
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='订单详情'
                    barStyle="dark-content"
                    navigator={this.props.navigator}
                    bg={true}
                    titleStyle={{ color: 'black' }}
                    bgImg={require('../../img/white_bg.jpg')}
                    left={require('../../img/home_back.png')}
                    leftClick={() => props.navigator.pop()}
                    isScroll={true}
                >
                 {!props.orderDetail?
                        <ActivityIndicator
                            size="large"
                            color="red"
                            style={{marginTop:20}}
                        />
                        :
                    <View style={{ flex: 1, paddingBottom: 60 }}>
                        <View style={{ width: width, height: 198 * width / 750, justifyContent: 'center', }}>
                            <Image
                                source={this.state.img}
                                style={{ width: width, height: 198 * width / 750, position: 'absolute', }}
                            />
                            <Text style={{ fontSize: 15, color: 'white', marginLeft: 30, fontWeight: 'bold' }}>{this.state.stateStr}</Text>
                        </View>
                        <View style={styles.addrView}>
                            <View style={styles.addrOneView}>
                                <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{'收货人：' + props.orderDetail.address.trueName}</Text>
                                <Text style={{ fontSize: 14, color: '#000000' }}>{props.orderDetail.address.mobPhone}</Text>
                            </View>
                            <View style={styles.addrTwoView}>
                                <Image
                                    source={require('../../img/cars_dw.png')}
                                    style={{ width: 15, height: 15 }}
                                />
                                <View style={{ width: width - 60 }}>
                                    <Text style={{ fontSize: 13, color: '#000000' }}>{props.orderDetail.address.areaInfo + props.orderDetail.address.address}</Text>
                                </View>
                                <Image
                                    source={require('../../img/home_to.png')}
                                    style={{ width: 15, height: 15 }}
                                />
                            </View> 
                        </View>

                        {props.orderDetail.orderGoodsList.map(item => (
                            <GoodsIndex
                                key={item.goodId}
                                goods={item}
                            />
                        )
                        
                        )}
                        <View style={{ width: width, paddingVertical: 15, backgroundColor: 'white', marginTop: 10 }}>
                            <View style={{ width: width, paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontSize: 12, color: '#696969' }}>留言：</Text>
                                <Text  numberOfLines={1} style={{ fontSize: 12, color: '#696969' }}>{props.orderDetail.orderMessage}</Text>
                            </View>
                            <View style={{ width: width, paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ fontSize: 12, color: '#696969' }}>运费（包邮）</Text>
                                <Text style={{ fontSize: 12, color: '#696969' }}>{'￥'+props.orderDetail.shippingFee}</Text>
                            </View>
                            <View style={{ width: width, paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ fontSize: 14, color: '#696969' }}>实付款（含运费）</Text>
                                <Text style={{ fontSize: 14, color: '#ea3131', fontWeight: 'bold' }}>{'￥' + props.orderDetail.orderTotalPrice}</Text>
                            </View>
                        </View>
                        <View style={{ width: width, padding: 15, backgroundColor: 'white', marginTop: 10 }}>
                            <Text style={{marginBottom:5,fontSize: 12, }}>物流单号：</Text>
                            {!!props.expressVoList &&
                            props.expressVoList.map((item,i)=>(
                                <View key={i} style={{flexDirection:'row',justifyContent: 'space-between',paddingVertical:5}}>
                                    <Text style={{fontSize: 12, color: '#858585',}}>{item.seName}</Text>
                                    <Text style={{fontSize: 12, color: '#858585',}}  selectable={true}>{item.shippingCode}</Text>
                                </View> 
                            ))
                            
                            }
                        </View>
                        <View style={{ width: width, padding: 15, backgroundColor: 'white', marginTop: 10 }}>
                            <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>{'订单编号：' + props.orderDetail.orderSn}</Text>
                            <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>{'支付宝交易号：' + props.orderDetail.paySn}</Text>
                            {/* {!!props.orderDetail.shippingCode && <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>{'物流单号：' + props.orderDetail.shippingCode}</Text>} */}
                            {/* {!!props.expressInfo && <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>'物流单号：' {props.expressInfo}</Text>} */}
                            <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>{'创建时间：' + props.orderDetail.createTimeStr}</Text>
                            {!!props.orderDetail.paymentTimeStr && <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>{'付款时间：' + props.orderDetail.paymentTimeStr}</Text>}
                            {!!props.orderDetail.shippingTimeStr && <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>{'发货时间：' + props.orderDetail.shippingTimeStr}</Text>}
                            {!!props.orderDetail.finnshedTimeStr && <Text style={{ fontSize: 11, color: '#858585', marginTop: 6 }}>{'确认收货时间：' + props.orderDetail.finnshedTimeStr}</Text>}
                        </View>
                    </View>
                 }

                </ScrollPage>
                {this.renderBottom()}
            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        orderDetail:store.mineStore.orderDetail,
        expressVoList:store.mineStore.expressVoList
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addrView: {
        padding: 15,
        width: width,
        backgroundColor: 'white'
    },
    addrOneView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 23
    },
    addrTwoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
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
        justifyContent: 'flex-end'
    },
    bottomSmallView: {
        width: 0.2 * width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBigView: {
        width: width * 0.3,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    goodsText: {
        width: width,
        padding: 15,
        marginVertical: 1,
        backgroundColor: 'white'
    },
    titleText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    priceText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 5
    },
    itemView: {
        width: width,
        marginVertical: 1,
        backgroundColor: 'white',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    firstText: {
        fontSize: 14,
        color: '#a3a3a3'
    },
    secondText: {
        fontSize: 11,
        color: '#727070',
        marginRight: 10
    },
    thirdText: {
        fontSize: 11,
        color: '#000000',
    },
    indexLeftView: {
        height: 50,
        width: 100,
        backgroundColor: '#ea3131',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});
