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
import { TabBar, Icon, Drawer } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import { ToastCom } from '../../component/toast'
import CountDownButton from 'react-native-smscode-count-down'


import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { setPaySelect, getAuthCode } from '../action/index';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginBtnBg: { backgroundColor: '#bcbcbc' },
            loginBtnTitleColor: { color: '#ffffff' },
            password: '',
            authCode: ''
        }
    }

    phoneNumTextWatch(text) {

        if (text.length > 0) {
            this.setState({
                loginBtnBg: { backgroundColor: '#e52540' },
                loginBtnTitleColor: { color: '#ffffff' },
                password: text
            });
        } else {
            this.setState({
                loginBtnBg: { backgroundColor: '#bcbcbc' },
                loginBtnTitleColor: { color: '#ffffff' },
                password: text
            });
        }
    }

    loginBtnOnClick() {
        // if(this.state.password.length<6){
        //     ToastCom({ title: 'info', info: '支付密码长度至少6个字符' });
        //     return;
        // }
        // if(/\s/.test(this.state.password)){
        //     ToastCom({ title: 'info', info: '支付密码不能输入空格' });
        //     return;
        // }
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'user.setPaymentPassword',
            type: '3'
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['userName'] = this.props.userInfo.userName
        jsonArr['password'] = this.state.password
        jsonArr['sessionId'] = this.props.sessionId
        jsonArr['verificationCode'] = this.state.authCode
        let { dispatch } = this.props
        dispatch(setPaySelect(jsonArr, this.props.navigator))
    }

    getCode = () => {
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'user.sendVerificationCode',
            type: '7'
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['mobilePhone'] = this.props.userInfo.userName
        jsonArr['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getAuthCode(jsonArr))
        return true
    }


    render() {
        let src = require('../../img/forget.jpg')
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'重置支付密码'}
                    bg={true}
                    bgImg={src}
                    bgStyle={{ height: height }}
                    left={require('../../img/back.png')}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    leftClick={() => this.props.navigator.pop()}
                >
                    <View style={styles.content}>
                        <TextInput
                            value={this.props.userInfo.userName}
                            style={styles.phoneInput}
                            textAlign={'center'}
                            editable={false}
                            clearButtonMode='while-editing'
                            underlineColorAndroid='transparent'
                        />

                        <View style={{ height: 40, width: 0.9 * width, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TextInput
                                placeholder='验证码'
                                style={[styles.phoneInput, { width: 0.58 * width, marginTop: 0 }]}
                                textAlign={'center'}
                                keyboardType='numeric'
                                maxLength={6}
                                multiline={false}
                                clearButtonMode='while-editing'
                                placeholderTextColor={'#bcbcbc'}
                                underlineColorAndroid='transparent'
                                ref='phoneNum'
                                onChangeText={(text) => this.setState({ authCode: text })}
                            />

                            < CountDownButton enable={true}
                                style={{ width: 0.3 * width, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 5 }}
                                textStyle={{ color: 'black' }}
                                timerCount={60}
                                disableColor={'white'}
                                timerTitle={'获取验证码'}
                                timerActiveTitle={['', 's']}
                                onClick={(shouldStartCountting) => {

                                    shouldStartCountting(this.getCode())
                                }} />

                        </View>

                        <TextInput
                            placeholder='请输入支付密码'
                            style={styles.phoneInput}
                            textAlign={'center'}
                            keyboardType='numeric'
                            maxLength={20}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.phoneNumTextWatch(text)}
                        />
                        <TouchableOpacity onPress={() => this.loginBtnOnClick()}>
                            <View ref='loginBtn'
                                style={[styles.loginBtnStyle, this.state.loginBtnBg]}
                            >
                                <Text style={[styles.loginBtnTitle, this.state.loginBtnTitleColor]}>设置</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        userInfo: store.userStore.userInfo,
        sessionId: store.userStore.sessionId,
        authcodeStart: store.userStore.authcodeStart
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    headView: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    phoneInput: {
        width: 0.9 * width,
        borderRadius: 5,
        height: 40,
        backgroundColor: 'white',
        fontSize: 16,
        marginTop: 10,
        color:'#000'
    },
    loginBtnStyle: {
        height: 40,
        borderRadius: 5,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    //登录按钮,可用状态
    loginBtnTitle: {
        fontSize: 18,
    },
});
