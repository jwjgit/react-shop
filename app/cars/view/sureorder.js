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
    TextInput
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Drawer,InputItem } from 'antd-mobile'
import GoodsIndex from './component/goodsindex'
import ScrollPage from '../../component/scrollpage'

import { selectAddr, getOrderList, submitOrder ,getPostfee} from '../action/index';
import { getMoAddr } from '../../mine/action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isclick: false,
            isChange: false,
            modalVisible: false,
            leaveMessage:''
        };
    }
   
    componentWillMount = () => {
        let { dispatch } = this.props
        if (!!this.props.addrArr) {
            for (let i = 0; i < this.props.addrArr.length; i++) {
                if (this.props.addrArr[i].isDefault === '1') {
                    dispatch(getMoAddr(this.props.addrArr[i],this.callback))
                }
            }
        }
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.cartGoodsList',
        }
        obj['timestamp'] = timestamp
        obj['cartIds'] = this.props.carsId
        obj['sessionId'] = this.props.sessionId
        dispatch(getOrderList(obj))
    }

    callback = (cityId) =>{
        // if(this.props.selectedAddr){
        //     this.getPostfee(this.props.selectedAddr.cityId)
        // }
        this.getPostfee(cityId)
    }
   

    getPostfee = (cityId) =>{
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'goods.queryFreight',
        }
        obj['timestamp'] = timestamp
        obj['cartIds'] = this.props.carsId
        obj['sessionId'] = this.props.sessionId
        obj['cityId'] = cityId
        let { dispatch } = this.props
        dispatch(getPostfee(obj))
    }

    allSelect = () => {
        let dataArr = this.props.carsArr.map(item => {
            let temp = item
            temp.isClick = !this.state.isclick
            return temp
        })

        this.setState({
            isclick: !this.state.isclick,
        })

        let { dispatch } = this.props
        dispatch(changeName(dataArr))
    }

    subOrder = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.submitOrder',
        }
        obj['timestamp'] = timestamp
        obj['transportFee'] = this.props.postfee
        obj['cartIds'] = this.props.carsId
        obj['sessionId'] = this.props.sessionId
        obj['storeIds'] = '0'
        obj['addressId'] = this.props.selectedAddr.addressId
        obj['orderMessage'] = this.state.leaveMessage
        obj['paytype'] = '1'
        let { dispatch } = this.props
        dispatch(submitOrder(obj, this.props.navigator))
    }


    render() {
        let props = this.props

        return (
            <View style={styles.container}>
                <ScrollPage
                    title='确认订单'
                    barStyle="dark-content"
                    navigator={this.props.navigator}
                    bg={true}
                    titleStyle={{ color: 'black' }}
                    bgImg={require('../../img/white_bg.jpg')}
                    left={require('../../img/home_back.png')}
                    leftClick={() => props.navigator.pop()}
                    isScroll={true}
                >
                    <View style={{ paddingBottom: 50}}>
                        {(props.addrArr.length === 0 ||  Object.keys(props.selectedAddr).length == 0  )  ?
                            <TouchableOpacity style={styles.addrView} onPress={() => this.props.navigator.push({ target: 'SelectAddr',params:{changeFee:(e)=>{this.getPostfee(e)}  } })}>
                                <View style={{ width: width, padding: 10, flexDirection: 'row', alignItems: 'center', }}>
                                    <Image
                                        source={require('../../img/addadd.png')}
                                        style={{ height: 20, width: 20 }}
                                    />
                                    <Text style={{ fontSize: 16, color: 'black', marginLeft: 15 }}>请选择地址</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.addrView} onPress={() => this.props.navigator.push({ target: 'SelectAddr' ,params:{changeFee:(e)=>{this.getPostfee(e)}  } })}>
                                <View style={styles.addrOneView}>
                                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{'收货人：' + props.selectedAddr.trueName}</Text>
                                    <Text style={{ fontSize: 14, color: '#000000' }}>{props.selectedAddr.mobPhone}</Text>
                                </View>
                                <View style={styles.addrTwoView}>
                                    <Image
                                        source={require('../../img/cars_dw.png')}
                                        style={{ width: 15, height: 15 }}
                                    />
                                    <View style={{ width: width - 60,paddingHorizontal:8 }}>
                                        <Text style={{ fontSize: 13, color: '#000000',paddingRight:0 }}>{props.selectedAddr.areaInfo + props.selectedAddr.address}</Text>
                                    </View>
                                    <Image
                                        source={require('../../img/home_to.png')}
                                        style={{ width: 15, height: 15 }}
                                    />
                                </View>
                            </TouchableOpacity>
                        }
                        <Image
                            source={require('../../img/cars_addrline.png')}
                            style={{ width: width, height: 6 }}
                        />
                        {this.props.goodsArr.map(item => (
                            <GoodsIndex
                                key={item.goodId}
                                goods={item}
                            />
                        )
                        )}
                        <View style={[styles.itemView, { justifyContent: 'space-between' }]}>
                            <Text style={{ fontSize: 13, color: '#000000' }}>{'共' + props.orderGoods.goodsNum + '件商品  小计'}</Text>
                            <Text style={{ fontSize: 14, color: '#ea3131', fontWeight: 'bold' }}>{'￥' + props.orderGoods.goodsTotalPrice}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={{ fontSize: 15, color: '#000000' }}>买家留言：</Text>
                            <TextInput
                            style={styles.messageInput}
                            keyboardType={'default'}
                            // textAlign={'center'}
                            clearButtonMode='while-editing'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ leaveMessage: text })}
                            // selection={{start:0,end:-1}}
                             />
                        </View>
                        <View style={[styles.itemView, { justifyContent: 'space-between' }]}>
                            <Text style={{ fontSize: 15, color: '#000000' }}>{'配送费：  '+(this.props.postfee?this.props.postfee:0)+'元'}</Text>
                        </View>
                    </View>
                    

                </ScrollPage>
                <View style={styles.bottomView}>
                        <Text style={{ fontSize: 14, color: '#000000', marginRight: 10 }}>
                            共
                        <Text style={{ fontSize: 13, color: '#ea3131' }}>{props.orderGoods.goodsNum}</Text>
                            件,合计：
                        <Text style={{ fontSize: 16, color: '#ea3131' }}>{'￥' + parseFloat(this.props.postfee+this.props.orderGoods.goodsTotalPrice)}</Text>
                        </Text>
                        <TouchableHighlight style={styles.indexLeftView} onPress={() => this.subOrder()}>
                            <Text style={{ fontSize: 16, color: '#ffffff' }}>提交订单</Text>
                        </TouchableHighlight>
                    </View>
            </View>
        )
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

}

function select(store) {
    return {
        addrArr: store.mineStore.addrArr,
        selectedAddr: store.mineStore.moAddr,
        carsId: store.carsStore.carsId,
        sessionId: store.userStore.sessionId,
        orderGoods: store.carsStore.orderGoods,
        postfee: store.carsStore.postfee
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
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
    messageInput:{
        width: 0.7 * width,
        // borderRadius: 5,
        height: 40,
        // backgroundColor: 'white',
        fontSize: 14,
        // marginTop: 10
    }
});
