import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	View,
	Platform
} from 'react-native';
import { } from 'antd-mobile'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { connect } from 'react-redux';
import { } from '../action/index';

class main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			isclick: false,
			isChange: false,
		};
	}

	componentWillMount(){
	
	}

	componentDidMount(){
        // 定时: 隔2s切换到Main
        setTimeout(()=>{
            // 页面的切换
            this.props.navigator.replace({
                target: 'Ad', // 具体路由的版块
            });
        }, 1000);
	}
	

	render() {
		let props = this.props
		return (
			<View style={styles.container}>
				<Image
					source={require('../../img/launch.jpg')}
					style={styles.headView}
				/>

			</View>
		)
	}

}

function select(store) {
	return {
	}
}

export default connect(select)(main);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headView: {
		height: height,
		width: width
	}

});
