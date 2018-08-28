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
var DeviceInfo = require('react-native-device-info');
const devId = DeviceInfo.getUniqueID()


import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { loginByPwd } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // loginBtnBg: { backgroundColor: '#bcbcbc' },
            // loginBtnTitleColor: { color: '#ffffff' },
            username: '',
            password: '',
            isCanClick:false,
        }
    }

    phoneNumTextWatch(text) {
        this.setState({
            username: text,
        });
        if (text.length > 0 && this.state.password ) {
            this.setState({
                isCanClick:true,
            });
        } else {
            this.setState({
                isCanClick:false,
            });
        }
    }

    PwdTextWatch(text) {
        this.setState({
            password: text ,
        });
        if (text.length > 0 && this.state.username ) {
            this.setState({
                isCanClick:true,
            });
        } else {
            this.setState({
                isCanClick:false,
            });
        }
    }

    loginBtnOnClick() {
        let reg = /^1[3456789]\d{9}$/.test(this.state.username)
        if(!this.state.username || !reg){
            ToastCom({ title: 'info', info: '请填写正确的手机号' });
            return;
        }
        // let pwdReg = /^[a-z0-9A-Z_!@#$%^&*~()-+=.,?<>:;|]{6,20}$/.test(this.state.password)
        // if(!this.state.password || !pwdReg){
        //     ToastCom({ title: 'info', info: '您的密码输入有误，只能输入字母、数字或个别常见特殊符号'});
        //     return;
        // }
        if(this.state.isCanClick){
            this.setState({
                isCanClick:false,
            });
        }
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'user.login',
            type: '1'
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['userName'] = this.state.username
        jsonArr['password'] = this.state.password
        jsonArr['devId'] = devId
        let { dispatch } = this.props
        dispatch(loginByPwd(jsonArr, this.props.navigator))
    }


    render() {
        let date = new Date()
        let time = Number(date.getHours())
        let src = require('../../img/forget.jpg')
        if (time >= 0 && time < 6) {
            src = require('../../img/login4.png')
        } else if (time >= 6 && time < 12) {
            src = require('../../img/login1.png')
        } else if (time >= 12 && time < 18) {
            src = require('../../img/login2.png')
        } else {
            src = require('../../img/login3.png')
        }
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'登录'}
                    bg={true}
                    bgImg={src}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgStyle={{ height: height }}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    right={require('../../img/code.png')}
                    rightClick={() => this.props.navigator.push({ target: 'LoginBy' })}
                >
                    <View style={styles.content}>
                        <Image
                            source={require('../../img/head.png')}
                            style={styles.headView}
                        />
                        <TextInput
                            placeholder='手机号'
                            style={styles.phoneInput}
                            textAlign={'center'}
                            keyboardType='numeric'
                            maxLength={11}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            ref='phoneNum'
                            onChangeText={(text) => this.phoneNumTextWatch(text)}
                        />
                        <TextInput
                            placeholder='密码'
                            style={styles.phoneInput}
                            textAlign={'center'}
                            secureTextEntry={true}
                            multiline={false}
                            maxLength={20}
                            clearButtonMode='while-editing'
                            underlineColorAndroid='transparent'
                            placeholderTextColor={'#bcbcbc'}
                            ref='pwd'
                            onChangeText={(text) => this.PwdTextWatch(text)}
                        />
                        <View style={styles.funView}>
                            <TouchableOpacity onPress={() => this.props.navigator.push({ target: 'Regist' })}>
                                <Text style={{ color: 'white', fontSize: 14 }}>前往注册</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigator.push({ target: 'Forget' })}>
                                <Text style={{ color: 'white', fontSize: 14 }}>忘记密码</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.isCanClick ? 
                            <TouchableOpacity  onPress={() => this.loginBtnOnClick()} 
                                style={styles.loginBtnStyle}
                            >
                                <Text style={styles.loginBtnTitle}>登 录</Text>
                            </TouchableOpacity>
                            :
                            <View 
                                style={[styles.loginBtnStyle, styles.loginBtnBg]}
                            >
                                <Text style={styles.loginBtnTitle}>登 录</Text>
                            </View>
                        }
                        {/* <TouchableOpacity onPress={() => this.loginBtnOnClick()} disabled={this.state.isCanClick}>
                            <View
                                style={[styles.loginBtnStyle, this.state.loginBtnBg]}
                            >
                                <Text style={[styles.loginBtnTitle, this.state.loginBtnTitleColor]}>登 录</Text>
                            </View>
                        </TouchableOpacity> */}
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
        marginTop: 10
    },
    loginBtnStyle: {
        height: 40,
        borderRadius: 5,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor:'#e52540'
    },
    //登录按钮,不可用状态
    loginBtnBg: {
        backgroundColor: '#bcbcbc' 
    },
    loginBtnTitle: {
        fontSize: 17,
        color:'#fff'
    },
    funView: {
        width: 0.9 * width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    loginBtnStyle1: {
        height: 40,
        borderRadius: 5,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#e52540'
    },
    loginBtnTitle1: {
        fontSize: 18,
        color: '#ffffff'
    },
});
