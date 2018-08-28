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
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { ListView } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { changeBank } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    select = (opt) => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'buyer.updateBankCard',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        obj['cardId'] = opt.cardId
        obj['cardNo'] = opt.cardNo
        let { dispatch } = this.props
        dispatch(changeBank(obj, this.props.navigator))
    }

    renderRow = ({ item }) => {
        let src = ''
        switch (item.bankName) {
            case '中国建设银行':
                src = require('../../img/b_js.png')
                break
            case '工商银行':
                src = require('../../img/b_gs.png')
                break
            case '中国工商银行':
                src = require('../../img/b_gs.png')
                break
            case '光大银行':
                src = require('../../img/b_gd.png')
                break
            case '交通银行':
                src = require('../../img/b_jt.png')
                break
            case '中国民生银行':
                src = require('../../img/b_ms.png')
                break
            case '中国农业银行':
                src = require('../../img/b_ny.png')
                break
            case '农业银行':
                src = require('../../img/b_ny.png')
                break
            case '中国平安银行':
                src = require('../../img/b_pa.png')
                break
            case '中国邮政储蓄银行':
                src = require('../../img/b_yz.png')
                break
            case '招商银行':
                src = require('../../img/b_zs.png')
                break
            case '中国银行':
                src = require('../../img/b_zg.png')
                break
            default:
                src = require('../../img/b_all.png')
                break
        }
        let arr = item.cardNo.split('')
        let font = arr[0] + arr[1] + arr[2] + arr[3]
        let next = arr[arr.length - 4] + arr[arr.length - 3] + arr[arr.length - 2] + arr[arr.length - 1]
        return (
            <TouchableOpacity style={styles.rowView} onPress={() => this.select(item)}>
                <Image
                    source={src}
                    style={styles.rowBackground}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <View style={{ height: 70, width: 70, backgroundColor: 'white', borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            source={{ uri: item.bankLogo }}
                            style={{ height: 50, width: 50 }}
                        />
                    </View>
                    <Text style={{ fontSize: 22, color: 'white', marginLeft: 10 }}>{item.bankName}</Text>
                    <Text style={{ fontSize: 14, color: 'white', marginLeft: 10 }}>{item.type}</Text>
                </View>

                <Text style={{ fontSize: 25, color: 'white', marginBottom: 30, marginLeft: 10 }}>{font + '  ****  ****  ' + next}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='选择银行卡'
                    isScroll={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <FlatList
                            data={this.props.bankList}
                            renderItem={this.renderRow}
                        />
                    </View>

                </ScrollPage>

            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        bankList: store.mineStore.bankList
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
    }


});
