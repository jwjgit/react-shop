import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    ScrollView,
    View
} from 'react-native';

import { SwipeAction } from 'antd-mobile'
import Stepper from './stepper'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


export default class goodsindex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            val: 3,
            isCilck: props.isClick
        };
    }

    onChange = (val) => {
        this.setState({ val });
    }

    render() {
        let props = this.props
        let str = !!props.goods.goodsImage ? props.goods.goodsImage : props.goods.goodsImages
        str = 'http://img.njdexin.cn' + str
        return (
            <View style={styles.context}>
                <Image
                    style={styles.imgView}
                    source={{ uri: str}}
                />
                <View style={styles.midView}>
                    <Text style={{ fontSize: 13, color: '#000000' }}>{props.goods.goodsName}</Text>
                    <Text style={{ fontSize: 11, color: '#a6a5a5' }}>{props.goods.specInfo.replace(/&nbsp;/g, ' ')}</Text>
                </View>
                <View style={styles.rightView}>
                    <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}>{'￥' + props.goods.goodsPrice}</Text>
                    <Text style={{ fontSize: 13, color: '#a6a5a5' }}>{'X' + props.goods.goodsNum} </Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    context: {
        height: 100,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginTop: 5
    },
    imgView: {
        width: 80,
        height: 80,
        borderRadius: 2
    },
    rightView: {
        height: 80,
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    midView: {
        width: width - 190,
        height: 80,
        justifyContent: 'space-between',
        paddingVertical: 5,
        marginLeft: 5
    }
});


