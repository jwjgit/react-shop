import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    RefreshControl,
    View
} from 'react-native';
import { TabBar, PullToRefresh, Drawer } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import CarCom from './component/carcom'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { ToastCom } from '../../component/toast'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getCarList, selectGoods, selectAll, getCarsId, deleteCars } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
        }
    }

    stopRefresh = () => {
        this.setState({
            refresh: false
        })
    }

    componentWillMount = () => {
        this.setState({
            refresh: true
        })
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.cartGoodsList',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getCarList(obj, this.stopRefresh))
    }

    changeSelect = (i) => {
        let { dispatch } = this.props
        dispatch(selectGoods(this.props.selectArr, i))
    }

    selectAllGoods = () => {
        let { dispatch } = this.props
        dispatch(selectAll(this.props.selectArr, this.props.allClick))
    }

    goToOrder = () => {
        if(!(!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) ){
            let str = ''
            let arr = []
            for (let i = 0; i < this.props.selectArr.length; i++) {
                if (this.props.selectArr[i]) {
                    str = str + this.props.carList[i].cartId + ','
                    arr.push(this.props.carList[i])
                }
            }
            let { dispatch } = this.props
            dispatch(getCarsId(str))
            this.props.navigator.push({
                target: 'SureOrder',
                params: {
                    goodsArr: arr
                }
            })
        }else{
            ToastCom({title:'info',info:'购买需要实名认证'})
			this.props.navigator.push({target:'ApproveReal'})
        }
    }

    renderUpdate = () =>{
        this.forceUpdate()
    }

    count = () => {
        let n = 0
        for (let i = 0; i < this.props.selectArr.length; i++) {
            if (this.props.selectArr[i]) {
                n = n + 1
            }

        }
        return n
    }

    isClick = () => {
        for (let i = 0; i < this.props.selectArr.length; i++) {
            if (this.props.selectArr[i]) {
                return false
                break
            }
        }
        return true
    }

    getNum = () => {
        let n = 0
        for (let i = 0; i < this.props.selectArr.length; i++) {
            if (this.props.selectArr[i]) {
                n = n + Number(this.props.carList[i].goodsPrice) * Number(this.props.carList[i].goodsNum)
            }

        }
        return n
    }

    delCars = (id) => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.deleteCart',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['cartIds'] = id
        let { dispatch } = this.props
        dispatch(deleteCars(obj, this.componentWillMount))
    }

    delAllCars = () => {
        let arr = []
        for (let i = 0; i < this.props.selectArr.length; i++) {
            if (this.props.selectArr[i]) {
                arr.push(this.props.carList[i].cartId)
            }
        }
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.deleteCart',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['cartIds'] = arr.toString()
        let { dispatch } = this.props
        dispatch(deleteCars(obj, this.componentWillMount))
    }


    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='购物车'
                    barStyle="light-content"
                    isScroll={false}
                    navigator={this.props.navigator}
                    right={this.state.isChange ? require('../../img/cars_wc.png') : require('../../img/cars_gl.png')}
                    rightClick={() => this.setState({ isChange: !this.state.isChange })}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    {}
                    <View style={{ width: width, height: height - 164 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            automaticallyAdjustContentInsets={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refresh}
                                    onRefresh={() => this.componentWillMount()}
                                    tintColor="#ff0000"
                                    title="加载中..."
                                    titleColor="gray"
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffff00"
                                />
                            }
                        >
                            {props.carList.map((item, i) => (
                                <CarCom
                                    key={item.id}
                                    isclick={props.selectArr[i]}
                                    goods={item}
                                    onClick={() => this.changeSelect(i)}
                                    delCars={(e) => this.delCars(e)}
                                    
                                />
                            ))
                            }
                        </ScrollView>
                    </View>
                    {this.state.isChange ?
                        <View style={styles.bottomView}>
                            <TouchableOpacity onPress={() => this.selectAllGoods()}>
                                <Image
                                    source={props.allClick ? require('../../img/yesclick.png') : require('../../img/noclick.png')}
                                    style={styles.clickImg}
                                />
                            </TouchableOpacity>
                            <Text style={styles.clickText}>全选</Text>
                            <TouchableOpacity style={styles.indexLeftView} disabled={this.isClick()} onPress={() => this.delAllCars()}>
                                <Text style={styles.setText}>删除</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.bottomView}>
                            <TouchableOpacity onPress={() => this.selectAllGoods()}>
                                <Image
                                    source={props.allClick ? require('../../img/yesclick.png') : require('../../img/noclick.png')}
                                    style={styles.clickImg}
                                />
                            </TouchableOpacity>
                            <Text style={styles.clickText}>全选</Text>
                            <Text style={styles.allText}>{'合计:￥' + this.getNum()}</Text>
                            <TouchableOpacity style={styles.indexLeftView} onPress={() => this.goToOrder()} disabled={this.isClick()}>
                                <Text style={styles.setText}>去结算</Text>
                                <Text style={styles.numText}>{'(' + this.count() + ')'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollPage>
            </View>
        )
    }
}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        carList: store.carsStore.carList,
        carNum: store.carsStore.carNum,
        carMoney: store.carsStore.carMoney,
        selectArr: store.carsStore.selectArr,
        allClick: store.carsStore.allClick,
        userInfo:store.userStore.userInfo
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomView: {
        width: width,
        height: 50,
        backgroundColor: 'white',
        position: 'absolute',
        ...ifIphoneX({
            bottom: 84
        }, {
                bottom: Platform.OS == 'ios' ? 50 : 0,
            }),
        flexDirection: 'row',
        alignItems: 'center',
    },
    clickImg: {
        width: 20,
        height: 20,
        marginLeft: 20
    },
    clickText: {
        marginLeft: 12,
        fontSize: 14,
    },
    allText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 30,
        color: 'black'
    },
    indexLeftView: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 100,
        backgroundColor: '#ea3131',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
