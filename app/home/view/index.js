import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Linking,
    NativeModules,
    Platform,
    Modal,
    View,
} from 'react-native';

import { TabBar, NoticeBar, ActivityIndicator} from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import ViewPage from './component/viewpage'
import Grid from './component/grid'
import GoodsList from './component/goodslist'
import { ToastCom } from '../../component/toast'
import { CachedImage } from "react-native-img-cache";

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getGoodsList, changeShow, getIndexInfo,getHotProList} from '../action/index';
import { getAddrList } from '../../mine/action/index'

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: [{ img: require('../../img/lb_1.jpg'), onClick: () => this.props.navigator.push({ target: 'NewYear' }), key: 1 },
            // { img: require('../../img/lb_2.jpg'), onClick: () => this.props.onClick(), key: 2 },
            // { img: require('../../img/lb_3.jpg'), onClick: () => this.props.navigator.push({ target: 'NewGift' }), key: 3 }]
        }
    }

    componentWillMount = () => {
        var timestamp = Date.parse(new Date());
        let obj = {
            method: 'user.getAddressList',
        }
        obj['timestamp'] = timestamp
        obj['sessionId'] = this.props.sessionId
        let { dispatch } = this.props
        dispatch(getIndexInfo())
        dispatch(getHotProList('RXSP',1,8))
        dispatch(getGoodsList())
        dispatch(getAddrList(obj))
    }

    
    getQr = () => {
        if (Platform.OS === 'ios') {
            this.props.navigator.push({ target: 'QR' })
        } else {
            NativeModules.QRMoudle.rnCallNative('123').then(result => {
                let res = result.replace('http://share.njdexin.cn/#/regist/share/code=','')
                this.props.navigator.push({ target: 'Regist', params: { info: res } })
            }).catch(error => {
                // console.log(error);
                show(error);
                ToastCom({ title: 'fail', info: '无法识别' })
            })
        }
    }

    changeShow = () => {
        let { dispatch } = this.props
        dispatch(changeShow(false))
    }

    openUpdate = () => {
        Linking.openURL('http://test.njdexin.cn/#/').catch(err => console.error('An error occurred', err));
    }

    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <ScrollPage
                    title='首页'
                    isScroll={true}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    left={require('../../img/home_qr.png')}
                    right={require('../../img/home_news.png')}
                    leftClick={() => this.getQr()}
                    rightClick={() => this.props.navigator.push({ target: 'News' })}
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                >
                    <View style={{ width: width, paddingBottom: Platform.OS === 'ios' ? 50 : 0 }}>
                        {props.indexInfo.advHomeList ?
                            <ViewPage
                                navigator={this.props.navigator}
                                data={props.indexInfo.advHomeList}
                                isClick={false}
                            />
                            :
                            <ActivityIndicator />
                        }   
                        <Grid
                            navigator={this.props.navigator}
                        />
                        <View  style={styles.containRow} >
                            <TouchableOpacity style={{ height: 45, width: 88, alignItems: 'center', justifyContent: 'center', }} onPress={() => this.props.navigator.push({ target: 'NewGift' })}>
                                <Image
                                    source={require('../../img/home_btnbg.png')}
                                    style={{ height: 30, width: 88, }}
                                />
                            </TouchableOpacity>
                            {props.indexInfo.advMessageList ?
                                <NoticeBar marqueeProps={{ loop: true, fps: 100, }} style={styles.news}>
                                {props.indexInfo.advMessageList.map((item, i) => (
                                    <Text style={{color: '#000',fontSize:14,fontWeight:'100'}} key={i}>{item.content}</Text>
                                ))}                             
                                </NoticeBar>
                                :
                                <ActivityIndicator />
                            }   
                            
                            {/* <View style={styles.news}>
                            <View>
                                <Image
                                    source={require('../../img/notice1.png')}
                                    style={{ height: 14, width: 16, }}
                                />
                            </View>
                                <Carousel  
                                    style = {styles.newscarousel}
                                    vertical={true}
                                    dots={false}
                                    dragging={false}
                                    swiping={false}
                                    autoplay
                                    infinite
                                    >
                                    {props.indexNews.map((item, i) => (
                                        <Text key={i}>{item.content}</Text>
                                    ))}                             
                                </Carousel>
                            </View> */}
                        </View>
                        {props.indexInfo.advCateImageList ?
                            <View>
                                <TouchableOpacity onPress={()=>this.props.navigator.push({target:'SpecialProList',params:{keyword:'JKSP'}})}>
                                    <Image source={{uri:props.indexInfo.advCateImageList[0].imageUrl}} style={{ height: 116, width: width, }}/>
                                </TouchableOpacity>
                                <View style={styles.zhuan}>
                                    <TouchableOpacity onPress={()=>this.props.navigator.push({target:'SpecialProList',params:{keyword:'BYHW'}})}>
                                        <Image source={{uri:props.indexInfo.advCateImageList[1].imageUrl}} style={{ height: 116, width: (width-5)/2, }}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.props.navigator.push({target:'SpecialProList',params:{keyword:'SHHW'}})}>
                                        <Image source={{uri:props.indexInfo.advCateImageList[2].imageUrl}} style={{ height: 116, width: (width-5)/2, }}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                                :
                                <ActivityIndicator />
                        } 
                        
                        <View style={styles.hotpro}>
                            <TouchableOpacity onPress={()=>this.props.navigator.push({target:'SpecialProList',params:{keyword:'RXSP'}})}>
                                <Image source={require('../../img/hotpro.png')} style={{ height: 30, width: 140, }} />
                            </TouchableOpacity>
                            
                            {props.hotProList ?
                                <View style={styles.carouselBox}>
                                    <ScrollView 
                                    contentContainerStyle={styles.carousel2}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={true}
                                    >
                                        {props.hotProList.map((item, i) => (
                                        <TouchableOpacity style={styles.littlelist} key={i} onPress={() => this.props.navigator.push({ target: 'GoodsDetails', params: { specId: item.specId } })}>
                                            <CachedImage
                                                style={{width:89,height:89}}
                                                source={{ uri: 'http://img.njdexin.cn' + item.goodsImage }}
                                                mutable
                                            />
                                            <View style={styles.cont}>
                                                <Text numberOfLines={2} style={{ fontSize: 12, color: '#000',lineHeight:16,paddingVertical:5 }}>{item.goodsName}</Text>
                                                <Text  style={{ fontSize: 12, color: '#EA3031',fontWeight:'bold' }}>￥<Text  style={{ fontSize: 14 }}>{item.goodsPrice}</Text></Text>
                                            </View>
                                        </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                                :
                                <ActivityIndicator />
                            } 
                            
                        </View>

                        {!!props.goodsList ?
                            <GoodsList
                                data={props.goodsList}
                                navigator={props.navigator}
                            />
                            :
                            <ActivityIndicator />
                        }
                    </View>
                </ScrollPage>
                <Modal
                    transparent={true}
                    visible={this.props.isShow}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 0.85 * width, height: 0.85 * width * 649 / 638, alignItems: 'center' }}>
                            <Image
                                source={require('../../img/notice.png')}
                                style={{ width: 0.85 * width, height: 0.85 * width * 649 / 638, position: 'absolute' }}
                            />
                            <View style={{ width: 0.6 * width, height: 0.85 * width * 649 / 638 * 330 / 650, marginTop: 0.85 * width * 649 / 638 * 300 / 650, padding: 8 }}>
                                <Text style={{ fontSize: 16, color: '#666666' }}>{this.props.showStr}</Text>
                            </View>
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => this.changeShow()}>
                                <Image
                                    source={require('../../img/cha.png')}
                                    style={{ height: 30, width: 30 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={this.props.isUpdate}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 0.85 * width, height: 0.85 * width * 897 / 705, alignItems: 'center' }}>
                            <Image
                                source={require('../../img/update.png')}
                                style={{ width: 0.85 * width, height: 0.85 * width * 897 / 705, position: 'absolute' }}
                            />
                            <View style={{ width: 0.85 * width, height: 0.85 * width * 897 / 705 * 480 / 897, marginTop: 0.85 * width * 897 / 705 * 330 / 897, padding: 15 }}>
                                <View style={{ width: 0.85 * width - 30, padding: 5, justifyContent: 'flex-end', flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 10, color: '#999999' }}>{'V ' + this.props.update.v}</Text>
                                </View>
                                <Text style={{ fontSize: 14, color: '#000000' }}>{this.props.update.mes}</Text>
                            </View>
                            <TouchableOpacity style={{ height: 50, width: 0.85 * width, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, borderTopWidth: 0.8, borderTopColor: '#dddddd' }}
                                onPress={() => this.openUpdate()}
                            >
                                <Text style={{ color: 'red', fontSize: 15 }}>立即更新</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

}

function select(store) {
    return {
        hotProList:store.homeStore.hotProList,
        indexInfo:store.homeStore.indexInfo,
        goodsList: store.homeStore.goodsList,
        sessionId: store.userStore.sessionId,
        isShow: store.homeStore.isShow,
        showStr: store.homeStore.showStr,
        isUpdate: store.homeStore.isUpdate,
        update: store.homeStore.update
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containRow:{
        flexDirection:'row',
        backgroundColor:'#fff',
        height:44,
        marginTop:1,
        marginBottom:5,
        alignItems: 'center', 
    },
    news:{
        flex:1,
        // flexDirection:'row',
        // width:width,
        // paddingHorizontal: 10, 
        // width: width - 10, 
        height: 24, 
        justifyContent: 'center',
        backgroundColor:'#fff',
        borderLeftWidth:1,
        borderLeftColor:'#e6e5e6',
        marginLeft:10,
    },
    newscarousel:{
        flex:1,
    },
    zhuan:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginBottom:5,
    },
    hotpro:{
        alignItems: 'center', 
        backgroundColor:'#fff',
        paddingTop:10,  
        marginBottom:5,
    },
    carouselBox:{
        width:width,
        height:170,
        marginTop:20,
    },
    carousel2:{
        // flexDirection:'row',
        paddingHorizontal:10,
        // overflow:'scroll',
        paddingBottom:25,
    },
    littlelist:{
        width:89,
        marginLeft:4,
        marginRight:4,

    },
    cont:{
        alignItems: 'center', 
    },
});
