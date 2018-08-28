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

import { getRecomList } from '../../action/index';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'user.getRecommendList',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getRecomList(obj))
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollView>
                    {props.recomList.map((item, i) => (
                        <IdCard
                            info={item}
                            key={i}
                        />
                    ))}
                </ScrollView>

            </View>
        )
    }

}

class IdCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }


    render() {
        let props = this.props.info
        let arr = props.memberMobile.split('')
        let font = arr[0] + arr[1] + arr[2]
        let next = arr[arr.length - 4] + arr[arr.length - 3] + arr[arr.length - 2] + arr[arr.length - 1]
        return (
            <View style={styles.context}>
                <Text>{props.createTimeStr}</Text>
                <Text style={{ marginTop: 10 }}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>{font + '****' + next}</Text>
                    通过您的推荐注册了德鑫云商</Text>
            </View>
        )
    }

}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        recomList: store.mineStore.recomList
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

    },
    context: {
        width: width,
        height: 70,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: 1,
        paddingLeft: 15

    }

});
