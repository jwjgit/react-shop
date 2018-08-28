import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Drawer } from 'antd-mobile'

import { changeName } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
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
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../img/find_wdtg.png')}
                    style={{ flex: 1 }}
                />
            </View>
        )
    }

}

function select(store) {
    return {
        username: store.userStore.username,
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
