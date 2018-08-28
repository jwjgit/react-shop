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

const CheckboxItem = Checkbox.AgreeItem;

export default class navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            val: props.num
        };
    }

    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
    }

    add = () => {
        if (this.state.val >= this.props.max) {
            this.setState({
                val: this.props.max
            })
            this.props.changeNum(this.props.max)
        } else {
            this.setState({
                val: this.state.val + 1
            })
            this.props.changeNum(this.state.val + 1)
        }

    }

    sum = () => {
        if (this.state.val <= this.props.min) {
            this.setState({
                val: this.props.min
            })
            this.props.changeNum(this.props.min)
        } else {
            this.setState({
                val: this.state.val - 1
            })
            this.props.changeNum(this.state.val - 1)
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

const styles = StyleSheet.create({
    container: {
        height: 25,
        width: 81,
        borderWidth: 0.5,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    indexViewImg: {
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indexViewNum: {
        height: 24,
        width: 30,
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


