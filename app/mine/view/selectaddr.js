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
import { TabBar, Icon, Modal } from 'antd-mobile'
import AddrCard from './component/addrcard'
import ScrollPage from '../../component/scrollpage'

import { connect } from 'react-redux';
import { getMoAddr } from '../action/index';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isclick: false,
            isChange: false,
        };
    }

    selectAddr = (obj) => {
        let { dispatch } = this.props
        dispatch(getMoAddr(obj,this.callback))
        this.props.navigator.pop()
    }
    callback = (cityId) =>{
        // if(this.props.selectedAddr){
        //     this.getPostfee(this.props.selectedAddr.cityId)
        // }
        this.props.changeFee(cityId)
    }

    deleteAddr = () => {
        Modal.alert('', '确认删除地址吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => console.log('ok') },
        ]);
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='选择收货地址'
                    left={require('../../img/back.png')}
                    leftClick={() => props.navigator.pop()}
                    right={require('../../img/tianjia.png')}
                    rightClick={() => this.props.navigator.push({ target: 'EditAddr' })}
                    bg={true}
                    barStyle="light-content"
                    isScroll={true}
                    bgImg={require('../../img/navbar_bg.png')}
                    navigator={this.props.navigator}
                >
                    <View style={{ width: width, flex: 1, alignItems: 'center', }}>

                        {props.addrArr.length === 0 ?
                            <TouchableOpacity style={styles.indexLeftView} onPress={() => this.props.navigator.push({ target: 'EditAddr' })}>
                                <Text style={styles.setText}>新建地址</Text>
                            </TouchableOpacity>
                            :
                            props.addrArr.map(item => (
                                <AddrCard
                                    key={item.addressId}
                                    info={item}
                                    onClick={(p) => this.selectAddr(p)}
                                    disabled={false}
                                    navigator={this.props.navigator}
                                />
                            ))
                        }
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        addrArr: store.mineStore.addrArr
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    bottomView: {
        width: width,
        height: 50,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: Platform.OS == 'ios' ? 0 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 35,
        width: width * 0.85,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop:20
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
