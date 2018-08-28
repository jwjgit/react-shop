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
import FindPage from '../../component/findpage'
import GoodsList from '../../home/view/component/goodslist'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getSpecialProList, cleanSpecialProList } from '../action/index';

const pageSize = 20



class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
        let { dispatch } = this.props
        dispatch(cleanSpecialProList())
        dispatch(getSpecialProList(this.props.keyword ,1, pageSize))
    }

    search = (str) => {
        this.props.navigator.push({ target: 'FindGoodsList', params: { name: str, keyword: this.props.keyword, type: '3' } })
    }

    updateProList = () => {
        let { dispatch } = this.props
        dispatch(getSpecialProList(this.props.keyword, this.props.pageNo, pageSize))
    }

    back = () =>{
        this.props.navigator.pop()
        let { dispatch } = this.props
        dispatch(cleanSpecialProList())
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <FindPage
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                    barStyle="light-content"
                    isScroll={false}
                    navigator={this.props.navigator}
                    search={(e) => this.search(e)}
                    left={require('../../img/back.png')}
                    leftClick={() => this.back()}
                >
                    <View style={{ width: width, flex: 1 }}>
                        {props.specialProList.length !== 0 ?
                            <GoodsList
                                data={props.specialProList}
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
                </FindPage>
            </View>
        )
    }

}

function select(store) {
    return {
        specialProList: store.homeStore.specialProList,
        pageNo: store.homeStore.pageNo,
        isrefresh: store.homeStore.isrefresh
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
