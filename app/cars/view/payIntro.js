import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    View,
    Platform
} from 'react-native';

import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Modal } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'



class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

   

    render() {
        let props = this.props
        console.log(this.props.type)
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'协议及声明'}
                    titleStyle={{ color: '#000' }}
                    bgbarStyle={{backgroundColor:'#fff',borderBottomColor:'#b3b3b3',borderBottomWidth:1}}
                    barStyle="dark-content"
                    navigator={this.props.navigator}
                    left={require('../../img/home_back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    isScroll={true}
                >
                <View style={styles.content}>
                    <Text style={{fontSize:16,color:'#000',marginBottom:15,lineHeight:18}}>支付说明：</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>1.支付方式有哪些？</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>目前我们仅支持积分支付、余额支付（注：余额支付里包含钱包余额和奖励金额两种支付方式）和支付宝支付三种支付方式，其他支付功能正在努力开发中，敬请期待。</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>2.如何选择支付顺序？</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>在进行交易支付时，保证积分足够支付的情况下，系统会默认选择优先扣除您的积分；</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>倘若积分为0或是不足时，系统会先扣除您现有的积分，剩下的金额将由余额支付或支付宝支付继续进行；
当选择余额支付时，会优先扣除奖励金额，然后才是钱包余额。</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>3.支付时有哪些注意事项？</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>当选择只用积分支付时，而余额不满90元（即＜90元），将无法确认支付并提交订单（请您确保在只使用积分消费时，余额不少于90元，以免影响正常支付，感谢配合）。
</Text>
                    <Text style={{fontSize:14,color:'#000',marginBottom:15,lineHeight:18}}>*所有解释权均归南京浦利昂网络科技有限公司所有，如有疑问，请联系客服。</Text>
                </View>
                   
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    content:{
        backgroundColor: '#fff',
        marginTop:7,
        padding:25,
    }
});
