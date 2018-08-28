import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度
import { ifIphoneX} from 'react-native-iphone-x-helper'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { getWallet } from '../action/index';



class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidMount = () => {
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
                    title='我的钱包'
                    bg={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgImg={require('../../img/mine_qbbg.png')}
                    bgStyle={{ 
                        ...ifIphoneX({ height: 304}, { height:280 })
                     }}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                >
                    <View style={styles.midView}>
                        <Text style={{ fontSize: 31, color: 'white', fontWeight: 'bold' }}>总资产</Text>
                        <Text style={{ fontSize: 16, color: 'white', marginTop: 10 }}>{'金额：' + (this.props.wallet.availablePredeposit + this.props.wallet.freezePredeposit).toFixed(2) + '元'}</Text>
                    </View>
                    <Image
                        source={require('../../img/mine_touming.png')}
                        style={styles.tmImgView}
                    />
                    <View style={styles.bottomView}>
                        <View style={styles.indexView}>
                            <Text style={{ fontSize: 13, color: 'white', marginBottom: 5 }}>已存金额</Text>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>{this.props.wallet.availablePredeposit}</Text>
                        </View>
                        <View style={styles.indexView}>
                            <Text style={{ fontSize: 13, color: 'white', marginBottom: 5 }}>奖励金额</Text>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>{this.props.wallet.freezePredeposit}</Text>
                        </View>
                        <View style={styles.indexView}>
                            <Text style={{ fontSize: 13, color: 'white', marginBottom: 5 }}>积分</Text>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>{this.props.wallet.memberPoints?this.props.wallet.memberPoints.toFixed(0) : 0}</Text>
                        </View>
                    </View>
                    <View style={{ position: 'relative', top: -65 }} onPress={() => this.props.navigator.push({ target: 'ChongZhi' })}>
                        <TouchableOpacity style={styles.lineView} onPress={() => this.props.navigator.push({ target: 'ChongZhi' })}>
                            <View style={{ height: 40, alignItems: 'center', flexDirection: 'row' }}>
                                <Image
                                    source={require('../../img/mine_qbcz.png')}
                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                />
                                <Text style={{ fontSize: 16, color: 'black' }}>充值</Text>
                            </View>
                            <Image
                                source={require('../../img/home_to.png')}
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.lineView} onPress={() => this.props.navigator.push({ target: 'TiXian' })}>
                            <View style={{ height: 40, alignItems: 'center', flexDirection: 'row' }}>
                                <Image
                                    source={require('../../img/mine_qbtx.png')}
                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                />
                                <Text style={{ fontSize: 16, color: 'black' }}>提现</Text>
                            </View>
                            <Image
                                source={require('../../img/home_to.png')}
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.lineView} onPress={() => this.props.navigator.push({ target: 'Bank' })}>
                            <View style={{ height: 40, alignItems: 'center', flexDirection: 'row' }}>
                                <Image
                                    source={require('../../img/mine_qbyhk.png')}
                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                    resizeMode={'contain'}
                                />
                                <Text style={{ fontSize: 16, color: 'black' }}>银行卡</Text>
                            </View>
                            <Image
                                source={require('../../img/home_to.png')}
                                style={{ height: 20, width: 20 }}

                            />
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.lineView} onPress={() => this.props.navigator.push({ target: 'MyTicket' })}>
                            <View style={{ height: 40, alignItems: 'center', flexDirection: 'row' }}>
                                <Image
                                    source={require('../../img/mine_qbqb.png')}
                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                    resizeMode={'contain'}
                                />
                                <Text style={{ fontSize: 16, color: 'black' }}>券包</Text>
                            </View>
                            <Image
                                source={require('../../img/home_to.png')}
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity> */}
                        {props.wallet.restatus && (props.wallet.restatus == '99') &&
                        <TouchableOpacity style={styles.lineView} onPress={() => this.props.navigator.push({ target: 'YueliOrder' ,params:{reAmount:props.wallet.reAmount} })}>
                            <View style={{ height: 40, alignItems: 'center', flexDirection: 'row' }}>
                                <Image
                                    source={require('../../img/mine_ylorder.png')}
                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                    resizeMode={'contain'}
                                />
                                <Text style={{ fontSize: 16, color: 'black' }}>月利订单</Text>
                            </View>
                            <Image
                                source={require('../../img/home_to.png')}
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity>
                        }
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        wallet: store.mineStore.wallet
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },

    bgImgView: {
        position: 'absolute',
        top: 0,
        height: 280,
        width: width
    },
    tmImgView: {
        height: 75,
        width: width,
    },
    midView: {
        height: 140,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000'
    },
    bottomView: {
        height: 75,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    indexView: {
        backgroundColor: '#00000000',
        height: 75,
        width: 0.33 * width,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -75
    },
    lineView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 40,
        width: width,
        backgroundColor: '#ffffff',
        marginBottom: 1
    }
});
