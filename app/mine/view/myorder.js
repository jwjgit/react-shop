import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ActivityIndicator,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { Tabs, WhiteSpace, Badge } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import AllOrder from './page/allorder'
import UnPayOrder from './page/unpayorder'
import UnSendOrder from './page/unsendorder'
import UnGetOrder from './page/ungetorder'
import FinishOrder from './page/finishorder'

import { getOrderList } from '../action/index';

const tabs = [
    { title: '全部' },
    { title: '待付款' },
    { title: '待发货' },
    { title: '待收货' },
    { title: '已收货' },
];

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.getOrderList',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getOrderList(obj))
    }

    
    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='我的订单'
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    {this.props.orderList.length === 0 ?
                        // <ActivityIndicator
                        //     size="large"
                        //     color="red"
                        //     style={{marginTop:20}}
                        // />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Image
                                source={require('../../img/searchkong.png')}
                                style={{ width: 150, height: 150, marginTop: 50 }}
                            />
                            <Text style={{ fontSize: 20, color: 'gray', marginTop: 20 }}>暂时木有内容呀~~~</Text>
                        </View>
                        :
                        <View style={styles.tabView}>
                            <Tabs tabs={tabs}
                                initialPage={this.props.pageId}
                                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                                //tabBarUnderlineStyle={'#ea3131'}
                                tabBarUnderlineStyle={{backgroundColor:'#ea3131'}}
                                tabBarActiveTextColor='#5C5C5C'
                                tabBarInactiveTextColor='#8C8C8C'
                            >
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                    <AllOrder
                                        navigator={this.props.navigator}
                                    />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                    <UnPayOrder navigator={this.props.navigator} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                    <UnSendOrder navigator={this.props.navigator} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                    <UnGetOrder navigator={this.props.navigator} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                    <FinishOrder navigator={this.props.navigator} />
                                </View>
                            </Tabs>
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
        orderList: store.mineStore.orderList
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    tabView: {
        flex: 1,
        height: 200,
        width: width
    }

});
