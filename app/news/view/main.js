import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    View
} from 'react-native';
import { TabBar, Icon, Drawer } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'


import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getNewsList } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'index.getMyMessages',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getNewsList(obj))
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='消息'
                    isScroll={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                    isScroll={true}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                >
                    <View style={{ width: width, paddingBottom: 50 }}>
                        {this.props.newsList.map((item, i) => (
                            <Index
                                info={item}
                                key={i}
                                navigator={this.props.navigator}
                            />
                        ))}
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <TouchableOpacity style={{ width: width, padding: 15, backgroundColor: 'white' }} onPress={() => this.props.navigator.push({ target: 'Content', params: { info: this.props.info.shopMessage } })}>
                <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{this.props.info.messageTitle}</Text>
                <Text style={{ marginTop: 10 }}>{this.props.info.sendtimeStr}</Text>
            </TouchableOpacity>
        )
    }
}

function select(store) {
    return {
        sessionId: store.userStore.sessionId,
        newsList: store.newsStore.newsList
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
