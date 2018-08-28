import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    View,
    Switch,
    TextInput,
    Platform
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度
import ScrollPage from '../../component/scrollpage'

import { TabBar, InputItem, Picker } from 'antd-mobile'
import AddrCard from './component/addrcard'

import city from '../../json/city.json';

import { updateAddr } from '../action/index';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isclick: false,
            isChange: false,
            pickerValue: '',
            area: [props.info.provinceId, props.info.cityId, props.info.areaId],
            name: props.info.trueName,
            phone: props.info.mobPhone,
            mail: props.info.zipCode,
            addr: props.info.address,
            isMo: props.info.isDefault === '1'
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

    upAddr = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'user.updateAddress',
        }
        obj['timestamp'] = timestamp
        obj['addressId'] = this.props.info.addressId
        obj['trueName'] = this.state.name
        obj['areaInfo'] = this.getArea()
        obj['address'] = this.state.addr
        obj['mobPhone'] = this.state.phone
        obj['isDefault'] = this.state.isMo ? '1' : '0'
        obj['zipCode'] = !!this.state.mail ? this.state.mail : '000'
        obj['sessionId'] = this.props.sessionId
        obj['provinceId'] = this.state.area[0]
        obj['cityId'] = this.state.area[1]
        obj['areaId'] = this.state.area[2]
        let { dispatch } = this.props
        dispatch(updateAddr(obj, this.props.navigator))
    }

    getArea = () => {
        let str = ''
        for (let i = 0; i < city.length; i++) {
            if (this.state.area[0] === city[i].value) {
                str = str + city[i].label + ' '
                if (city[i].children !== null) {
                    for (let j = 0; j < city[i].children.length; j++) {
                        if (this.state.area[1] === city[i].children[j].value) {
                            str = str + city[i].children[j].label + ' '
                            for (let k = 0; k < city[i].children[j].children.length; k++) {
                                if (this.state.area[2] === city[i].children[j].children[k].value) {
                                    str = str + city[i].children[j].children[k].label
                                }
                            }
                        }
                    }
                }
            }
        }
        return str
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='修改收货地址'
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    <View style={{ flex: 1, width: width, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, justifyContent: 'space-between', borderBottomColor: '#ebebeb', borderBottomWidth: 0.8, width: 0.95 * width }}>
                            <Text style={{ color: '#5c5c5c', fontSize: 15, }}>收货人</Text>
                            <TextInput
                                keyboardType={'default'}
                                value={this.state.name}
                                placeholder='请输入名字'
                                onChangeText={(text) => this.setState({ name: text })}
                                underlineColorAndroid={'transparent'}
                                style={{ width: 0.6 * width, padding: 0, fontSize: 15 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, justifyContent: 'space-between', borderBottomColor: '#ebebeb', borderBottomWidth: 0.8, width: 0.95 * width }}>
                            <Text style={{ color: '#5c5c5c', fontSize: 15, }}>联系号码</Text>
                            <TextInput
                                keyboardType={'default'}
                                value={this.state.phone}
                                placeholder='请输入11位手机号码'
                                onChangeText={(text) => this.setState({ phone: text })}
                                underlineColorAndroid={'transparent'}
                                style={{ width: 0.6 * width, padding: 0, fontSize: 15 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, justifyContent: 'space-between', borderBottomColor: '#ebebeb', borderBottomWidth: 0.8, width: 0.95 * width }}>
                            <Text style={{ color: '#5c5c5c', fontSize: 15, }}>邮编</Text>
                            <TextInput
                                keyboardType={'default'}
                                value={this.state.mail.toString()}
                                placeholder='请输入邮编'
                                onChangeText={(text) => this.setState({ mail: text })}
                                underlineColorAndroid={'transparent'}
                                style={{ width: 0.6 * width, padding: 0, fontSize: 15 }}
                            />
                        </View>
                        <Picker
                            data={city}
                            title="选择区域"
                            cascade={true}
                            extra={this.getArea()}
                            cols={3}
                            value={this.state.area}
                            onChange={(value) => this.setState({ area: value })}
                            //onChange={(v, b) => console.log(v + b)}
                            onOk={value => this.setState({ area: value })}
                        >
                            <CustomChildren />
                        </Picker>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, justifyContent: 'space-between', borderBottomColor: '#ebebeb', borderBottomWidth: 0.8, width: 0.95 * width }}>
                            <Text style={{ color: '#5c5c5c', fontSize: 15, }}>详细地址</Text>
                            <TextInput
                                keyboardType={'default'}
                                placeholder='请输入详细地址'
                                value={this.state.addr}
                                onChangeText={(text) => this.setState({ addr: text })}
                                underlineColorAndroid={'transparent'}
                                style={{ width: 0.6 * width, padding: 0, fontSize: 15 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, justifyContent: 'space-between', borderBottomColor: '#ebebeb', borderBottomWidth: 0.8, width: 0.95 * width }}>
                            <Text style={{ color: '#5c5c5c', fontSize: 15, }}>是否设置为默认地址：</Text>
                            <Switch
                                onValueChange={(v) => this.setState({ isMo: v })}
                                onTintColor='red'
                                thumbTintColor={this.state.isMo ? '#ffffff' : '#d0d0d0'}
                                value={this.state.isMo}
                                tintColor='#d0d0d0'
                            />
                        </View>
                        <TouchableOpacity style={styles.indexLeftView} onPress={() => this.upAddr()}>
                            <Text style={styles.setText}>修改地址</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

const CustomChildren = props => (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, justifyContent: 'space-between', borderBottomColor: '#ebebeb', borderBottomWidth: 0.8, width: 0.95 * width }} onPress={props.onClick}>
        <Text style={{ color: '#5c5c5c', fontSize: 15, }}>地区</Text>
        <Text style={{ width: 0.6 * width, padding: 0, fontSize: 15 }}>{props.extra}</Text>
    </TouchableOpacity>
)


function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        carsArr: store.carsStore.carsArr
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    selAddr: {
        borderBottomWidth: 1,
        borderBottomColor: '#d0d0d0',
        width: 0.9 * width
    },
    indexLeftView: {
        height: 40,
        width: width * 0.85,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20
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
