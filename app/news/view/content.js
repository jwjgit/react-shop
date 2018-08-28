import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	WebView,
	ScrollView,
	TextInput,
	View
} from 'react-native';
import { TabBar, Icon, Drawer } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'


import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度
import { htmlChange } from '../../tools/htmlchange'


import { connect } from 'react-redux';
import { getNewsList } from '../action/index';

class main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			content: ''
		}
	}

	componentWillMount = () => {
		let str = htmlChange(this.props.info)
		this.setState({ content: str })
	}


	render() {
		return (
			<View style={styles.container}>
				<ScrollPage
					title='消息详情'
					isScroll={true}
					barStyle="light-content"
					navigator={this.props.navigator}
					bgImg={require('../../img/navbar_bg.png')}
					bg={true}
					left={require('../../img/back.png')}
					leftClick={() => this.props.navigator.pop()}
				>
					<WebView
						source={{ html: this.state.content, baseUrl: '' }}
						style={{ height: height, width: width }}
						scalesPageToFit={true}
					>
					</WebView>
				</ScrollPage>
			</View>
		)
	}

}

class Index extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<View style={{ width: width, padding: 15, backgroundColor: 'white' }}>
				<Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{this.props.info.messageTitle}</Text>
				<Text style={{ marginTop: 10 }}>{this.props.info.sendtimeStr}</Text>
			</View>
		)
	}
}

function select(store) {
	return {
		sessionId: store.userStore.sessionId,
		newsList: store.newsStore.newsList
	}
}

export default connect(select)(main);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});
