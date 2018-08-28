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

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Steps } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'


import { } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollPage
                    bg={true}
                    bgImg={require('../../img/navbar_bg.png')}
                    title={'认证结果'}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                >
                    <View style={styles.container}>
                        {this.props.result.result === 'T' ?

                            <View style={{ width: width, height: 300, alignItems: 'center', justifyContent: 'center', }}>
                                <Image
                                    source={require('../../img/res_t.png')}
                                    style={{ height: 100, width: 100 }}
                                />
                                <Text style={{ marginTop: 15, fontSize: 20 }}>验证成功！</Text>
                            </View>

                            :



                            <View style={{ width: width, height: 300, alignItems: 'center', justifyContent: 'center', }}>
                                <Image
                                    source={require('../../img/res_f.png')}
                                    style={{ height: 100, width: 100 }}
                                />
                                <Text style={{ marginTop: 15, fontSize: 20 }}>认证失败！</Text>
                            </View>

                        }

                        <TouchableOpacity style={styles.loginBtnStyle} onPress={() => this.props.navigator.push({ target: 'Main' })}>
                            <Text style={styles.loginBtnTitle}>返回首页</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        result: store.mineStore.result
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
