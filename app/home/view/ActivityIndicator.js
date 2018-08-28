
// 转圈圈的，没完成，所以没用上

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    NativeModules,
    View
} from 'react-native';
import { TabBar, NoticeBar, ActivityIndicator } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import ViewPage from './component/viewpage'
import Grid from './component/grid'
import GoodsList from './component/goodslist'
import { ToastCom } from '../../component/toast'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { change_animating } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let props = this.props
        return (
            <ActivityIndicator
                toast
                text="Loading..."
                animating={this.props.animating}
                color='red'
            />

        )
    }

}

function select(store) {
    return {
        animating: store.homeStore.animating
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
