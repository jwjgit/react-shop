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
    // onEndReached = () => {
    //     if (this.props.isrefresh) {
    //         this.props.updateList()
    //     }
    // }
    // footView = () => {
    //     return (
    //         <View style={{ height: 50, width: width, alignItems: 'center', justifyContent: 'center', paddingBottom:5}}>
    //             {this.props.isrefresh ?
    //                 <Text style={{color:'#93949a',fontWeight:'100'}}>--------  下拉加载更多  --------</Text>
    //                 :
    //                 <Text style={{color:'#93949a',fontWeight:'100'}}>--------  我也是有底线的  --------</Text>
    //             }
    //         </View>
    //     )
    // }
    // renderRow = ({ item, i }) => {
    //     return (
    //         <OrderCard
    //             key={i}
    //             info={item}
    //             navigator={this.props.navigator}
    //         /> 
    //     )
    // }
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
                {/* <FlatList
                    data={this.props.orderList}
                    renderItem={this.renderRow}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.onEndReached()}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={this.footView}
                /> */}
            </View>
        )
    }

}

function select(store) {
    return {
        orderList: store.mineStore.orderList
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
