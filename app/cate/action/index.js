import * as TYPES from './types';
import { postBody, postImgBody, BASE_URL } from '../../tools/api'
import { ToastCom } from '../../component/toast'

export function getCate(opt) {
	return (dispatch) => {
		let URL = BASE_URL + '?method=goods.getGoodsCategory&v=1.0&gcParentId=bf4604623f8649deb5102350c7740da5'
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				if (result.code === '0') {
					dispatch({ 'type': TYPES.GET_ALLCATE, allCate: result.result.allCates });
				} else {
					ToastCom({ title: 'offline', info: '网络连接失败' })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getCateGoodsList(gcRelId, pageNo, pageSize) {
	return (dispatch) => {
		let URL = BASE_URL
		if (pageNo && pageSize) {
			URL = URL + '?method=goods.getGoodsKeyWords&v=1.0&keyword=' + gcRelId + '&pageNo=' + pageNo + '&pageSize=' + pageSize
		} else {
			URL = URL + '?method=goods.getGoodsKeyWords&v=1.0&keyword=' + gcRelId
		}
		// console.log(URL)
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				// console.log(result);
				if (result.code === '0') {
					if (result.result.goodsList.length === 0) {
						dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: [], isfresh: false, pageNo: pageNo });
					} else {
						dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: result.result.goodsList, isfresh: true, pageNo: pageNo + 1 });
					}
				} else {
					ToastCom({ title: 'offline', info: '网络连接失败' })
					dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: [] });
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getFindGoodsList(src, pageNo, pageSize) {
	return (dispatch) => {
		if (pageNo && pageSize) {
			var URL = BASE_URL + '?method=goods.getGoodsListByCondition&v=1.0&keyword=' + src + '&pageNo=' + pageNo + '&pageSize=' + pageSize
		} else {
			var URL = BASE_URL + '?method=goods.getGoodsListByCondition&v=1.0&keyword=' + src 
		}
		// console.log(URL)
		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				if (result.code === '0') {
					if (result.result.goodsList.length === 0) {
						dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: [], isfresh: false, pageNo: pageNo });
					} else {
						dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: result.result.goodsList, isfresh: true, pageNo: pageNo + 1 });
					}
				} else {
					ToastCom({ title: 'offline', info: '网络连接失败' })
					dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: [] });
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}
export function getSpecialGoodsList(txt, keyword, pageNo, pageSize) {
	return (dispatch) => {
		if (pageNo && pageSize) {
			var URL = BASE_URL + '?method=goods.getCateResultQuery&v=1.0&goodsName=' + txt + '&keyword=' + keyword + '&pageNo=' + pageNo + '&pageSize=' + pageSize
		} else {
			var URL = BASE_URL + '?method=goods.getCateResultQuery&v=1.0&goodsName=' + txt + '&keyword=' + keyword
		}

		fetch(URL, {
			method: 'GET',
		}).then((response) => response.json())
			.then((result) => {
				if (result.code === '0') {
					if (result.result.goodsList.length === 0) {
						dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: [], isfresh: false, pageNo: pageNo });
					} else {
						dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: result.result.goodsList, isfresh: true, pageNo: pageNo + 1 });
					}

				} else {
					ToastCom({ title: 'offline', info: '网络连接失败' })
					dispatch({ 'type': TYPES.GET_FINDLIST, findGoodsList: [] });
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function cleanFindGoodsList() {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CLEAN_FINDGOODSLIST })
	}
}
