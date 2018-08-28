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
import { TabBar, ActivityIndicator, Grid } from 'antd-mobile'
import FindPage from '../../component/findpage'
import { CachedImage } from "react-native-img-cache";

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { getCate} from '../action/index';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 0,
        }
    }

    componentWillMount = () =>{
        let { dispatch } = this.props
        dispatch(getCate())
    }

    search = (str)=>{
        this.props.navigator.push({target:'FindGoodsList',params:{name:str,type:'2'}})
    }


    render() {
        // console.log(this.props.allCate);
        return (
            <View style={styles.container}>
                <FindPage
                    bgImg={require('../../img/navbar_bg.png')}
                    bg={true}
                    barStyle="light-content"
                    isScroll={false}
                    navigator={this.props.navigator}
                    search={(e)=>this.search(e)}
                >
                    {this.props.allCate.length === 0?
                        <ActivityIndicator/>
                        :
                        <View style={{ width: width, flex:1, flexDirection: 'row', paddingBottom:Platform.OS==='ios'?50:0}}>
                        <View
                            style={{ width: 0.3 * width, height: height - 114, backgroundColor: 'white' }}>
                            <ScrollView>
                            {this.props.allCate.map((item, i) => (
                                <TouchableOpacity
                                    style={{ width: 0.3 * width, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.select === i ? '#f4f4f4' : 'white' }}
                                    key={i}
                                    onPress={()=>this.setState({select:i})}
                                >
                                    <Text>{item.gcName}</Text>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                        </View>
                        <View style={{ width: 0.7 * width,flex:1}}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                alwaysBounceVertical={false}
                                automaticallyAdjustContentInsets={false}
                                style={{ flex: 1 }}
                            >
                                {this.props.allCate[this.state.select].classCustomList.map((data,i)=>(
                                    data.classCustomList.length !== 0&&
                                    <View key={i} style={{padding:10}}>
                                        <Text style={{paddingLeft:15,marginBottom:20}}>{data.gcName}</Text>
                                        <Grid data={data.classCustomList}
                                            columnNum={3}
                                            itemStyle={{ height: 100 ,backgroundColor:'white'}}
                                            hasLine={false}
                                            renderItem={dataItem => (
                                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                                                onPress={()=>this.props.navigator.push({target:'FindGoodsList',params:{gcRelId:dataItem.gcRelId,type:'1'}})}
                                            >
                                                <Image
                                                    source={!!dataItem.gcPic?{  uri: 'http://img.njdexin.cn' + dataItem.gcPic }:require('../../img/loading.jpg')}
                                                    style={{ width: 50, height: 50 }}
                                                />
                                                <Text style={{ marginTop: 5 }}>{dataItem.gcName}</Text>
                                            </TouchableOpacity>
                                                )}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    }
                </FindPage>
            </View>
        )
    }

}

function select(store) {
    return {
        allCate: store.cateStore.allCate
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
