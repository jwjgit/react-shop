import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    FlatList,
    TextInput,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { ListView } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { } from '../action/index';
import { ToastCom } from '../../component/toast';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    submit = () => {
        ToastCom({ title: 'success', info: '提交成功' })
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='意见反馈'
                    isScroll={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    <View style={{ flex: 1, alignItems: 'center', width: width }}>
                        <TextInput
                            placeholder='手机号'
                            style={styles.phoneInput}
                            keyboardType='numeric'
                            maxLength={11}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({})}
                        />
                        <TextInput
                            placeholder='邮箱'
                            style={styles.phoneInput}
                            keyboardType='email-address'
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({})}
                        />
                        <TextInput
                            placeholder='标题'
                            style={styles.phoneInput}
                            keyboardType='default'
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({})}
                        />
                        <TextInput
                            placeholder='内容'
                            style={styles.phoneInput}
                            keyboardType='default'
                            maxLength={50}
                            multiline={false}
                            clearButtonMode='while-editing'
                            placeholderTextColor={'#bcbcbc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({})}
                        />
                        <TouchableOpacity style={styles.indexLeftView} onPress={() => this.submit()}>
                            <Text style={styles.setText}>提交</Text>
                        </TouchableOpacity>
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
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',

    },
    rowView: {
        width: 0.95 * width,
        height: 0.95 * width * 370 / 660,
        paddingLeft: 30,
        justifyContent: 'space-between',
    },
    rowBackground: {
        width: 0.95 * width,
        height: 0.95 * width * 370 / 660,
        position: 'absolute',

    },
    rowTopView: {
        paddingHorizontal: 30,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowBottomView: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: 43
    },
    rowIndexView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneInput: {
        width: 0.9 * width,
        borderRadius: 5,
        height: 40,
        backgroundColor: 'white',
        fontSize: 16,
        marginTop: 10
    },
    indexLeftView: {
        height: 40,
        width: width * 0.85,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        marginTop: 20
    },
    setText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },


});
