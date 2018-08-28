import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    View
} from 'react-native';
import { TabBar, Icon, Drawer } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import Card from './component/card'
import HeadView from './component/head'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { connect } from 'react-redux';
import { getWallet, getArea } from '../action/index';
import { ToastCom } from '../../component/toast'


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data1: [{ icon: require('../../img/mine_dfk.png'), text: '待付款', onClick: () => this.pushToNext('待付款') },
            { icon: require('../../img/mine_dfh.png'), text: '待发货', onClick: () => this.pushToNext('待发货') },
            { icon: require('../../img/mine_dsh.png'), text: '待收货', onClick: () => this.pushToNext('待收货') },
            { icon: require('../../img/mine_ysh.png'), text: '已收货', onClick: () => this.pushToNext('已收货') },
            { icon: require('../../img/mine_tksh.png'), text: '退款/售后', onClick: () => this.pushToNext('退款/售后') }],
            data3: [{ icon: require('../../img/mine_zhxx.png'), text: '账户信息', onClick: () => this.pushToNext('账户信息') },
            { icon: require('../../img/mine_zhaq.png'), text: '账户安全', onClick: () => this.pushToNext('账户安全') },
            { icon: require('../../img/mine_tjgl.png'), text: '推荐管理', onClick: () => this.pushToNext('推荐管理') },
            { icon: require('../../img/mine_addr.png'), text: '地址管理', onClick: () => this.pushToNext('地址管理') }],
            data2: [{ icon: require('../../img/mine_ye.png'), text: '余额', onClick: () => this.pushToNext('余额') },
            { icon: require('../../img/mine_yhk.png'), text: '银行卡', onClick: () => this.pushToNext('银行卡') },
            { icon: require('../../img/mine_tx.png'), text: '提现', onClick: () => this.pushToNext('提现') },
            { icon: require('../../img/mine_cz.png'), text: '充值', onClick: () => this.pushToNext('充值') }],
            data4: [{ icon: require('../../img/mine_kf.png'), text: '客服', onClick: () => this.props.navigator.push({ target: 'Lianxi', params: { pageId: 0 } }) },
            { icon: require('../../img/mine_yjfk.png'), text: '意见反馈', onClick: () => this.props.navigator.push({ target: 'Back', params: { pageId: 0 } }) },
            { icon: require('../../img/mine_gywm.png'), text: '关于我们', onClick: () => this.props.navigator.push({ target: 'About', params: { pageId: 2 } }) }]
        }
    }

    pushToNext = (title) => {
        if (!!this.props.sessionId) {
            switch (title) {
                case 'all':
                    this.props.navigator.push({ target: 'MyOrder', params: { pageId: 0 } })
                    break
                case '待付款':
                    this.props.navigator.push({ target: 'MyOrder', params: { pageId: 1 } })
                    break
                case '待发货':
                    this.props.navigator.push({ target: 'MyOrder', params: { pageId: 2 } })
                    break
                case '待收货':
                    this.props.navigator.push({ target: 'MyOrder', params: { pageId: 3 } })
                    break
                case '已收货':
                    this.props.navigator.push({ target: 'MyOrder', params: { pageId: 4 } })
                    break
                case '退款/售后':
                    this.props.navigator.push({ target: 'MyOrder', params: { pageId: 0 } })
                    break
                case '余额':
                    this.props.navigator.push({ target: 'MyPurse' })
                    break
                case '银行卡':
                    this.props.navigator.push({ target: 'Bank' })
                    break
                case '提现':
                    this.props.navigator.push({ target: 'TiXian' })
                    break
                case '充值':
                    this.props.navigator.push({ target: 'ChongZhi' })
                    break
                case '账户信息':
                    this.props.navigator.push({ target: 'MyPersonal', params: { pageId: 0, viewUpdate: () => this.renderUpdate() } })
                    break
                case '账户安全':
                    this.props.navigator.push({ target: 'MyPersonal', params: { pageId: 1 } })
                    break
                case '推荐管理':
                    this.props.navigator.push({ target: 'MyPersonal', params: { pageId: 2 } })
                    break
                case '地址管理':
                    this.props.navigator.push({ target: 'MyAddr' })
                    break
                case 'info':
                    this.props.navigator.push({ target: 'MyPersonal', params: { pageId: 0 } })
                    break
            }
        } else {
            ToastCom({ title: 'info', info: '请您先登录！' })
            this.props.navigator.push({ target: 'Login' })
        }
    }

    abc = () => {
        this.props.navigator.push({ target: 'Login' })
    }


    componentWillMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.wallet',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getWallet(obj))
    }


    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    bg={true}
                    bgImg={require('../../img/appbackground.png')}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgStyle={{ 
                        ...ifIphoneX({ height: 176}, { height:152 })
                     }}
                    isScroll={true}
                    title={'我的'}
                    left={require('../../img/home_news.png')}
                    leftClick={() => this.props.navigator.push({ target: 'News' })}
                    right={require('../../img/setting.png')}
                    rightClick={() => this.props.navigator.push({ target: 'Settings' })}
                >
                    <View style={styles.contextView}>
                        {!!props.sessionId ?
                            <HeadView
                                onClick={() => this.props.navigator.push({ target: 'ApproveReal' })}
                            />
                            :
                            <TouchableOpacity style={styles.topView} onPress={() => this.abc()}>
                                <Image
                                    source={require('../../img/head.png')}
                                    style={{ height: 60, width: 60, borderRadius: 30, borderWidth: 0.5, borderColor: 'red' }}
                                />
                                <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'red', marginTop: 15, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
                                    <Text style={{}}>未登录</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <Card
                            title={'我的订单'}
                            data={this.state.data1}
                            seeAll={() => this.pushToNext('退款/售后')}
                        />
                        <Card
                            title={'我的钱包'}
                            data={this.state.data2}
                            seeAll={() => this.pushToNext('余额')}
                        />
                        <Card
                            title={'我的个人'}
                            data={this.state.data3}
                            seeAll={() => this.pushToNext('账户信息')}
                        />
                        <Card
                            title={'我的工具'}
                            data={this.state.data4}
                            seeAll={() => this.props.navigator.push({ target: 'About', params: { pageId: 0 } })}
                        />
                    </View>

                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        username: store.mineStore.username,
        sessionId: store.userStore.sessionId,
        userInfo: store.userStore.userInfo
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        width: width,
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    headImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginLeft: 20
    },
    topTextView: {
        marginLeft: 30
    },
    arrowImg: {
        marginRight: 20,
        width: 30,
        height: 30,
        position: 'absolute',
        right: 20
    },
    imgView: {
        width: width,
        position: 'relative',
        top: -230
    },
    contextView: {
        position: 'relative',
        top: 0,
        width: width,
        alignItems: 'center',
        paddingBottom: 50
    },
    topView: {
        width: 0.9 * width,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 16,
        elevation: 16,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
