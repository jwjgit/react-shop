// 首页
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
import { TabBar, NoticeBar, ActivityIndicator } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import GoodsList from '../../home/view/component/goodslist'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getCateGoodsList, getFindGoodsList, getSpecialGoodsList, cleanFindGoodsList } from '../action/index';

// propes.type
//     1:分类
//     2：搜索
//     3.专区搜索

const pageSize = 8
class main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        let { dispatch } = this.props
        dispatch(cleanFindGoodsList())
        if (this.props.type == '1') {
            // console.log(this.props.gcRelId)
            dispatch(getCateGoodsList(this.props.gcRelId,1, pageSize))
        } else if (this.props.type == '2') {
            dispatch(getFindGoodsList(this.props.name,1, pageSize))
        } else if (this.props.type == '3') {
            dispatch(getSpecialGoodsList(this.props.name, this.props.keyword, 1, pageSize))
        }
    }

    updateProList = () => {
        // console.log(this.props.pageNo)
        if (this.props.type == '1') {
            let { dispatch } = this.props
            dispatch(getCateGoodsList(this.props.gcRelId, this.props.pageNo, pageSize))
        } else if (this.props.type == '2') {
            let { dispatch } = this.props
            dispatch(getFindGoodsList(this.props.name, this.props.pageNo, pageSize))
        } else if (this.props.type == '3') {
            let { dispatch } = this.props
            dispatch(getSpecialGoodsList(this.props.name, this.props.keyword, this.props.pageNo, pageSize))
        }
    }

    back = () => {
        this.props.navigator.pop()
        let { dispatch } = this.props
        dispatch(cleanFindGoodsList())
    }



    render() {
        let props = this.props

        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'搜索结果'}
                    barStyle="light-content"
                    isScroll={false}
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.back()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    <View style={{ width: width,  flex: 1 }}>
                        {props.findGoodsList.length !== 0 ?
                            <GoodsList
                                data={props.findGoodsList}
                                navigator={props.navigator}
                                updateList={() => this.updateProList()}
                                isrefresh={this.props.isrefresh}
                            />
                            :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Image
                                    source={require('../../img/searchkong.png')}
                                    style={{ width: 150, height: 150, marginTop: 50 }}
                                />
                                <Text style={{ fontSize: 20, color: 'gray', marginTop: 20 }}>暂时木有内容呀~~~</Text>
                            </View>
                        }
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        findGoodsList: store.cateStore.findGoodsList,
        isrefresh: store.cateStore.isrefresh,
        pageNo: store.cateStore.pageNo
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
