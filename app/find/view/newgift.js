import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度
import ScrollPage from '../../component/scrollpage'

import { TabBar, Icon, Drawer } from 'antd-mobile'

import { getGift } from '../action/index';
import { ToastCom } from '../../component/toast';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    get = () => {
        if (!!this.props.sessionId) {
            var timestamp = Date.parse(new Date());
            let obj = {
                method: 'buyer.newcomerGift',
            }
            obj['timestamp'] = timestamp
            obj['sessionId'] = this.props.sessionId
            let { dispatch } = this.props
            dispatch(getGift(obj))
        } else {
            ToastCom({ title: 'info', info: '登陆之后才能领取' })
            this.props.navigator.push({ target: 'Login' })
        }
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                {/* <Image
                    source={require('../../img/newlift.jpg')}
                    style={{ height: height, width: width, position: 'absolute' }}
                />
                <TouchableOpacity onPress={() => props.navigator.pop()} style={{ position: 'absolute', top: 40, left: 15 }}>
                    <Image
                        source={require('../../img/rback.png')}
                        style={{ height: 30, width: 30 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonView} onPress={() => this.get()}>
                    <Text style={{ color: '#ca1946' }}>点击领取</Text>
                </TouchableOpacity> */}
                <ScrollPage
                    title='新人有礼'
                    barStyle="dark-content"
                    navigator={this.props.navigator}
                    bg={true}
                    titleStyle={{ color: 'black' }}
                    bgImg={require('../../img/white_bg.jpg')}
                    left={require('../../img/home_back.png')}
                    leftClick={() => props.navigator.pop()}
                    isScroll={true}
                >
                    <View style={{ flex: 1 , height: height, width: width,}}>
                        <Image
                            source={require('../../img/newlift.jpg')}
                            style={{ height: height, width: width, position: 'absolute' }}
                        />
                        <TouchableOpacity style={styles.buttonView} onPress={() => this.get()}>
                            <Text style={{ color: '#ca1946' }}>点击领取</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollPage>

            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonView: {
        width: width * 0.8,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffec73',
        marginTop: height * 0.52,
        borderRadius: 17.5,
        marginLeft: 0.1 * width
    }
});
