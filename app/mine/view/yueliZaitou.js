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

import {  Modal ,ActivityIndicator } from 'antd-mobile'
import { connect } from 'react-redux';
import { getChanpinList,zaitou } from '../action/index';

// reoStatus:
// order_1 报单中 order_2已报单 order_3收益中 order_4待结算 order_5已结算 order_6已关闭 order_7提现


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            retId:'',
            startDate:'',
            endDate:'',
            percent:0,
            Jmoney:0,
            retMonth:''
        }
    }

    componentWillMount = ()=>{
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'regular.retype',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getChanpinList(obj,this.callback) )
        
    }

    callback = (arr) =>{
        this.changeCont(arr[0])
    }

    // componentDidMount = ()=>{
    //     console.log(this.props.chanpinList)
    //     // this.changeCont(this.props.chanpinList[0]);

    // }

    chineseNum = (num) =>{
        switch(num) {
        case 1:
            return '一'
        break;
        case 2:
            return '二'
        break;
        case 3:
            return '三'
        break;
        case 4:
            return '四'
        break;
        case 5:
            return '五'
        break;
        case 6:
            return '六'
        break;
        case 7:
            return '七'
        break;
        case 8:
            return '八'
        break;
        case 9:
            return '九'
        break;
        case 10:
            return '十'
        break;
        case 11:
            return '十一'
        break;
        case 12:
            return '十二'
        break;
        }
    }

    format = (date) =>{
        var mat={};
        mat.Y=date.getFullYear();
        mat.M=date.getMonth()+1;//月份记得加1
        mat.M=this.check(mat.M);
        mat.D=date.getDate();
        mat.D=this.check(mat.D);
        // mat.H=date.getHours();
        // mat.H=this.check(mat.H);
        // mat.m=date.getMinutes();
        // mat.m=this.check(mat.m);
        // mat.s=date.getSeconds();
        // mat.s=this.heck(mat.s);
        // mat.d=date.getDay();//星期几
        // mat.d=this.check(mat.d);
        return mat.Y+"年"+mat.M+"月"+mat.D+"日";
        
        
    //     console.log(typeof mat.D)
    //     if(str.indexOf(":")>-1){
    // 　　　　　mat.Y=mat.Y.toString().substr(2,2);
    // 　　　　 return mat.Y+"年"+mat.M+"月"+mat.D+"日";
    //     }
    //     if(str.indexOf("/")>-1){
    //         return mat.Y+"年"+mat.M+"/"+mat.D+" "+mat.H+"/"+mat.m+"/"+mat.s;
    //     }
    //     if(str.indexOf("-")>-1){
    //         return mat.Y+"-"+mat.M+"-"+mat.D+" "+mat.H+"-"+mat.m+"-"+mat.s;
    //     }
    }

    getEndDate = (date,month)=>{
        var mat={};
        mat.Y=date.getFullYear();
        let mon = parseInt(month);
        mat.M = date.getMonth()+ 1 + mon;//月份记得加1
        if(mat.M>12){
            mat.M = mat.M-12;
            mat.Y=mat.Y+1;
        }
        mat.M=this.check(mat.M);
        mat.D=date.getDate();
        mat.D=this.check(mat.D);
        // mat.H=date.getHours();
        // mat.H=this.check(mat.H);
        // mat.m=date.getMinutes();
        // mat.m=this.check(mat.m);
        // mat.s=date.getSeconds();
        // mat.s=this.heck(mat.s);
        // mat.d=date.getDay();//星期几
        // mat.d=this.check(mat.d);
        return mat.Y+"年"+mat.M+"月"+mat.D+"日";
    }

    check=(str)=>{
        str=str.toString();
        if(str.length<2){
            str='0'+ str;
        }
        return str;
    }

    changeCont = (item) =>{
        let newdate = new Date()
        let startDate = this.format(newdate)
        // let endDate = this.getEndDate(newdate)
        let jmoney = this.props.reoAmount*item.retRate
        this.setState({
            retId:item.retId,
            startDate:startDate,
            endDate:this.getEndDate(newdate,item.retMonth),
            percent:item.retRate*100,
            Jmoney:jmoney.toFixed(2),
            retMonth:item.retMonth
        })
       
    }

    ctZaitou = () => {
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'regular.reOrder',
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['sessionId'] = this.props.sessionId
        jsonArr['orderSn'] = this.props.orderSn
        jsonArr['retId'] = this.state.retId
        let { dispatch } = this.props
        dispatch(zaitou(jsonArr,this.props.navigator))
    }
    popModal = (item) => {
        Modal.alert(<Text style={{ marginBottom: 5}}>{'提示 \n '}</Text>,
                <Text textAlign='center' style={{lineHeight:20}}>{'再投金额：' + this.props.reoAmount + ' \n'+
                '产品：'+this.state.retMonth+'个月/利率 '+this.state.percent+'%'+' \n'+
                '到期奖金金：'+this.state.Jmoney+' \n'+
                '起始日期：'+this.state.startDate+' \n'+
                '结束日期：'+this.state.endDate+' \n'
            }</Text>,
                [
                    { text: '取消', onPress: () => console.log('ok'), style: { color: 'red' } },
                    { text: '确定', onPress: () => this.ctZaitou(), style: { color: 'red' } },
                ]);

    }

    render() {
        let props = this.props
         let ctState = true
        // if(this.props.chanpinList.length>0){
        //     this.changeCont(this.props.chanpinList[0]);
        // }else{
        //     ctState = false
        // }
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'再投'}
                    barStyle="light-content"
                    isScroll={true}
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                {ctState? 
                    <View style={{ width: width, paddingBottom:10,alignItems: 'center'}}>
                        
                        <View style={styles.title}>
                            <Image
                                source={require('../../img/yueliagain.png')}
                                style={{ width:21, height:22,marginRight:15,}}
                            />
                            <Text style={{color:'#070707',fontSize:16}}>再投金额：<Text style={{color:'#EA3130',fontSize:13}}>￥</Text><Text style={{fontSize:19,color:'#EA3130',}}>{this.props.reoAmount}</Text></Text>
                        </View>
                        <View style={styles.pro}>
                            <Text style={{color:'#000',fontSize:13,marginBottom:18,paddingHorizontal:15,}}>产品选择</Text>
                            <View style={styles.choose}>
                            {props.chanpinList.map((item, i) => (
                                <TouchableOpacity style={[styles.item ,this.state.retId==item.retId?styles.redBG:'']} key={i} onPress={() => this.changeCont(item)}>
                                    <Text style={[{color:'#000',fontSize:14,marginBottom:3},this.state.retId==item.retId?styles.red:'']}>{item.retName}</Text>
                                    <Text style={[{color:'#4A4D54',fontSize:9},this.state.retId==item.retId?styles.red:'']}>{this.chineseNum(item.retMonth)}个月/利率 {item.retRate*100}%</Text>
                                </TouchableOpacity>
                            ))}
                                <View style={styles.itemMore}>
                                    <Text style={{color:'#848484',fontSize:13,}}>敬请期待</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.cont}>
                            <View style={[styles.group ,styles.borderBottom]}>
                                <Text style={{color:'#4A4D54',fontSize:15,}}>起始日期</Text>
                                <Text style={{color:'#93949A',fontSize:15,}}>{this.state.startDate}</Text>
                            </View>
                            <View style={[styles.group ,styles.borderBottom]}>
                                <Text style={{color:'#4A4D54',fontSize:15,}}>结束日期</Text>
                                <Text style={{color:'#93949A',fontSize:15,}}>{this.state.endDate}</Text>
                            </View>
                            <View style={[styles.group ,styles.borderBottom]}>
                                <Text style={{color:'#4A4D54',fontSize:15,}}>奖励比例</Text>
                                <Text style={{color:'#93949A',fontSize:15,}}>{this.state.percent}%</Text>
                            </View>
                            <View style={styles.group}>
                                <Text style={{color:'#4A4D54',fontSize:15,}}>到期奖励金</Text>
                                <Text style={{color:'#EA3130',fontSize:13,}}>￥<Text style={{fontSize:19,}}>{this.state.Jmoney}</Text></Text>
                            </View>
                        </View>
                        
                        <TouchableOpacity style={{backgroundColor:'#EA3130',width:0.77*width,height:36,borderRadius:18,alignItems: 'center',justifyContent: 'center',marginTop:26}} onPress={() => this.popModal()}>
                            <Text style={{color:'#fff',fontSize:17,}}>确定</Text>
                        </TouchableOpacity>
                    </View>
                : 
                <ActivityIndicator />
               }
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        chanpinList:store.mineStore.chanpinList,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    title:{
       marginVertical: 5,
       flexDirection:'row',
       paddingHorizontal:15,
       height:45,
       backgroundColor:'#fff',
       alignItems: 'center',
       width:width,
    },
    pro:{
        backgroundColor:'#fff',
        paddingLeft:0.0386*width,
        paddingTop:11,
        paddingBottom:6.5,
        marginBottom:2,
    },
    choose:{
        flexDirection:'row',
        flexWrap:'wrap',

    },
    item:{
        backgroundColor:'#FCFCFC',
        height:0.45*width*92/336,
        width:0.448*width,
        borderRadius:2,
        borderWidth:1,
        borderColor:'#E4E4E4',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:0.025*width,
        marginBottom:7.4,
    },
    itemMore:{
        backgroundColor:'#F5F4F5',
        height:0.45*width*92/336,
        width:0.448*width,
        borderRadius:2,
        borderWidth:1,
        borderColor:'#E4E4E4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    redBG:{
        borderColor:'#EA3130',
        backgroundColor:'#FFFBF8',
    },
    red:{
        color:'#EA3130',
    },
    cont:{
        backgroundColor:'#fff',
        width:width,
        alignItems: 'center',
        shadowColor:'gray',
        shadowRadius :20
    },
    group:{
        width:0.9*width,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15,
        paddingHorizontal:20,
    },
    borderBottom:{
        borderBottomWidth:1,
        borderBottomColor:'#F5F4F5',
    }
});
