import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { TabBar, Icon, Grid } from 'antd-mobile'


class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ icon: require('../../../img/home_xp.png'), text: '新品', click: () => this.props.navigator.push({ target: 'GoodsList', params: { title: '新品' } }) },
            { icon: require('../../../img/home_rm.png'), text: '热卖', click: () => this.props.navigator.push({ target: 'GoodsList', params: { title: '热卖' } }) },
            { icon: require('../../../img/home_yhh.png'), text: '有好货', click: () => this.props.navigator.push({ target: 'GoodsList', params: { title: '有好货' } }) },
            { icon: require('../../../img/home_all.png'), text: '全部', click: () => this.props.navigator.push({ target: 'GoodsList', params: { title: '全部' } }) }]
        };
    }

    render() {
        return (
            <Grid
                data={this.state.data}
                hasLine={false}
                columnNum={this.state.data.length}
                itemStyle={{ height: 75 }}
                renderItem={dataItem => (
                    <TouchableOpacity style={styles.itemView} onPress={() => dataItem.click()}>
                        <Image
                            source={dataItem.icon}
                            style={styles.indexImg}
                        />
                        <Text style={styles.indexText}>{dataItem.text}</Text>
                    </TouchableOpacity>
                )

                }
            />
        )
    }
}

export default main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    imgView: {
        height: 150,
        width: width
    },
    itemView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    indexImg: {
        height: 40,
        width: 40,
        marginBottom: 0
    },
    indexText: {
        fontSize: 14,
        color: '#585858',
        marginTop: 5
    }
});
