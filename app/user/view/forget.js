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
import { register, getAuthCode ,forget } from '../action/index';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCanClick:false,
            username: '',
            password: '',
            authCode: '',
            yzmIsClick:false
        }
    }

    phoneNumTextWatch(text) {
        if(text.length>0){
            yzmIsClick = true
        }else{
            yzmIsClick = false
        }
        this.setState({
            username:text,
            yzmIsClick:yzmIsClick
        })
        if(this.state.password && text.length>0  && this.state.authCode){
            this.setState({
                isCanClick:true
            })
        }else{
            this.setState({
                isCanClick:false
            })
        }
    }
    setYZMValue(text){
        this.setState({
            authCode:text,
        })
        if(this.state.password && this.state.username && text.length>0){
            this.setState({
                isCanClick:true
            })
        }else{
            this.setState({
                isCanClick:false
            })
        }
    }
    PwdTextWatch(text) {
        this.setState({
            password: text ,
        });
        if (text.length > 0 && this.state.username && this.state.authCode) {
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
            method: 'user.forgetPassword',
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['userName'] = this.state.username
        jsonArr['password'] = this.state.password
        jsonArr['verificationCode'] = this.state.authCode
        let { dispatch } = this.props
        dispatch(forget(jsonArr, this.props.navigator))
    }

    getCode = () => {
        let reg = /^1[3456789]\d{9}$/.test(this.state.username)
        if(!this.state.username || !reg){
            ToastCom({ title: 'info', info: '请填写正确的手机号' });
            return;
        }
       
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'user.sendOpenVerificationCode',
            type: '2'
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['mobilePhone'] = this.state.username
        let { dispatch } = this.props
        dispatch(getAuthCode(jsonArr))
        return true
    }


    render() {
        let src = require('../../img/forget.jpg')
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'重置密码'}
                    bg={true}
                    bgImg={src}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgStyle={{ height: height }}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                >
                    <View style={styles.content}>
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
                                onChangeText={(text)=>this.setYZMValue(text)}
                            />
                            < CountDownButton enable={true}
                                style={{ width: 0.3 * width, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor:this.state.yzmIsClick? '#e52540':'#bcbcbc', borderRadius: 5 }}
                                textStyle={{ color: '#fff',fontSize:13, }}
                                enable={this.state.yzmIsClick}
                                disableColor={'#666'}
                                timerCount={60}
                                timerTitle={'获取验证码'}
                                timerActiveTitle={['', 's']}
                                onClick={(shouldStartCountting) => {
                                    shouldStartCountting(this.getCode())
                                }} />

                        </View>
                        <TextInput
                            placeholder='新的密码'
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
                        <View style={{alignItems: 'center'}}>
                            {this.state.isCanClick ? 
                            <TouchableOpacity  onPress={() => this.loginBtnOnClick()} 
                                style={styles.loginBtnStyle}
                            >
                                <Text style={styles.loginBtnTitle}>修 改</Text>
                            </TouchableOpacity>
                            :
                            <View style={[styles.loginBtnStyle, styles.loginBtnBg]} >
                                <Text style={styles.loginBtnTitle}>修 改</Text>
                            </View>
                            }
                        </View>
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
});