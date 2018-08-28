import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Alert
} from 'react-native';
import Barcode from 'react-native-smart-barcode'


export default class App extends Component{
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            viewAppear: false,
        };
    }
    componentDidMount() {
        //启动定时器
        this.timer = setTimeout(
            () => this.setState({viewAppear: true}),
            250
        );
    }
    //组件销毁生命周期
    componentWillUnmount() {
        //清楚定时器
        this.timer && clearTimeout(this.timer);
    }

    _onBarCodeRead = (e) => {
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();
        let res = e.nativeEvent.data.code.replace('http://share.njdexin.cn/#/regist/share/code=','')
        this.props.navigator.replace({ target: 'Regist', params: { info: res } })
    };

    _startScan = (e) => {
        this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.viewAppear ?
                    <Barcode style={{flex: 1,}} ref={component => this._barCode = component}
                             onBarCodeRead={this._onBarCodeRead}/>
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
