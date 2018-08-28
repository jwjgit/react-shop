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
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { connect } from 'react-redux';
import { } from '../action/index';

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

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    changeUserName = () => {
        let { dispatch } = this.props
        dispatch(changeName())
    }

    allSelect = () => {
        let dataArr = this.props.carsArr.map(item => {
            let temp = item
            temp.isClick = !this.state.isclick
            return temp
        })


        this.setState({
            isclick: !this.state.isclick,
        })

        let { dispatch } = this.props
        dispatch(changeName(dataArr))
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
                    title='管理收货地址'
                    barStyle="light-content"
                    left={require('../../img/back.png')}
                    leftClick={() => props.navigator.pop()}
                    bg={true}
                    bgImg={require('../../img/navbar_bg.png')}
                    navigator={this.props.navigator}
                >
                    <View style={{ width: width, height: height - 114, alignItems: 'center', }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            automaticallyAdjustContentInsets={false}
                        >
                            {props.addrArr.map(item => (
                                <AddrCard
                                    key={item.zipCode}
                                    info={item}
                                    disabled={true}
                                    navigator={this.props.navigator}
                                />
                            ))
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={styles.indexLeftView} onPress={() => this.props.navigator.push({ target: 'EditAddr' })}>
                            <Text style={styles.setText}>新建地址</Text>
                        </TouchableOpacity>
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
        ...ifIphoneX({
            bottom: 34
        }, {
                bottom: Platform.OS == 'ios' ? 0 : 0,
            }),
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
