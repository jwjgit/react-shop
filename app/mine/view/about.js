import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	StatusBar,
	ScrollView,
	FlatList,
	View
} from 'react-native';

import { connect } from 'react-redux';

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { ListView } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'

import { getbankList } from '../action/index';

class main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	render() {
		let props = this.props
		return (
			<View style={styles.container}>
				<ScrollPage
					title='关于我们'
					isScroll={true}
					barStyle="light-content"
					navigator={this.props.navigator}
					left={require('../../img/back.png')}
					leftClick={() => this.props.navigator.pop()}
					bgImg={require('../../img/navbar_bg.png')}
					bg={true}
				>
					<View style={{ flex: 1, alignItems: 'center', }}>
						<Image
							source={require('../../img/head.png')}
							style={{ height: 100, width: 100, marginTop: 50, marginBottom: 30 }}
						/>
						<Text>德鑫云商 v1.1.7</Text>
					</View>

				</ScrollPage>

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
		backgroundColor: '#f4f4f4',
		alignItems: 'center',

	},
	rowView: {
		width: 0.95 * width,
		height: 0.95 * width * 370 / 660,
		paddingLeft: 30,
		justifyContent: 'space-between',
	},
	rowBackground: {
		width: 0.95 * width,
		height: 0.95 * width * 370 / 660,
		position: 'absolute',

	},
	rowTopView: {
		paddingHorizontal: 30,
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowBottomView: {
		justifyContent: 'center',
		paddingHorizontal: 15,
		height: 43
	},
	rowIndexView: {
		flexDirection: 'row',
		alignItems: 'center',
	}


});
