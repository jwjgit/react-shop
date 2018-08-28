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

// const data = Array.from(new Array(5)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
// }));


class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <Image style={styles.container} source={require('../../../img/mine_bg.png')} />
                <View style={styles.context}>
                    <View style={styles.topView}>
                        <Text style={{ color: '#5e5e5e' }}>{props.title}</Text>
                        <TouchableOpacity
                            onPress={() => props.seeAll()}
                            style={{ flexDirection: 'row', alignItems: 'center', height: 45, }}>
                            <Text style={{ color: '#adadad' }}>查看全部</Text>
                            <Image
                                style={{ height: 15, width: 15 }}
                                source={require('../../../img/mine_to.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomView}>
                        <Grid
                            data={props.data}
                            hasLine={false}
                            columnNum={props.data.length}
                            renderItem={dataItem => (
                                <TouchableOpacity style={styles.itemView} onPress={()=>dataItem.onClick()}>
                                    <Image
                                        source={dataItem.icon}
                                        style={styles.indexImg}
                                    />
                                    <Text style={styles.indexText}>{dataItem.text}</Text>
                                </TouchableOpacity>
                            )

                            }
                        />
                    </View>
                </View>

            </View>
        )
    }
}

export default main

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: 140,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10
    },
    context: {
        width: width * 0.9,
        height: 140,
        backgroundColor: '#00000000',
        borderRadius: 10,
        marginBottom: 10,
        position: 'absolute',
        top: 0
    },
    imageBg: {
        width: width * 0.9,
        height: 140,
        borderRadius: 10,
        marginBottom: 10
    },
    topView: {
        height: 45,
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        paddingHorizontal: 15
    },
    bottomView: {
        width: width * 0.9,
        justifyContent: 'center',
    },
    itemView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 95
    },
    indexImg: {
        height: 22,
        width: 22,
        marginBottom: 5
    },
    indexText: {
        fontSize: 12,
        color: '#686868',
        marginTop: 5
    }
});
