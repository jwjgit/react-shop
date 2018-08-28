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

import { SwipeAction, Checkbox, Stepper } from 'antd-mobile'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { connect } from 'react-redux';
import { updateCount} from '../../action/index';

const CheckboxItem = Checkbox.AgreeItem;


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            val: this.props.num,
        };
    }

    onChange = (val) => {
        this.setState({ val });
    }

    changeCartCountById = (val) => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'cart.updateCartCount',
        }
        obj['timestamp'] = timestamp
        obj['cartIds'] = this.props.carsId
        obj['sessionId'] = this.props.sessionId
        obj['count'] = val
        obj['specId'] = this.props.specId
        let { dispatch } = this.props
        dispatch(updateCount(obj,this.props.carList))
    }

    add = () => {
        if (this.state.val >= this.props.max) {
            this.setState({
                val: this.props.max
            })
        } else {
            this.changeCartCountById(this.state.val + 1)
            this.setState({
                val: this.state.val + 1
            })
        }

    }

    sum = () => {
        if (this.state.val <= this.props.min) {
            this.setState({
                val: this.props.min
            })
        } else {
            this.changeCartCountById(this.state.val - 1)
            this.setState({
                val: this.state.val - 1
            })
        }
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.indexViewImg} onPress={() => this.sum()}>
                    <Image
                        source={require('../../../img/sp_jian.png')}
                        style={styles.indexImg}
                    />
                </TouchableOpacity>
                <View style={styles.indexViewNum}>
                    <Text>{this.state.val}</Text>
                </View>
                <TouchableOpacity style={styles.indexViewImg} onPress={() => this.add()}>
                    <Image
                        source={require('../../../img/sp_jia.png')}
                        style={styles.indexImg}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        carList : store.carsStore.carList
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        height: 25,
        width: 80,
        borderWidth: 0.5,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    indexViewImg: {
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indexViewNum: {
        height: 25,
        width: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
    },
    indexImg: {
        height: 17,
        width: 17
    }
});


