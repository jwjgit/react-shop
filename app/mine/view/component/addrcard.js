import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Modal } from 'antd-mobile'

import { connect } from 'react-redux';
import { delAddr } from '../../action/index';


class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isclick: false
        };
    }

    deleteAddrById = (id) => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'user.delAddressById',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['addressId'] = id
        let { dispatch } = this.props
        dispatch(delAddr(obj, this.props.navigator))
    }

    deleteAddr = (id) => {
        Modal.alert('确认删除地址吗？', '', [
            { text: '取消', onPress: () => console.log('cancel'), },
            { text: '确定', onPress: () => this.deleteAddrById(id), style: { color: 'red' } },
        ]);
    }

    updateAddr = () => {
        this.props.navigator.push({ target: 'UpdateAddr', params: { info: this.props.info } })
    }

    render() {
        let props = this.props.info
        return (
            <TouchableOpacity style={styles.container} disabled={this.props.disabled} onPress={() => this.props.onClick(props)}>
                <View style={styles.topView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 14, color: '#000000' }}>{props.trueName}</Text>
                        <Text style={{ fontSize: 14, color: '#000000' }}>{props.mobPhone}</Text>
                    </View>
                    <Text style={{ fontSize: 13, color: '#aba5a5', marginTop: 5 }}>{props.areaInfo + props.address}</Text>
                </View>
                <View style={styles.bottomView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {props.isDefault === '1' &&
                            <Image
                                source={require('../../../img/mine_maddr.png')}
                                style={styles.clickImg}
                            />}
                        {props.isDefault === '1' &&
                            <Text style={{ fontSize: 13, color: 'red', marginLeft: 3 }}>默认地址</Text>}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <TouchableOpacity onPress={() => this.updateAddr()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../img/mine_edit.png')}
                                style={styles.clickImg}
                            />
                            <Text style={{ fontSize: 13, color: '#aba5a5', marginLeft: 3 }}>编辑</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.deleteAddr(props.addressId)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../img/mine_del.png')}
                                style={[styles.clickImg, { marginLeft: 10 }]}
                            />
                            <Text style={{ fontSize: 13, color: '#aba5a5', marginLeft: 3 }}>删除</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

function select(store) {
    return {
        sessionId: store.userStore.sessionId
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        height: 90,
        backgroundColor: 'white',
        paddingLeft: 15,
        marginTop: 15,
        borderRadius: 4,

    },
    topView: {
        height: 60,
        justifyContent: 'center',
        paddingRight: 15
    },
    bottomView: {
        width: width * 0.95 - 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#d0d0d4',
        height: 30
    },
    clickImg: {
        width: 15,
        height: 15,
    },

});
