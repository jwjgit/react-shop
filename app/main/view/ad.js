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
import { TabBar, Icon, Drawer } from 'antd-mobile'

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { appLaunch } from '../../user/action/index';
import { getAddr } from '../../mine/action/index'
import { changeUpdateState, changeUpdate } from '../../home/action/index'
class main extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount = () => {
		let sessionId = '0'
		storage.load({
			key: 'userInfo',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
				extraFetchOptions: {
				},
				someFlag: true,
			},
		}).then(ret => {
			// console.log(ret)
			sessionId = ret.userInfo.sessionId
			var timestamp = Date.parse(new Date());
			let obj = {
				method: 'index.checkVersion',
			}
			obj['timestamp'] = timestamp
			obj['sessionId'] = sessionId
			let { dispatch } = this.props
			dispatch(appLaunch(obj, ret.userInfo))
			dispatch(getAddr(ret.userInfo.addressList))
		}).catch(err => {
			switch (err.name) {
				case 'NotFoundError':
					var timestamp = Date.parse(new Date());
					let ret = {}
					let obj = {
						method: 'index.checkVersion',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = sessionId
					let { dispatch } = this.props
					dispatch(appLaunch(obj, ret))
					break;
				case 'ExpiredError':
					// TODO
					break;
			}
		})
	}

	componentDidMount() {
		// 定时: 隔2s切换到Main
		setTimeout(() => {
			// 页面的切换
			this.props.navigator.replace({
				target: 'Main', // 具体路由的版块
			});
		}, 3000);
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
