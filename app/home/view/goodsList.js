// 首页
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
import { TabBar, NoticeBar, ActivityIndicator } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import ViewPage from './component/viewpage'
import Grid from './component/grid'
import GoodsList from './component/goodslist'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getGoodsList } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={this.props.title}
                    barStyle="light-content"
                    isScroll={true}
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    <View style={{ width: width, paddingBottom: 50 }}>
                        {!!props.goodsList ?
                            <GoodsList
                                data={props.goodsList}
                                navigator={props.navigator}
                            />
                            :
                            <ActivityIndicator />
                        }
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        goodsList: store.homeStore.goodsList,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
