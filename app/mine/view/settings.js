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

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { logOff, clearMine } from '../action/index';
import { ToastCom } from '../../component/toast';
import { clearUser } from '../../user/action';
import { clearCars } from '../../cars/action';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    logOff = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'user.logout',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(logOff(obj))
        dispatch(clearMine())
        dispatch(clearUser())
        dispatch(clearCars())
        this.props.navigator.pop()


    }

    shiming = () => {
        if (!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) {
            this.props.navigator.push({ target: 'ApproveReal' })
        } else {
            ToastCom({ title: 'info', info: '您已实名认证' })
        }
    }




    render() {
        let src = require('../../img/forget.jpg')
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'设置'}
                    bg={true}
                    barStyle="light-content"
                    bgImg={require('../../img/navbar_bg.png')}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    navigator={this.props.navigator}
                >
                    {!!this.props.sessionId &&
                        <View style={styles.content}>
                            <TouchableOpacity style={styles.tabView} onPress={() => this.shiming()}>
                                <Text style={{ fontSize: 15 }}>实名认证</Text>
                                <Image
                                    source={require('../../img/mine_to.png')}
                                    style={{ height: 15, width: 15 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tabView} onPress={() => this.props.navigator.push({ target: 'PaySelect' })}>
                                <Text style={{ fontSize: 15 }}>设置支付密码</Text>
                                <Image
                                    source={require('../../img/mine_to.png')}
                                    style={{ height: 15, width: 15 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginBtnStyle} onPress={() => this.logOff()}>
                                <Text style={styles.loginBtnTitle}>退出登录</Text>
                            </TouchableOpacity>
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
        userInfo: store.userStore.userInfo,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        width: width,
        alignItems: 'center',
    },
    tabView: {
        width: width,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        marginTop: 15,
        backgroundColor: 'white'
    },
    loginBtnStyle: {
        height: 40,
        borderRadius: 20,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop: 50
    },
    //登录按钮,可用状态
    loginBtnTitle: {
        fontSize: 18,
        color: 'white'
    },
});
