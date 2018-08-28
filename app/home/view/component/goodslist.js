import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度
import { CachedImage } from "react-native-img-cache";

import { TabBar, Icon, Grid, ActivityIndicator } from 'antd-mobile'

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderRow = ({ item, i }) => {
        return (
            <TouchableOpacity style={styles.rowlist} key={i} onPress={() => this.props.navigator.push({ target: 'GoodsDetails', params: { specId: item.specId } })}>
                <CachedImage
                    style={styles.pic}
                    source={{ uri: 'http://img.njdexin.cn' + item.goodsImage }}
                    mutable
                />
                <View style={styles.cont}>
                    <Text numberOfLines={2} style={{ fontSize: 12, color: '#000', lineHeight: 16, paddingTop: 5, paddingBottom: 6 }}>{item.goodsName}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{ fontSize: 12, color: '#EA3031', fontWeight: 'bold' }}>￥<Text style={{ fontSize: 15 }}>{item.goodsPrice}</Text></Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>浏览量:{item.goodsClick}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    onEndReached = () => {
        if (this.props.isrefresh) {
            this.props.updateList()
        }
    }

    footView = () => {
        return (
            <View style={{ height: 50, width: width, alignItems: 'center', justifyContent: 'center', paddingBottom:5}}>
                {this.props.isrefresh ?
                    <Text style={{color:'#93949a',fontWeight:'100'}}>--------  下拉加载更多  --------</Text>
                    :
                    <Text style={{color:'#93949a',fontWeight:'100'}}>--------  我也是有底线的  --------</Text>
                }
            </View>
        )
    }

    _keyExtractor = (item, index) => index;

    render() {
        let props = this.props
        return (
            // <View style={styles.listBox}>
            //         {props.data.map((item, i) => (
            //         //  {/* 列表形式展示 不要套listBox那个View,那个是给下面的那种形式用的 */}
            //         //  {/* <TouchableOpacity style={styles.context} key={i} onPress={() => this.props.navigator.push({ target: 'GoodsDetails', params: { specId: item.specId } })}>
            //         //      <CachedImage
            //         //         style={styles.imgView}
            //         //         source={{ uri: 'http://img.njdexin.cn' + item.goodsImage }}
            //         //         mutable
            //         //     />
            //         //     <View style={styles.midView}>
            //         //         <Text style={{ fontSize: 14, color: '#000000' }}>{item.goodsName}</Text>
            //         //         <Text style={{ fontSize: 15, color: 'red' }}>{'￥' + item.goodsPrice}</Text>
            //         //     </View>
            //         // </TouchableOpacity> */}

            //         //  {/* 两个一行的展示 */}
            //         <TouchableOpacity style={styles.rowlist} key={i} onPress={() => this.props.navigator.push({ target: 'GoodsDetails', params: { specId: item.specId } })}>
            //             <CachedImage
            //                 style={styles.pic}
            //                 source={{ uri: 'http://img.njdexin.cn' + item.goodsImage }}
            //                 mutable
            //             />
            //             <View style={styles.cont}>
            //                 <Text numberOfLines={2} style={{ fontSize: 12, color: '#000',lineHeight:16,paddingTop:5,paddingBottom:6 }}>{item.goodsName}</Text>
            //                 <Text style={{ fontSize: 12, color: '#EA3031',fontWeight:'bold' }}>￥<Text  style={{ fontSize: 15}}>{item.goodsPrice}</Text></Text>
            //             </View>
            //         </TouchableOpacity>
            //     )

            //     )}
            //  </View>
            props.data ?
                <View style={{ paddingLeft: 5 }}>
                    <FlatList
                        data={props.data}
                        renderItem={this.renderRow}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => this.onEndReached()}
                        keyExtractor={this._keyExtractor}
                        ListFooterComponent={this.footView}
                    />
                </View>
                :
                <ActivityIndicator />
        )
    }
}

export default main

const styles = StyleSheet.create({
    context: {
        height: 100,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        marginTop: 5
    },
    imgView: {
        width: 80,
        height: 80,
        borderRadius: 2,
        marginRight: 15
    },
    midView: {
        height: 80,
        width: width - 110,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingRight: 15,
        paddingLeft: 10
    },

    listBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 5,
        alignItems: 'flex-start',
    },
    rowlist: {
        width: (width - 15) / 2,
        alignSelf: 'stretch',
        marginRight: 5,
        marginBottom: 5,
    },
    pic: {
        width: (width - 15) / 2,
        height: (width - 15) / 2,
    },
    cont: {
        height: 72,
        backgroundColor: '#fff',
        paddingHorizontal: 10,

    },

});
