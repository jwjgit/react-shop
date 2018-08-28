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
import ScrollPage from '../../component/scrollpage'
import AccountManage from './page/accountmanage'
import AccountSafe from './page/accountsafe'
import Recommend from './page/recommend'

import { changeName } from '../action/index';

const tabs = [
    { title: '账户信息' },
    { title: '账户安全' },
    { title: '推荐管理' }
];

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    changeUserName = () => {
        let { dispatch } = this.props
        dispatch(changeName())
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='我的个人'
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >

                    <View style={styles.tabView}>
                        <Tabs tabs={tabs}
                            initialPage={props.pageId}
                            onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                            tabBarUnderlineStyle={{ backgroundColor: '#ea3131' }}
                            tabBarActiveTextColor='#5C5C5C'
                            tabBarInactiveTextColor='#8C8C8C'
                        >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                <AccountManage
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                <AccountSafe
                                    navigator={this.props.navigator}
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                <Recommend />
                            </View>
                        </Tabs>
                    </View>
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
    tabView: {
        flex: 1,
        width: width
    },

});
