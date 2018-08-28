import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { Tabs, WhiteSpace, Badge } from 'antd-mobile'
import OrderCard from '../component/ordercard'

import { changeName } from '../../action/index';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    changeUserName = () => {
        let { dispatch } = this.props
        dispatch(changeName())
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={styles.indexView} onPress={() => this.props.navigator.push({ target: 'Reset' })}>
                        <Text>修改密码</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text> </Text>
                            <Image
                                source={require('../../../img/home_to.png')}
                                style={{ width: 15, height: 15, marginLeft: 10 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.indexView}  onPress={() => this.props.navigator.push({ target: 'ResetPay' })}>
                        <Text>修改支付密码</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text></Text>
                            <Image
                                source={require('../../../img/home_to.png')}
                                style={{ width: 15, height: 15, marginLeft: 10 }}
                            />
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        )
    }

}

function select(store) {
    return {
        username: store.mineStore.username,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    indexView: {
        height: 45,
        width: width,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginTop: 0.5

    }

});
