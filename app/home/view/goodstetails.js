// 商品详情页
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	TouchableHighlight,
	View,
	Modal,
	Platform
} from 'react-native';
import { TabBar, Icon, Badge ,Carousel } from 'antd-mobile'
import ViewPager from './component/viewpage'
import Stepper from './component/stepper'
import ScrollPage from '../../component/scrollpage'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { ToastCom } from '../../component/toast'
import ActivityInd from './ActivityIndicator'

import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度

import { connect } from 'react-redux';
import { getGoodsDetail, addCars, goToOrder, change_animating,clearGoodsDetail } from '../action/index';


class LoadingImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: width,
			height: 100,
			isCol: false
		}
	}

	componentDidMount = () => {
		Image.getSize(this.props.image, (w, h) => {
			this.setState({ height: width * h / w });
		})
	}

	render() {
		return (
			<Image style={[styles.imageStyle, { width: this.state.width, height: this.state.height }]}
				source={{ uri: this.props.image }} />
		)
	}

}

class main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			isclick: false,
			isChange: false,
			modalVisible: false,
			specId: '',
			num: 1,
			goodsType: '请选择'
		};
	}

	componentDidMount = () => {
		let { dispatch } = this.props
		dispatch(clearGoodsDetail())
		dispatch(getGoodsDetail(this.props.specId))
	}

	changeSpecId = (e, type) => {
		this.setState({
			specId: e,
			goodsType: type
		})
	}

	addToCar = () => {
		if (!!this.props.sessionId) {
			if (!!this.state.specId) {
				var timestamp = Date.parse(new Date());
				let obj = {
					method: 'cart.addToCart',
				}
				obj['timestamp'] = timestamp
				obj['goodsId'] = this.props.goodsDetail.goodsId
				obj['count'] = this.state.num.toString()
				obj['specId'] = this.state.specId
				obj['sessionId'] = this.props.sessionId
				let { dispatch } = this.props
				dispatch(addCars(obj))
			} else {
				ToastCom({ title: 'info', info: '请选择商品分类！' })
				this.setModalVisible(false)
			}
		} else {
			ToastCom({ title: 'info', info: '请您先登录！' })
			this.props.navigator.push({ target: 'Login' })
		}

	}



	goToOrder = () => {

		if(!(!this.props.userInfo.trueName || this.props.userInfo.trueName === this.props.userInfo.userName) ){
			if (!!this.props.sessionId) {
				if (!!this.state.specId) {
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'cart.goToOrder',
					}
					obj['timestamp'] = timestamp
					obj['goodsId'] = this.props.goodsDetail.goodsId
					obj['count'] = this.state.num
					obj['specId'] = this.state.specId
					obj['sessionId'] = this.props.sessionId
					let { dispatch } = this.props
					let goodsObj = this.props.goodsDetail
					goodsObj['goodsNum'] = this.state.num.toString()
					goodsObj['specInfo'] = this.state.goodsType
					let arr = [goodsObj]
					dispatch(goToOrder(obj, this.props.navigator, arr))
					dispatch(change_animating(true))
				} else {
					ToastCom({ title: 'info', info: '请选择商品分类！' })
					this.setModalVisible(false)
				}
			} else {
				ToastCom({ title: 'info', info: '请您先登录！' })
				this.props.navigator.push({ target: 'Login' })
			}
		}else{
			ToastCom({title:'info',info:'购买需要实名认证'})
			this.props.navigator.push({target:'ApproveReal'})
		}
	}

	changeNum = (n) => {
		this.setState({
			num: n
		})
	}


	render() {
		let props = this.props.goodsDetail
		let arr = []
		let detailArr = ''
		if (!!props.goodsImageMore || JSON.stringify(props.goodsImageMore) == "{}") {
			let temp = props.goodsImageMore.split(",")
			for (let i = 0; i < temp.length; i++) {
				if (temp[i] === '') {
					continue
				}
				let json = {}
				json['uri'] = 'http://img.njdexin.cn' + temp[i]
				arr.push({ img: json })
			}
			
		} else {
			arr = [{ img: require('../../img/loading.jpg') }, { img: require('../../img/loading.jpg') }]
		}
		if (!!props.mobileBody) {
			let str = props.mobileBody
			let tempStr = str.replace(/&quot;/g, '"')
			let newobj = JSON.parse(tempStr)
			detailArr = newobj
		} else {
			detailArr = []
		}
		return (
			<View style={styles.container}>
				<ScrollPage
					title='商品详情'
					barStyle="dark-content"
					navigator={this.props.navigator}
					bg={true}
					bgImg={require('../../img/white_bg.jpg')}
					titleStyle={{ color: 'black' }}
					left={require('../../img/home_back.png')}
					leftClick={() => this.props.navigator.pop()}
				>
					<View style={{ 
						width: width,...ifIphoneX({ height: height - 172 }, { height: height - 114 }) }}>
						<ScrollView>
							<Carousel
								autoplay={true}
								infinite={true}
								selectedIndex={1}
								style={{height:375}}
							>
								{arr.map(ii => (
									<View key={ii} >
										<Image
											source={ii.img}
											style={{width:width,height:375}}
										/>
									</View>
								))}
							</Carousel>
							<View style={styles.goodsText}>
								<Text style={styles.titleText} numberOfLines={2}>{props.goodsName}</Text>
								<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
									<Text style={styles.priceText}>{'￥' + props.goodsPrice}</Text>
									<Text style={{ fontSize: 12, color: '#999',marginTop:5 }}>浏览量:{props.goodsClick}</Text>
								</View>
							</View>
							<View style={[styles.itemView, { justifyContent: 'space-between' }]}>
								<Text style={styles.firstText}>运费：自理</Text>
								<Text style={styles.firstText}>{'销量：' + props.salenum}</Text>
							</View>
							<View style={styles.itemView}>
								<Image
									source={require('../../img/home_db.png')}
									style={{ height: 15, width: 15, marginRight: 5 }}
								/>
								<Text style={styles.secondText}>企业认证</Text>
								<Image
									source={require('../../img/home_db.png')}
									style={{ height: 15, width: 15, marginRight: 5 }}
								/>
								<Text style={styles.secondText}>担保交易</Text>
								<Image
									source={require('../../img/home_db.png')}
									style={{ height: 15, width: 15, marginRight: 5 }}
								/>
								<Text style={styles.secondText}>正品保证</Text>
							</View>
							<TouchableHighlight style={[styles.itemView, { justifyContent: 'space-between', paddingHorizontal: 0 }]} onPress={() => { this.setModalVisible(true) }}>
								<View style={[styles.itemView, { justifyContent: 'space-between' }]} >
									<Text style={styles.thirdText}>{'分类：' + this.state.goodsType} </Text>
									<Image
										source={require('../../img/home_to.png')}
										style={{ height: 15, width: 15 }}
									/>
								</View>
							</TouchableHighlight>

							<View style={{ width: width, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
								<View style={{ height: 0.5, width: 50, backgroundColor: '#8a8a8a' }} />
								<Image
									source={require('../../img/home_goos.png')}
									style={{ height: 12, width: 12, marginLeft: 15 }}
								/>
								<Text style={{ color: '#8a8a8a', fontSize: 11, marginRight: 15 }}>详情</Text>
								<View style={{ height: 0.5, width: 50, backgroundColor: '#8a8a8a' }} />
							</View>
							{detailArr.map(item => (
								<LoadingImage
									key={item.value}
									image={'http://img.njdexin.cn' + item.value}
								/>
								//console.log('http://img.njdexin.cn' + item.value)
							))
							}


							<View style={{ marginTop: 22 }}>
								<Modal
									animationType={"slide"}
									transparent={true}
									visible={this.state.modalVisible}
									onRequestClose={() => this.setModalVisible(false)}
								>
									<ModalView
										goodsImg={arr[0].img}
										close={() => this.setModalVisible(false)}
										goodsSpec={this.props.goodsSpec}
										changeSpecId={(e, t) => this.changeSpecId(e, t)}
										changeNum={(n) => this.changeNum(n)}
										num={this.state.num}
									/>
								</Modal>
							</View>
						</ScrollView>
					</View>
					<View style={styles.bottomView}>
						<TouchableOpacity style={styles.bottomSmallView} onPress={() => this.setState({ isCol: !this.state.isCol })}>
							<Image
								source={this.state.isCol ? require('../../img/home_scr.png') : require('../../img/home_sc.png')}
								style={{ width: 24, height: 24, }}
							/>
							<Text style={{ fontSize: 11, color: '#000000', marginTop: 5 }}>收藏</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.bottomSmallView} onPress={() => this.props.navigator.resetTo({ target: 'Main', params: { info: 'cars' } })}>
							
								<Image
									source={require('../../img/home_cars.png')}
									style={{ width: 24, height: 24 }}
								/>
								<Badge
								size={'small'}
								text={this.props.carNum}
								style={{position:'absolute',right:15,top:10}}
							></Badge>
								<Text style={{ fontSize: 11, color: '#000000', marginTop: 5 }}>购物车</Text>
								
							
						</TouchableOpacity>
						<TouchableOpacity style={[styles.bottomBigView, { backgroundColor: '#ea3130' }]} onPress={() => this.addToCar()}>
							<Text style={{ fontSize: 16, color: 'white' }}>加入购物车</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.bottomBigView, { backgroundColor: '#fe942a' }]} onPress={() => this.goToOrder()}>
							<Text style={{ fontSize: 16, color: 'white' }}>立即购买</Text>
						</TouchableOpacity>
						<ActivityInd />
					</View>
				</ScrollPage>
			</View>
		)
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

}

function select(store) {
	return {
		goodsDetail: store.homeStore.goodsDetail,
		sessionId: store.userStore.sessionId,
		goodsSpec: store.homeStore.goodsSpec,
		carNum: store.carsStore.carNum,
		userInfo:store.userStore.userInfo

	}
}

export default connect(select)(main);

class ModalView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			goodsType: '请选择套餐类型',
			typeArr: [],
			price: '',
			num: 0,
		};
	}

	changeTypeArr = (i, id) => {
		let tempArr = this.state.typeArr
		tempArr[i] = id
		this.setState({
			typeArr: tempArr
		})
		for (let a = 0; a < this.props.goodsSpec.goodsSpecs.length; a++) {
			if (this.props.goodsSpec.goodsSpecs[a].specValueIdStr === tempArr.toString()) {
				let str = ''
				let newobj = JSON.parse(this.props.goodsSpec.goodsSpecs[a].specGoodsSpec)
				for (let key in newobj) {
					str = str + newobj[key] + '  '
				}
				this.props.changeSpecId(this.props.goodsSpec.goodsSpecs[a].goodsSpecId, str)
				this.setState({ price: this.props.goodsSpec.goodsSpecs[a].specGoodsPrice, num: this.props.goodsSpec.goodsSpecs[a].specGoodsStorage, goodsType: str })
				break
			}
		}


	}

	submitType = () => {
		if (this.props.num > this.state.num || this.state.num === 0) {
			ToastCom({ title: 'info', info: '库存不足，请重新选择' })
			this.props.changeSpecId('', '请选择！')
			this.props.close()
		} else {
			this.props.close()
		}
	}

	cha = () => {
		this.props.changeSpecId('', '请选择！')
		this.props.close()
	}

	render() {
		let props = this.props
		let nameArr = []
		if (props.goodsSpec !== null) {
			for (let key in props.goodsSpec.specname) {
				let temp = {}
				temp['id'] = key
				temp['name'] = props.goodsSpec.specname[key]
				nameArr.push(temp)
			}
		}
		return (
			<View style={{ marginTop: 22, height: 400, width: width, position: 'absolute', backgroundColor: '#ffffff',
			...ifIphoneX({ bottom: 34 }, { bottom:0}) }}>
				<View style={{ paddingHorizontal: 15, paddingVertical: 7, flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'row', }}>
						<Image
							source={props.goodsImg}
							style={{ height: 80, width: 80, position: 'relative', top: 0, borderWidth: 2, borderColor: 'red', borderRadius: 4 }}
						/>
						<View style={{ marginLeft: 10 }}>
							<Text style={{ color: 'red', fontSize: 15 }}>{'￥' + this.state.price}</Text>
							<Text style={{ color: 'black', fontSize: 12, marginTop: 5 }}>{'库存' + this.state.num + '件'}</Text>
							<Text style={{ color: 'black', fontSize: 12, marginTop: 5 }}>{this.state.goodsType}</Text>
						</View>
					</View>
					<TouchableOpacity onPress={() => this.cha()}>
						<Image
							source={require('../../img/home_cha.png')}
							style={{ width: 20, height: 20 }}
						/>
					</TouchableOpacity>
				</View>
				<View>
					{nameArr.map((item, i) => (
						<View key={item.id} style={{ width: width, paddingHorizontal: 15 }}>
							<Text>{item.name}</Text>
								<SelectTag
									tagArr={props.goodsSpec.specvalue[item.id]}
									changeArr={(e) => this.changeTypeArr(i, e)}
								/>
						</View>
					))
					}
				</View>
				<View style={{ width: width, padding: 15, alignItems: 'center', flexDirection: 'row', }}>
					<Text>数量：</Text>
					<Stepper
						max={this.state.num}
						min={0}
						num={1}
						changeNum={(e) => props.changeNum(e)}
					/>
				</View>
				<TouchableOpacity style={styles.buttonView} onPress={() => this.submitType()}>
					<Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>确 定</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

class SelectTag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedId: ''
		};
	}

	selectTag = (tagName) => {
		this.setState({
			selectedId: tagName
		})
		this.props.changeArr(tagName)
	}

	render() {
		let props = this.props
		return (
			<View style={{ width: width, paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row',flexWrap:'wrap'}}>
				{props.tagArr.map(item => (
					<Tag
						key={props.spValueId}
						name={item.spValueName}
						id={item.spValueId}
						select={(e) => this.selectTag(e)}
						selectedId={this.state.selectedId}
					/>
				))
				}
			</View>
		)
	}
}

const Tag = (props) => {
	return (
		<TouchableOpacity
			style={[{ padding: 2, borderWidth: 1, borderRadius: 3, borderColor: '#d4d4d4', marginRight: 20,marginBottom:5 }, props.selectedId === props.id && { borderColor: 'red', }]}
			onPress={() => props.select(props.id)}>
			<Text style={[{ color: '#d4d4d4', fontSize: 12 }, props.selectedId === props.id && { color: 'red', }]}>{props.name}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4f4f4',
	},
	bottomView: {
		width: width,
		height: 50,
		backgroundColor: 'white',
		position: 'absolute',
		...ifIphoneX({
			bottom: 34
		}, {
			bottom: Platform.OS == 'ios' ? 0 : 0
		}),
		flexDirection: 'row',
		alignItems: 'center',
	},
	bottomSmallView: {
		width: 0.2 * width,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	bottomBigView: {
		width: width * 0.3,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},

	goodsText: {
		width: width,
		padding: 15,
		marginVertical: 1,
		backgroundColor: 'white'
	},
	titleText: {
		fontSize: 16,
		marginBottom: 5,
		fontWeight: 'bold',
		color: 'black'
	},
	priceText: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'red',
		marginTop: 5
	},
	itemView: {
		width: width,
		marginVertical: 1,
		backgroundColor: 'white',
		height: 40,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 15
	},
	firstText: {
		fontSize: 14,
		color: '#a3a3a3'
	},
	secondText: {
		fontSize: 11,
		color: '#727070',
		marginRight: 10
	},
	thirdText: {
		fontSize: 11,
		color: '#000000',
	},
	buttonView: {
		width: width,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
		position: 'absolute',
		bottom: 0,
		
	},
	yihang:{
	// 	flex:1,
		// width:width,
		flexDirection: 'row',
		flexWrap:'wrap'
	}
	
});
