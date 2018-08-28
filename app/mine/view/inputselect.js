import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    View
} from 'react-native';
import { TabBar, Icon, Drawer } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import CountDownButton from 'react-native-smscode-count-down'


import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { cash } from '../action/index';
import {pursePay} from '../../cars/action/index'


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginBtnBg: { backgroundColor: '#bcbcbc' },
            loginBtnTitleColor: { color: '#ffffff' },
            password: '',
            isClick: false
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
        this.setState({ isClick: true })
        let jsonArr = this.props.obj
        jsonArr['paymentPassword'] = this.state.password
        if(this.props.obj.method === 'buyer.cash'){  //tixian
            let { dispatch } = this.props
            dispatch(cash(jsonArr, this.props.navigator))
        }else if(this.props.obj.method === 'regular.withDraw'){   //yuelitixian
            let { dispatch } = this.props
            dispatch(cash(jsonArr, this.props.navigator))
        }
        else{
            let { dispatch } = this.props
            dispatch(pursePay(jsonArr, this.props.navigator))
        }
    }


    render() {
        let src = require('../../img/forget.jpg')
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'输入支付密码'}
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
                            placeholder='请输入支付密码'
                            style={styles.phoneInput}
                            textAlign={'center'}
                            maxLength={20}
                            secureTextEntry={true}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.phoneNumTextWatch(text)}
                        />


                        {this.state.isClick ?
                            <ActivityIndicator
                                animating={this.state.animating}
                                style={[styles.centering, { height: 80 }]}
                                size="large"
                            />
                            :
                            <TouchableOpacity onPress={() => this.loginBtnOnClick()}>
                                <View ref='loginBtn'
                                    style={[styles.loginBtnStyle, this.state.loginBtnBg]}
                                >
                                    <Text style={[styles.loginBtnTitle, this.state.loginBtnTitleColor]}>确定</Text>
                                </View>
                            </TouchableOpacity>
                        }
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
        marginTop: 10
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
