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

import { Carousel } from 'antd-mobile'

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
                <Carousel
                    autoplay={true}
                    infinite={true}
                    selectedIndex={0}
                >
                    {props.data.map((item, i) => (
                        !item.advUrl?
                        <View key={i} disabled={props.isClick}>
                            <Image
                                source={{uri:item.imageUrl}}
                                style={[styles.imgView, props.imgStyle]}
                            />
                        </View>
                        :
                        (item.advUrl == "Main" ?
                        <TouchableOpacity key={i} disabled={props.isClick}  onPress={() => this.props.navigator.push({ target: item.advUrl ,params:{ info : item.advUrl }})}>
                            <Image
                                source={{uri:item.imageUrl}}
                                style={[styles.imgView, props.imgStyle]}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity key={i} disabled={props.isClick}  onPress={() => this.props.navigator.push({ target: item.advUrl})}>
                            <Image
                                source={{uri:item.imageUrl}}
                                style={[styles.imgView, props.imgStyle]}
                            />
                        </TouchableOpacity>)
                    ))}
                </Carousel>
            </View>
        )
    }
}
export default main

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 150,
        backgroundColor: '#00000000',
    },
    imgView: {
        height: 150,
        width: width,
    }
});
