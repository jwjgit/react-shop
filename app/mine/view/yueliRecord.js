// 首页
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
// import { TabBar, NoticeBar, ActivityIndicator } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getyueliRecord } from '../action/index';

// reoStatus:
// order_1 报单中 order_2已报单 order_3收益中 order_4待结算 order_5已结算 order_6已关闭 order_7提现


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount = ()=>{
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'regular.getOrderHisList',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getyueliRecord(obj))
    }

    showRecordList = (item , i) => {
        let lgType = item.lgType
        let state = ''
        switch(lgType) {
            case 'order_1':
                state = '报单中'
            break;
            case 'order_2':
                state = '已报单'
            break;
            case 'order_3':
                state = '收益中'
            break;
            case 'order_4':
                state = '待结算'
            break;
            case 'order_5':
                state = '已结算'
            break;
            case 'order_6':
                state = '已关闭'
            break;
            case 'order_7':
                state = '提现'
            break;
        }
        return (
            <View style={styles.recorditem} key={i}>
                <View style={styles.top}>
                    <Text style={{fontSize:14,color:'#53575E',lineHeight:30}}>{item.orderSn}</Text>
                    <Text style={{fontSize:14,color:'#53575E'}}>{state}</Text>
                </View>
                <View style={styles.hang}>
                    <Text style={{fontSize:20,color:'#53575E'}}>￥<Text style={{fontSize:27,fontWeight:'bold'}}>{item.reoAmount}</Text></Text>
                    <Text style={{fontSize:12,color:'#93949A'}}>{item.updateTimeStr}</Text>
                </View>
            </View>
        )
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'记录'}
                    barStyle="light-content"
                    isScroll={true}
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    <View style={{ width: width, backgroundColor:'#fff',paddingBottom:10}}>
                        {props.yueliRecord.map((item, i) => (
                            this.showRecordList(item , i)
                        ))}
                        
                        
                        
                        
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        yueliRecord: store.mineStore.yueliRecord,
        sessionId: store.userStore.sessionId,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    recorditem:{
        backgroundColor:'#fff',
        marginHorizontal:15,
        borderBottomWidth:1,
        borderBottomColor:'#EBEBEB',
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:3,
    },
    hang:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:40,
        paddingBottom:10,
    }
});
