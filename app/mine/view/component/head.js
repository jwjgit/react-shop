import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Modal } from 'antd-mobile'
import { connect } from 'react-redux';
import { } from '../../action/index';


class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isclick: false
        };
    }


    render() {
        let props = this.props
        return (
            <TouchableOpacity style={styles.container} onPress={() => props.onClick()} disabled={!(!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName)}>
                <Image
                    source={require('../../../img/mine_head_bg.png')}
                    style={styles.headBg}
                />
                <Image
                    source={{ uri: props.userInfo.avatar }}
                    style={{ height: 60, width: 60, borderRadius: 30, borderWidth: 0.5, borderColor: 'red', marginRight: 15, }}
                />
                <View>
                    <Text style={{ marginLeft: 4, fontSize: 15, fontWeight: 'bold', color: 'black' }}>{!!props.userInfo.nickName ? props.userInfo.nickName : props.userInfo.userName}</Text>
                    <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'red', marginTop: 8, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, paddingVertical: 1 }}>
                        <Text style={{ fontSize: 11, color: '#a6a5a5' }}>{'账号：' + props.userInfo.userName}</Text>
                    </View>
                </View>
                <View>
                    {!(!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) ?
                        <Image
                            source={require('../../../img/recom.png')}
                            style={{ height: 19.7, width: 50, marginLeft: 15 }}
                        />
                        :
                        <View>
                            <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'red', marginTop: 8, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, paddingVertical: 1, marginLeft: 15, paddingVertical: 3 }}>
                                <Text style={{ fontSize: 11, color: '#a6a5a5' }}>点击认证</Text>
                            </View>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

function select(store) {
    return {
        userInfo: store.userStore.userInfo
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        width: 0.9 * width,
        height: 150,
        backgroundColor: '#FFFFFF00',
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headBg: {
        width: 0.9 * width,
        height: 150,
        position: 'absolute',
        top: 0,
    }


});
