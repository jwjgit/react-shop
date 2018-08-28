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

import { Toast, Picker, DatePicker, Modal } from 'antd-mobile'
import OrderCard from '../component/ordercard'

import { updateUserinfo } from '../../action/index';

const prompt = Modal.prompt;

let minDate = new Date(1900, 0, 1);
const sex = [
    {
        label: '男',
        value: '1',
    },
    {
        label: '女',
        value: '2',
    },
];


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewState: false,
            name: props.userInfo.nickName,
            sex: props.userInfo.sex,
            date: null
        };
    }

    changeUserName = () => {
        let { dispatch } = this.props
        dispatch(changeName())
    }

    changeName = () => {
        prompt('修改昵称', '请输入新的昵称',
            [
                { text: '关闭' },
                {
                    text: '修改',
                    onPress: value => this.setState({ name: value })

                },
            ], 'default', null, ['请输入昵称'])
    }

    update = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'user.changeUser',
        }
        obj['timestamp'] = timestamp
        obj['nickName'] = this.state.name
        obj['sex'] = this.state.sex[0]
        obj['birthday'] = !!this.state.date ? this.formatDate(this.state.date) : this.props.userInfo.birthday
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(updateUserinfo(obj, this.props.userInfo))
        this.setState({ viewState: false })
    }

    formatDate = (date) => {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }


    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.headView}>
                        <Text>头像</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image
                                source={{ uri: props.userInfo.avatar }}
                                style={{ height: 30, width: 30, borderRadius: 15, }}
                            />
                            <Image
                                source={require('../../../img/home_to.png')}
                                style={{ width: 15, height: 15, marginLeft: 10 }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.indexView} onPress={() => this.changeName()} disabled={!this.state.viewState}>
                        <Text>昵称</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text>{this.state.name}</Text>
                            <Image
                                source={require('../../../img/home_to.png')}
                                style={{ width: 15, height: 15, marginLeft: 10 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <Picker
                        data={sex}
                        cols={1}
                        disabled={!this.state.viewState}
                        title="选择性别"
                        cascade={true}
                        extra={!!props.userInfo.sex ? props.userInfo.sex : '请选择'}
                        value={this.state.sex}
                        onChange={v => this.setState({ sex: v })}
                        onOk={v => this.setState({ sValue: v })}
                    >
                        <SexView />
                    </Picker>

                    <DatePicker
                        mode="date"
                        minDate={minDate}
                        disabled={!this.state.viewState}
                        title="选择日期"
                        extra={!!props.userInfo.birthday ? props.userInfo.birthday : '请填写你的出生日期'}
                        value={this.state.date}
                        onChange={date => this.setState({ date: date })}
                    >
                        <TimeView />
                    </DatePicker>
                    {this.state.viewState ?
                        <TouchableOpacity style={styles.indexLeftView} onPress={() => this.update()}>
                            <Text style={styles.setText}>保存信息</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.indexLeftView} onPress={() => this.setState({ viewState: true })}>
                            <Text style={styles.setText}>修改信息</Text>
                        </TouchableOpacity>
                    }

                </ScrollView>

            </View>
        )
    }

}

const SexView = props => (

    <TouchableOpacity style={styles.indexView} onPress={props.onClick}>
        <Text>性别</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text>{props.extra}</Text>
            <Image
                source={require('../../../img/home_to.png')}
                style={{ width: 15, height: 15, marginLeft: 10 }}
            />
        </View>
    </TouchableOpacity>
)

const TimeView = props => (

    <TouchableOpacity style={styles.indexView} onPress={props.onClick}>
        <Text>出生日期</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text>{props.extra}</Text>
            <Image
                source={require('../../../img/home_to.png')}
                style={{ width: 15, height: 15, marginLeft: 10 }}
            />
        </View>
    </TouchableOpacity>
)

function select(store) {
    return {
        userInfo: store.userStore.userInfo,
        sessionId: store.userStore.sessionId
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    headView: {
        width: width,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    indexView: {
        height: 45,
        width: width,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginTop: 0.5

    },
    indexLeftView: {
        height: 40,
        width: width * 0.8,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        marginLeft: 0.1 * width,
        marginTop: 30
    },
    setText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },


});
