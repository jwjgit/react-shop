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
                {this.props.orderList.map((item, i) => (
                        <OrderCard
                            key={i}
                            info={item}
                            navigator={this.props.navigator}
                        />
                    ))}
                </ScrollView>

            </View>
        )
    }

}

function select(store) {
    return {
        orderList: store.mineStore.orderList1
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },


});
