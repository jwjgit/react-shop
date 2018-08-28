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


export default class navbar extends Component {

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
        return (
            <SwipeAction
                style={styles.container}
                right={[
                    {
                        text: '删除',
                        onPress: () => props.delCars(props.goods.cartId),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                    }
                ]}
            >
                <View style={styles.context}>
                    <TouchableOpacity style={styles.cilck} onPress={() => this.props.onClick()}>
                        <Image
                            source={props.isclick ? require('../../../img/yesclick.png') : require('../../../img/noclick.png')}
                            style={styles.clickImg}
                        />
                    </TouchableOpacity>
                    <View style={styles.context1}>
                        <Image
                            style={styles.imgView}
                            source={{ uri: 'http://img.njdexin.cn' + props.goods.goodsImages }}
                        />
                        <View style={styles.rightView}>
                            <Text style={styles.titleText} numberOfLines={2}>{props.goods.goodsName}</Text>
                            <View style={styles.numStyle}>
                                <Text style={styles.priceText}>{'￥' + props.goods.goodsPrice}</Text>
                                <Stepper
                                    max={props.goods.goodsNowStorage}
                                    min={1}
                                    num={props.goods.goodsNum}
                                    carsId={props.goods.cartId}
                                    specId={props.goods.specId}
                                />
                            </View>
                        </View>
                    </View>
                </View>

            </SwipeAction>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: width,
        backgroundColor: 'white',
        marginBottom: 3
    },
    context: {
        height: 110,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cilck: {
        height: 110,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clickImg: {
        width: 20,
        height: 20
    },
    context1: {
        height: 110,
        width: width - 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgView: {
        width: 80,
        height: 80,
        borderRadius: 2
    },
    rightView: {
        height: 80,
        width: width - 135,
        justifyContent: 'space-between',
    },
    numStyle: {
        height: 30,
        width: width - 135,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    titleText: {
        marginLeft: 15,
        fontSize: 14,
        marginTop: 5,
        color:'#686868'
    },
    priceText: {
        fontSize: 16,
        color: 'red'
    },
    stepper: {
        width: '100%',
        minWidth: '100px'
    }
});


