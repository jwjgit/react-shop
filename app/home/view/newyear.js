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


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }


    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigator.pop()}>
                <Image
                    source={require('../../img/newyear.jpg')}
                    style={{ height: height, width: width }}
                />
            </TouchableOpacity>
        )
    }

}

function select(store) {
    return {
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
