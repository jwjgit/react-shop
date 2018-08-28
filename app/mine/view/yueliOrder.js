import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    FlatList,
    View,
    Modal
} from 'react-native';

import { connect } from 'react-redux';
import { ifIphoneX} from 'react-native-iphone-x-helper'
import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

// import { Modal } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { changeName , getyueliOrder,getbankList } from '../action/index';

// 状态：1 报单中  3收益中y 4待结算y 5已结算 6已关闭 7提现y

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate:Date.parse(new Date())
            // modalVisible: true
            // open: false,
            // datas: [{ time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" },
            // { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" },
            // { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" },]
        };
    }

    componentWillMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'regular.getOrderList',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getyueliOrder(obj))
        
    }

    chineseNum = (num) =>{
        switch(num) {
        case '1':
            return '一'
        break;
        case '2':
            return '二'
        break;
        case '3':
            return '三'
        break;
        case '4':
            return '四'
        break;
        case '5':
            return '五'
        break;
        case '6':
            return '六'
        break;
        case '7':
            return '七'
        break;
        case '8':
            return '八'
        break;
        case '9':
            return '九'
        break;
        case '10':
            return '十'
        break;
        case '11':
            return '十一'
        break;
        case '12':
            return '十二'
        break;
        }
    }

    // setModalVisible(visible) {
    //     this.setState({modalVisible: visible});
    //   }

    pushTixian =(money,orderSn) => {
        // // 判断有没有实名认证
        // if (!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) {
        //     Modal.alert('警告 \n ', '未实名认证无法提现！ \n  ', [
        //         { text: '确定', onPress: () => this.props.navigator.push({ target: 'ApproveReal' }), style: { color: 'red' } },
        //     ]);
        // } else{
            this.props.navigator.push({ target: 'YueliTixian',params:{reoAmount:money,orderSn:orderSn} })
        // }
        
    }

    pushZaitou =(money,orderSn) => {
        this.props.navigator.push({ target: 'YueliZaitou',params:{reoAmount:money,orderSn:orderSn} })
    }


    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='月利订单'
                    isScroll={true}
                    bg={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgImg={require('../../img/mine_qbbg1.png')}
                    bgStyle={{ 
                        ...ifIphoneX({ height: 240}, { height:216 })
                     }}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    right={require('../../img/ctrecord.png')}
                    rightClick={() => this.props.navigator.push({ target: 'YueliRecord' })}
                >
                    <View style={styles.midView}>
                        {/* <Image
                            source={require('../../img/mine_qbbg.png')}
                            style={styles.midViewBgImg}
                        /> */}
                        <Text style={{ fontSize: 31, color: 'white', fontWeight: 'bold' }}>月利总额</Text>
                        <Text style={{ fontSize: 16, color: 'white', marginTop: 10 }}>{'金额：'+this.props.reAmount+'元'}</Text>
                    </View>
                    <View style={{backgroundColor:'#F4F4F4',paddingTop:10}}>
                    
                        {props.yueliList.map((item, i) => (                                                                                                 
                        (item.reoStatus == '4' || item.reoStatus == '7') ?
                        <View style={styles.ctlist} key={i}>
                            <View style={styles.title}>
                                <Text style={{fontSize:14,color:'#4A4D54'}}>{item.orderSn}</Text>
                                <Text style={{fontSize:14,color:'#4A4D54'}}>{item.reoRate*100}%奖励</Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={{fontSize:20,color:'#53575E'}}>￥<Text style={{fontSize:30}}>{item.reoAmount}</Text></Text>
                                {item.reoStatus == '7' ?
                                <View style={styles.rightBtn}>
                                    <View style={styles.rightt}><Text style={{fontSize:15,color:'#fff'}}>提现中</Text></View>
                                </View>
                                :
                                <View style={styles.rightBtn}>
                                    <TouchableOpacity onPress={() => this.pushTixian(item.reoAmount,item.orderSn)} style={[styles.right , {marginRight:7}]}><Text style={{fontSize:15,color:'#fff'}}>提现</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.pushZaitou(item.reoAmount,item.orderSn)} style={styles.right}><Text style={{fontSize:15,color:'#fff'}}>再投</Text></TouchableOpacity>
                                </View>    
                                }  
                            </View>
                            <View style={styles.bottom}>
                                <Text style={{fontSize:12,color:'#93949A'}}>{item.reiStartTimeL}-{item.reiEndTimeL}</Text>
                                <Text style={{fontSize:14,color:'#4A4D54'}}>{this.chineseNum(item.retMonth)}个月</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.ctlist1}  key={i}>
                            <View style={styles.title1}>
                                <Text style={{fontSize:14,color:'#4A4D54'}}>{item.orderSn}</Text>
                                <Text style={{color:'#93949A',fontSize:12}}>{item.reiStartTimeL}-{item.reiEndTimeL}</Text>
                            </View>
                            <View style={styles.content1}>
                                <Text style={{fontSize:20,color:'#53575E'}}>￥<Text style={{fontSize:30}}>{item.reoAmount}</Text></Text>
                                <Text style={{fontSize:15,color:'#53575E'}}>{this.chineseNum(item.retMonth)}个月</Text>
                                <Text style={{fontSize:22,color:'#EA3130'}}>{item.reoRate*100}%<Text style={{fontSize:15}}>奖励</Text></Text>
                            </View>
                        </View>
                    ))}
                    </View>
                    
                </ScrollPage>

                {/* <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 0.7 * width, height: 0.7 * width * 542 / 520, alignItems: 'center' ,backgroundColor:'#fff',borderRadius:3}}>
                            <Image
                                source={require('../../img/light.png')}
                                style={{ width:0.19 * width, height:0.19 * width*204/142, position: 'absolute',top:-0.19*width*102/142}}
                            />
                            <View style={{  marginTop: 0.19*width*102/142+5}}>
                                <Text style={{ fontSize: 16, color: '#5A5E65',marginBottom:5}}>银行卡：12343354354</Text>
                                <Text style={{ fontSize: 16, color: '#5A5E65',marginBottom:5}}>提现银行：{props.moBank.bankName}</Text>
                                <Text style={{ fontSize: 16, color: '#5A5E65' ,marginBottom:5}}>手续费：7‰</Text>
                                <Text style={{ fontSize: 16, color: '#5A5E65' ,marginBottom:5}}>提现金额：￥45334</Text>
                                <Text style={{ fontSize: 16, color: '#5A5E65',marginBottom:5}}>到账金额：￥45334</Text>
                            </View>
                            <View style={{width:0.7 * width,flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,left:0}}>
                                <TouchableOpacity  style={{ width:0.7 * width/2, height:50,justifyContent:'center',alignItems: 'center',  borderTopWidth: 0.8, borderTopColor: '#dddddd' }}
                                    onPress={() => this.setModalVisible(false)}
                                >
                                    <Text style={{ color: '#999', fontSize: 17 }}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:0.7 * width/2, height:50,justifyContent:'center',alignItems: 'center', backgroundColor:'#EA3130', borderTopWidth: 0.8, borderTopColor: '#dddddd' }}
                                    onPress={() => this.openUpdate()}
                                >
                                    <Text style={{ color: '#fff', fontSize: 17 }}>确定</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                </Modal> */}
            </View>
              
        )
    }

}

function select(store) {
    return {
        yueliList: store.mineStore.yueliList,
        sessionId: store.userStore.sessionId,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    midView: {
        height: 150,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    midViewBgImg:{
        width: width,
        height: 150,
        position: 'absolute',
    },
    ctlist:{
      marginBottom:10,
      backgroundColor:"#fff",
      flexDirection:'column',
      paddingHorizontal:10,
      height:124,
    },
    title:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:13,
        paddingTop:15,
    },
    content:{
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
    },
    rightBtn:{
        flexDirection:'row',
        alignItems:'center',
    },
    right:{
        backgroundColor:'#EA3130',
        borderRadius:3,
        width:60,
        height:29,
        alignItems:'center',
        justifyContent: 'center',
    },
    rightt:{
        borderRadius:3,
        width:60,
        height:29,
        alignItems:'center',
        justifyContent: 'center',
        marginRight:7,
        backgroundColor:'#93949A',
    },
    bottom:{
        marginTop:13,
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
        paddingBottom:15,
    },
    ctlist1:{
        marginBottom:10,
        backgroundColor:"#fff",
        flexDirection:'column',
        paddingHorizontal:10,
        height:101,
    },
    title1:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    content1:{
        height:74,
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
    },
    right1:{
        alignItems:'center',
        justifyContent: 'center',
    }

});
