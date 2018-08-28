import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    FlatList,
    View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { ListView } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { changeName } from '../action/index';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            datas: [{ time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" },
            { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" },
            { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" }, { time: "2016-09-10~2016-10-20" },]
        };
    }

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    changeUserName = () => {
        let { dispatch } = this.props
        dispatch(changeName())
    }

    renderRow = ({ item }) => {
        return (
            <View style={styles.rowView}>
                <Image
                    source={require('../../img/ticketbg2.png')}
                    style={styles.rowBackground}
                />
                <View style={styles.rowTopView}>
                    <Text style={{ fontSize: 16, color: '#545454', backgroundColor: '#00000000' }}>补签券</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#545454', backgroundColor: '#00000000' }}>1
                    <Text style={{ fontSize: 12, color: '#545454', backgroundColor: '#00000000' }}>   次</Text></Text>
                </View>
                <View style={styles.rowBottomView}>
                    <View style={styles.rowIndexView}>
                        <Image
                            source={require('../../img/ticketheartf.png')}
                            style={{ height: 10, width: 10 }}
                        />
                        <Text style={{ fontSize: 11, color: '#858585', marginLeft: 10, backgroundColor: '#00000000' }}>仅139****8525使用</Text>
                    </View>
                    <View style={[styles.rowIndexView, { marginTop: 5 }]}>
                        <Image
                            source={require('../../img/ticketheartf.png')}
                            style={{ height: 10, width: 10 }}
                        />
                        <Text style={{ fontSize: 11, color: '#858585', marginLeft: 10, backgroundColor: '#00000000' }}>{'有效期：' + item.time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='失效券'
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >


                    {/* <FlatList
                    data={this.state.datas}
                    renderItem={this.renderRow}
                /> */}
                    <Image
                        source={require('../../img/kong.png')}
                        style={{ width: 0.6 * width, height: width * 0.6 * 460 / 720, marginTop: 50, marginLeft: 0.2 * width }}
                    />
                </ScrollPage>

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
    rowView: {
        width: 0.95 * width,
        height: 108
    },
    rowBackground: {
        width: 0.95 * width,
        height: 108,
        position: 'absolute',

    },
    rowTopView: {
        paddingHorizontal: 30,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowBottomView: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: 43
    },
    rowIndexView: {
        flexDirection: 'row',
        alignItems: 'center',
    }


});
