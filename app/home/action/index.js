import * as TYPES from './types';
import { postBody, postImgBody, BASE_URL } from '../../tools/api'
import { ToastCom } from '../../component/toast'
import { getCarsId, getCarList } from '../../cars/action/index'

import { clearMine } from '../../mine/action/index';
import { clearUser } from '../../user/action/index';
import { clearCars } from '../../cars/action/index';

// 获取首页的轮播图，消息，三个专区图片
export function getIndexInfo(opt) {
	return (dispatch) => {
		let URL = BASE_URL + '?method=advhome.getIndexAdvData&v=1.0'
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				// console.log(result);
				if (result.code === '0') {
					dispatch({ 'type': TYPES.GET_INDEXINFO, indexInfo: result.result });
				} else {
					// ToastCom({ title: 'offline', info: '网络连接失败' })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}
// 跳转到专区商品列表的（包括热销商品的跳转）
export function getSpecialProList(opt, pageNo, pageSize) {
	return (dispatch) => {
		if (pageNo && pageSize) {
			var URL = BASE_URL + '?method=goods.getCateResultQuery&v=1.0&keyword=' + opt + '&pageNo=' + pageNo + '&pageSize=' + pageSize
		} else {
			var URL = BASE_URL + '?method=goods.getCateResultQuery&v=1.0&keyword=' + opt
		}
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				// console.log(result);
				if (result.code === '0') {
					if (result.result.goodsList.length === 0) {
						dispatch({ 'type': TYPES.GET_SPECIALPROLIST, specialProList: [], isfresh: false, pageNo: pageNo });
					} else {
						dispatch({ 'type': TYPES.GET_SPECIALPROLIST, specialProList: result.result.goodsList, isfresh: true, pageNo: pageNo + 1 });
					}
				} else {
					ToastCom({ title: 'offline', info: '服务器异常' })
					dispatch({ 'type': TYPES.GET_SPECIALPROLIST, specialProList: [] });
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}
// 首页一加载就调用的热销商品
export function getHotProList(opt, pageNo, pageSize) {
	return (dispatch) => {
		if (pageNo && pageSize) {
			var URL = BASE_URL + '?method=goods.getCateResultQuery&v=1.0&keyword=' + opt + '&pageNo=' + pageNo + '&pageSize=' + pageSize
		} else {
			var URL = BASE_URL + '?method=goods.getCateResultQuery&v=1.0&keyword=' + opt
		}
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				if (result.code === '0') {
					dispatch({ 'type': TYPES.GET_HOTPROLIST, hotProList: result.result.goodsList });
				} else {
					// ToastCom({ title: 'offline', info: '网络连接失败' })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getGoodsList(opt) {
	return (dispatch) => {
		let URL = BASE_URL + '?method=goods.getGoodsList&v=1.0'
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				if (result.code === '0') {
					dispatch({ 'type': TYPES.GET_GOODSLIST, goodsList: result.result.goodsList });
				} else {
					ToastCom({ title: 'offline', info: '网络连接失败' })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function clearGoodsDetail() {
	return (dispatch) => {
		dispatch({ 'type': TYPES.GET_GOODSDETAIL, goodsDetail: {}, goodsSpec: {} });
	}
}

export function getGoodsDetail(opt) {
	return (dispatch) => {
		let URL = BASE_URL + '?method=goods.getGoodsDetail&v=1.0&specId=' + opt
		// console.log(URL)
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				// console.log(result);
				if (result.code === '0') {
					dispatch({ 'type': TYPES.GET_GOODSDETAIL, goodsDetail: result.result.goods, goodsSpec: result.result.goodsspec });
				} else {
					ToastCom({ title: 'offline', info: '网络连接失败' })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function addCars(opt) {
	return (dispatch) => {
		let body = postBody(opt)

		fetch(BASE_URL, {
			method: 'POST',
			headers: {
				//'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Type': 'multipart/form-data'
			},
			body: body
		}).then((response) => response.json())
			.then((result) => {
				if (result.code === '0') {
					ToastCom({ title: 'success', info: '加入购物车成功' })
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'cart.cartGoodsList',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = opt.sessionId
					dispatch(getCarList(obj))
				} else if (result.code === '6') {
					dispatch(clearMine())
					dispatch(clearUser())
					dispatch(clearCars())
					ToastCom({ title: 'fail', info: '登录信息过期，请重新登录' })
				} else {
					ToastCom({ title: 'fail', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function goToOrder(opt, navigator, goodsArr) {
	return (dispatch) => {
		let body = postBody(opt)

		fetch(BASE_URL, {
			method: 'POST',
			headers: {
				//'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Type': 'multipart/form-data'
			},
			body: body
		}).then((response) => response.json())
			.then((result) => {
				if (result.code === '0') {
					dispatch(getCarsId(result.result.cartIds))
					dispatch(change_animating(false))
					navigator.push({
						target: 'SureOrder',
						params: {
							goodsArr: goodsArr
						}
					})
					ToastCom({ title: 'success', info: '订单生成成功' })
					// storage.save({
					// 	key: 'carArr',  // 注意:请不要在key中使用_下划线符号!
					// 	data: {
					// 		carArr: result.resultsessionId.
					// 	},
					// })
				} else if (result.code === '6') {
					dispatch(clearMine())
					dispatch(clearUser())
					dispatch(clearCars())
					ToastCom({ title: 'fail', info: '登录信息过期，请重新登录' })
				} else {
					navigator.pop()
					ToastCom({ title: 'fail', info: '订单生成失败' })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function change_animating(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CHANGE_ANIMATING, animating: opt })
	}
}

export function changeShow(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CHANGE_SHOW, isShow: opt })
	}
}

export function changeShowStr(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CHANGE_SHOWSTR, showStr: opt })
	}
}

export function changeUpdateState(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CHANGE_UPDATESTATE, isUpdate: opt })
	}
}

export function changeUpdate(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CHANGE_UPDATE, update: opt })
	}
}

export function cleanSpecialProList() {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CLEAN_SPECIALPROLIST })
	}
}
