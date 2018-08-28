import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    View
} from 'react-native';
import { TabBar, Icon, Grid } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import QRCode from 'react-native-qrcode';
import * as WeChat from 'react-native-wechat';


import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { } from '../action/index';

const data1 = [{ icon: require('../../img/find_sm.png'), text: '扫码' },
{ icon: require('../../img/find_tg.png'), text: '推广' },
{ icon: require('../../img/find_rm.png'), text: '热卖' }]

const data2 = [{ icon: require('../../img/find_qd.png'), text: '签到' },
{ icon: require('../../img/find_xp.png'), text: '新品' },
{ icon: require('../../img/find_wdtj.png'), text: '我的推荐' },
{ icon: require('../../img/find_kf.png'), text: '客服' },
{ icon: require('../../img/find_xx.png'), text: '消息' },
{ icon: require('../../img/find_xryl.png'), text: '新人有礼' }]

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data1: [{ icon: require('../../img/find_sm.png'), text: '扫码', onClick: () => this.props.navigator.push({ target: 'NewGift' }) },
            { icon: require('../../img/find_tg.png'), text: '推广', onClick: () => this.props.navigator.push({ target: 'NewGift' }) },
            { icon: require('../../img/find_rm.png'), text: '热卖', onClick: () => this.props.navigator.push({ target: 'NewGift' }) }],
            data2: [{ icon: require('../../img/find_qd.png'), text: '签到', onClick: () => this.props.navigator.push({ target: 'NewGift' }) },
            { icon: require('../../img/find_xp.png'), text: '新品', onClick: () => this.props.navigator.push({ target: 'NewGift' }) },
            { icon: require('../../img/find_wdtj.png'), text: '我的推荐', onClick: () => this.props.navigator.push({ target: 'NewGift' }) },
            { icon: require('../../img/find_kf.png'), text: '客服', onClick: () => this.props.navigator.push({ target: 'NewGift' }) },
            { icon: require('../../img/find_xx.png'), text: '消息', onClick: () => this.props.navigator.push({ target: 'NewGift' }) },
            { icon: require('../../img/find_xryl.png'), text: '新人有礼', onClick: () => this.props.navigator.push({ target: 'NewGift' }) }]
        }
    }

    componentDidMount() {
        WeChat.registerApp('wxb5e48e34a503ae25')
    }

    share = () => {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title: '德鑫云商',
                        description: '德鑫云商分享页',
                        thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                        type: 'news',
                        webpageUrl: 'http://share.njdexin.cn/#/regist/share/code='+this.props.userInfo.invitationCode
                    })
                        .catch((error) => {
                            ToastShort(error.message);
                        });
                } else {
                    ToastShort('没有安装微信软件，请您安装微信之后再试');
                }
            });
    }


    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='推广'
                    isScroll={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    right={require('../../img/home_news.png')}
                    left={require('../../img/find_tj.png')}
                    leftClick={() => this.props.navigator.push({ target: 'MyPersonal', params: { pageId: 2 } })}
                    rightClick={() => this.props.navigator.push({ target: 'News' })}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    {!!props.sessionId ?
                        <View style={{ flex: 1, height: Platform.OS === 'ios' ? width * 1334 / 750+50 : width * 1334 / 750 , width: width, alignItems: 'center', paddingBottom: Platform.OS === 'ios' ? 50 : 0  }}>
                            <Image
                                source={require('../../img/find_bg.png')}
                                style={{ height: width * 1334 / 750, width: width, position: 'absolute', }}
                                resizeMode={'stretch'}
                            />
                            <Image
                                source={require('../../img/find_quan.png')}
                                style={{ height: 0.5 * width, width: 0.5 * width, position: 'absolute', top: '8%', left: 0.25 * width }}
                            />
                            <View style={{ position: 'absolute', top: '15.5%', left: 0.385 * width }}>
                                <QRCode
                                    value={'http://share.njdexin.cn/#/regist/share/code='+props.userInfo.invitationCode}
                                    size={0.23 * width}
                                    bgColor='black'
                                    fgColor='white' />
                            </View>

                            <Text style={{ fontSize: 16, color: 'black', marginTop: 0.7 * width }}>我的邀请码</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
                                <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>{props.userInfo.invitationCode}</Text>
                            </View>
                            <TouchableOpacity style={{ marginTop: 15, backgroundColor: '#f13e3e', height: 40, width: 0.7 * width, borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}
                                onPress={() => this.share()}
                            >
                                <Text style={{ fontSize: 18, color: '#fff' }}>点击分享</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flex: 1, height: Platform.OS === 'ios' ? width * 1334 / 750+50 : width * 1334 / 750  , width: width, alignItems: 'center', paddingBottom: Platform.OS === 'ios' ? 50 : 0  }}>
                            <Image
                                source={require('../../img/unloginbg.jpg')}
                                style={{ height: width * 1334 / 750, width: width, position: 'absolute', }}
                                resizeMode={'stretch'}
                            />
                            <TouchableOpacity style={{ height: 55, width: 0.68 * width, position: 'absolute', top: '46%', left: 0.16 * width }}
                                onPress={() => this.props.navigator.push({target:'Login'})}
                            >
                            <Image
                                source={require('../../img/unloginbutton.png')}
                                style={{ height: 55, width: 0.68 * width}}
                                resizeMode={'contain'}
                            />
                            </TouchableOpacity>
                        </View>
                    }

                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
        userInfo: store.userStore.userInfo,
        sessionId: store.userStore.sessionId
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    context: {
        width: width,
        backgroundColor: '#00000000',
        alignItems: 'center',
    },
    itemView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        flex: 1
    },
    indexImg: {
        height: 40,
        width: 40,
        marginBottom: 5
    },
    indexText: {
        fontSize: 18,
        color: 'white',
        marginTop: 5
    },
    itemView1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderColor: 'red'
    },
    indexImg1: {
        height: 32,
        width: 32,
        marginBottom: 5
    },
    indexText1: {
        fontSize: 14,
        color: 'red',
        marginTop: 5
    }
});
