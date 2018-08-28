import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    TextInput,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Steps } from 'antd-mobile'
import ImagePicker from 'react-native-image-picker'
import ScrollPage from '../../component/scrollpage'
const Step = Steps.Step;

import { realName } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            avatarSource: '',
            data: [{
                title: '身份认证',
                status: 'process'
            }, {
                title: '银行卡认证',
                status: 'wait'
            }, {
                title: '完成',
                status: 'wait'
            }],
            name: '',
            idNum: '',
            cardNum: '',
            step: 0,
            phone: '',
            isClick: false
        };
    }

    changeNext = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.saveRealAuthInfo',
        }
        obj['timestamp'] = timestamp
        obj['accountNo'] = this.state.cardNum
        obj['idCardCode'] = this.state.idNum
        obj['name'] = this.state.name
        obj['bankPreMobile'] = this.state.phone
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(realName(obj, this.props.navigator, this.props.userInfo))
        this.setState({ isClick: true })
    }

    changeUserName = () => {
        let { dispatch } = this.props
        dispatch(changeName())
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollPage
                    bg={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgImg={require('../../img/navbar_bg.png')}
                    title={'实名认证'}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                >
                    <View style={{ flex: 1, alignItems: 'center', width: width, paddingTop: 15 }}>
                        {/* <Steps current={0} direction="horizontal" size="small" style={{ width: width }}>
                            {this.state.data.map((item, i) => (
                                <Step key={i} title={item.title} status={item.status} />
                            ))}
                        </Steps>
                        <ScrollView
                            ref='scroll'
                            style={{ height: 400, width: width, }}
                            horizontal={true}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}>
                            <View style={{ height: 300, width: width, backgroundColor: '#fff' }}>
                                <TextInput
                                    placeholder='真实姓名'
                                    style={styles.inputView}
                                    maxLength={11}
                                    multiline={false}
                                    clearButtonMode='while-editing'
                                    placeholderTextColor={'#bcbcbc'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ name: text })}
                                />
                                <TextInput
                                    placeholder='身份证号'
                                    style={styles.inputView}
                                    keyboardType='numeric'
                                    maxLength={18}
                                    multiline={false}
                                    clearButtonMode='while-editing'
                                    placeholderTextColor={'#bcbcbc'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ idNum: text })}
                                />
                            </View>
                            <View style={{ height: 300, width: width, backgroundColor: '#fff' }}>
                                <TextInput
                                    placeholder='银行卡号'
                                    style={styles.inputView}
                                    keyboardType='numeric'
                                    maxLength={19}
                                    multiline={false}
                                    clearButtonMode='while-editing'
                                    placeholderTextColor={'#bcbcbc'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ cardNum: text })}
                                />
                                <TextInput
                                    placeholder='银行预留手机号'
                                    style={styles.inputView}
                                    keyboardType='numeric'
                                    maxLength={11}
                                    multiline={false}
                                    clearButtonMode='while-editing'
                                    placeholderTextColor={'#bcbcbc'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ phone: text })}
                                />
                            </View>
                            <View style={{ height: 300, width: width, backgroundColor: '#fff' }}>
                                <Text>成功</Text>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.loginBtnStyle} onPress={() => { this.changeNext() }}>
                            <Text style={styles.loginBtnTitle}>下一步</Text>
                        </TouchableOpacity> */}
                        <TextInput
                            placeholder='真实姓名'
                            style={styles.inputView}
                            maxLength={11}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <TextInput
                            placeholder='身份证号'
                            style={styles.inputView}
                            //keyboardType='numeric'
                            maxLength={18}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ idNum: text })}
                        />
                        <View style={{ height: 20, width: width }} />
                        <TextInput
                            placeholder='银行卡号'
                            style={styles.inputView}
                            keyboardType='numeric'
                            maxLength={19}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ cardNum: text })}
                        />
                        <TextInput
                            placeholder='银行预留手机号'
                            style={styles.inputView}
                            keyboardType='numeric'
                            maxLength={11}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ phone: text })}
                        />
                        <TouchableOpacity style={styles.loginBtnStyle} onPress={() => { this.changeNext() }} disabled={this.state.isClick}>
                            {this.state.isClick ?
                                <ActivityIndicator />
                                :
                                <Text style={styles.loginBtnTitle}>认 证</Text>
                            }
                        </TouchableOpacity>

                    </View>
                </ScrollPage>
                {/* <TouchableOpacity onPress={() => this.getImageUri()}>
                    <Image
                        style={{ height: width, width: width, marginTop: 50 }}
                        source={!!this.state.avatarSource ? this.state.avatarSource : require('../../img/approve_id.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: width, height: 50, backgroundColor: '#21d133' }} onPress={() => this.uploadImg()}>

                </TouchableOpacity> */}
            </View>
        )
    }

}

function select(store) {
    return {
        //username: store.userStore.username,
        sessionId: store.userStore.sessionId,
        userInfo: store.userStore.userInfo
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputView: {
        height: 60,
        width: width,
        padding: 15,
        fontSize: 16,
        color: 'black',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
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
