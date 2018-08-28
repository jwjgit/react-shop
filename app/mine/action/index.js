import * as TYPES from './types';
import { Platform, NativeModules } from 'react-native'
import { postBody, postImgBody, BASE_URL } from '../../tools/api'
import { ToastCom } from '../../component/toast'
import Alipay from 'react-native-alipay-zmt';
import { changeTName, changeUserinfo } from '../../user/action/index'
import { payByAli } from '../../cars/action/index'

import { clearUser } from '../../user/action/index';
import { clearCars } from '../../cars/action/index';

export function getyueliRecord(opt) {
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
					dispatch({ 'type': TYPES.YUELI_RECORD, yueliRecord :result.result.reOrderHisList });
                }else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export function getyueliOrder(opt) {
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
					dispatch({ 'type': TYPES.YUELI_LIST, yueliList :result.result.reOrderList });
                }else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export function getAddr(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.GET_ADDR, addrArr: opt });
	}
}

export function getMoAddr(opt,callback) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.GET_MOADDR, moAddr: opt });
		callback(opt.cityId)
	}
}

export function saveAddr(opt, navigator) {
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
					//dispatch({ 'type': TYPES.SAVE_ADDR, });
					ToastCom({ title: 'success', info: '添加成功' })
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'user.getAddressList',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = opt.sessionId
					dispatch(getAddrList(obj))
					navigator.pop()
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'success', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function updateAddr(opt, navigator) {
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
					//dispatch({ 'type': TYPES.SAVE_ADDR, });
					ToastCom({ title: 'success', info: '修改成功' })
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'user.getAddressList',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = opt.sessionId
					dispatch(getAddrList(obj))
					navigator.pop()
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'success', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function delAddr(opt, navigator) {
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
					//dispatch({ 'type': TYPES.SAVE_ADDR, });
					ToastCom({ title: 'success', info: '删除成功' })
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'user.getAddressList',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = opt.sessionId
					dispatch(getAddrList(obj))
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'success', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getAddrList(opt) {
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
					dispatch({ 'type': TYPES.GET_ADDR, addrArr: result.result.addressList });
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function ChongZhi(opt,navigator) {
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
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'cart.getSign',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = opt.sessionId
					obj['outTradeNo'] = result.result.recharge.pdrSn
					dispatch(payByAli(obj, navigator))
					// if (Platform.OS === 'ios') {
					// 	Alipay.pay("biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22R20180213134320307%22%7D&method=alipay.trade.app.pay&charset=utf-8&notify_url=http%3A%2F%2Fapi.njdexin.cn%2FmobileAlipay%2Fmobile%2Fnotify_topUp&version=1.0&app_id=2018012001992432&timestamp=2016-07-29+16%3A55%3A53&sign_type=RSA2&sign=XzYGsqChzYOGHPFQV7fEbnAx0Fdm1tsonuwMt5suYGYc5Ufn2x7anqqgBubXrpaq6Crc%2BbWvvohn%2B0ckfAnOJ5qv2dBtcDWSZUEWoY5CjMyAvKql%2BDU5WiouoYya3YoW6D0XdOSO0LGYS8MX7VYP7g1F79Gic3NtrrRSgyr2XpH72ZcRR4jETqUjgyVNODXU6fxYBWeXnlUtAgduGrjjaAsGAn6L5k6fDLfge5W49g27KUAPw4SjUtTNdeHX87%2Fz891WjOmMHit5jaHbE8oeC07YGjF%2BlHvFahzArFyflW9hlrugnmZhpfCR5NhrWu1qqDFiyKEfC9PenmD0ObUyCA%3D%3D")
					// 		.then(result => {
					// 			console.log("result is ", result);
					// 			alert("result is ", result)
					// 			//show("result is ", result);
					// 		})
					// 		.catch(error => {
					// 			console.log(error);
					// 			show(error);
					// 		})
					// } else {
					// 	let res = result.result.recharge
					// 	NativeModules.AliPay.payV2({ account: res.pdrAmount.toString(), orderNo: res.pdrSn.toString(), time: res.createTimeStr, url: 'http://api.njdexin.cn/mobileAlipay/mobile/notify_topUp', title: '消费-南京德云鑫电子商务有限公司' }).then(result => {
					// 		console.log("result is ", result);
					// 		ToastCom({ title: 'success', info: '充值成功！' })
					// 		navigator.push({ target: 'Main' })
					// 		//show("result is ", result);
					// 	})
					// 		.catch(error => {
					// 			console.log(error);
					// 			show(error);
					// 			navigator.push({ target: 'Main' })
					// 		})
					// }
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'fail', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function realName(opt, navigator, userInfo) {
	return (dispatch) => {
		var timestamp = Date.parse(new Date());
		let obj = {
			method: 'buyer.bankCardQuery',
		}
		obj['timestamp'] = timestamp
		obj['cardNo'] = opt.accountNo
		obj['sessionId'] = opt.sessionId
		let body = postBody(obj)
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
					let bodys = postBody(opt)
					fetch(BASE_URL, {
						method: 'POST',
						headers: {
							//'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Type': 'multipart/form-data'
						},
						body: bodys
					}).then((response) => response.json())
						.then((result) => {
							if (result.code === '0') {
								let tname = result.result.userTureName
								dispatch(changeTName(userInfo, tname))
								dispatch({ 'type': TYPES.GET_RESULT, result: result.result.realAuth });
							}
							navigator.push({ target: 'ResultPage' })
						})
						.catch((error) => {
							console.error(error);
						})
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }else{
					ToastCom({title:'fail',info:'银行卡号码不正确'})
					dispatch({ 'type': TYPES.GET_RESULT, result: 'F' });
					navigator.push({ target: 'ResultPage' })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getWallet(opt) {
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
					dispatch({ 'type': TYPES.GET_WALLET, wallet: result.result });
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function cash(opt, navigator) {
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
				// console.log(result);
				if (result.code === '0') {
					navigator.push({ target: 'Main' })
					ToastCom({ title: 'success', info: '提交成功！1~5个工作日到账！' })
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'fail', info: result.message })
					navigator.push({ target: 'Main' })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getbankList(opt) {
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
					let moBank = {}
					for (let i = 0; i < result.result.cardList.length; i++) {
						if (result.result.cardList[i].isDefault === '1') {
							moBank = result.result.cardList[i]
						}
					}
					dispatch({ 'type': TYPES.GET_BANKLIST, bankList: result.result.cardList, moBank: moBank });
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getOrderList(opt) {
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
					let orderList = []
					let orderList1 = []
					let orderList2 = []
					let orderList3 = []
					let orderList4 = []
					let arr = result.result.orderList
					for (let i = 0; i < arr.length; i++) {
						switch (arr[i].orderState) {
							case 10:
								orderList1.push(arr[i])
								break
							case 20:
								orderList2.push(arr[i])
								break
							case 30:
								orderList3.push(arr[i])
								break
							case 40:
								orderList4.push(arr[i])
								break
						}
					}
					dispatch({ 'type': TYPES.GET_ORDERLIST, orderList: arr, orderList1: orderList1, orderList2: orderList2, orderList3: orderList3, orderList4: orderList4, });
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getOrderDetail(opt) {
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
					// let moBank = {}
					// for (let i = 0; i < result.result.cardList.length; i++) {
					// 	if (result.result.cardList[i].isDefault === '1') {
					// 		moBank = result.result.cardList[i]
					// 	}
					// }
					// console.log(result)
					// let expressInfo =  JSON.parse(result.result.expressInfo);
					dispatch({ 'type': TYPES.GET_ORDERDETAIL, orderDetail: result.result.orderList,expressVoList:result.result.expressVoList});
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function logOff(opt, navigator) {
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
					storage.remove({
						key: 'userInfo'
					});
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function changeBank(opt, navigator) {
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
					dispatch({ 'type': TYPES.CHANGE_BANK, moBank: result.result.card });
					navigator.pop()
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function addBank(opt, navigator) {
	return (dispatch) => {
		var timestamp = Date.parse(new Date());
		let obj = {
			method: 'buyer.bankCardQuery',
		}
		obj['timestamp'] = timestamp
		obj['cardNo'] = opt.cardNo
		obj['sessionId'] = opt.sessionId
		let body = postBody(obj)
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
					let bodys = postBody(opt)
					fetch(BASE_URL, {
						method: 'POST',
						headers: {
							//'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Type': 'multipart/form-data'
						},
						body: bodys
					}).then((response) => response.json())
						.then((result) => {
							if (result.code === '0') {
								//dispatch({ 'type': TYPES.GET_RESULT, result: result.result.realAuth });
								ToastCom({ title: 'success', info: '添加成功！' })
								navigator.push({ target: 'Main' })
							}
							//navigator.push({ target: 'ResultPage' })
						})
						.catch((error) => {
							console.error(error);
						})
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getRecomList(opt) {
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
					dispatch({ 'type': TYPES.GET_RECOMLIST, recomList: result.result.memberList });
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function updateUserinfo(opt, userinfo) {
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
					dispatch(changeUserinfo(userinfo, opt));
					ToastCom({ title: 'success', info: '修改成功' })
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'fail', info: reuslt.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function clearMine(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CLEAR_MINE })
	}
}

export function cancelOrder(opt, navigator) {
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
					ToastCom({ title: 'success', info: '取消成功' })
					navigator.push({ target: 'Main' })
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'buyer.getOrderList',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = opt.sessionId
					dispatch(getOrderList(obj))
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'fail', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function finishOrder(opt, navigator) {
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
					ToastCom({ title: 'success', info: '确认成功' })
					navigator.push({ target: 'Main' })
					var timestamp = Date.parse(new Date());
					let obj = {
						method: 'buyer.getOrderList',
					}
					obj['timestamp'] = timestamp
					obj['sessionId'] = opt.sessionId
					dispatch(getOrderList(obj))
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'fail', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getChanpinList(opt,callback) {
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
					dispatch({ 'type': TYPES.GET_CHANPINLIST, chanpinList: result.result.reTypeList });
					callback(result.result.reTypeList )

				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }else{
					ToastCom({ title: 'fail', info: result.message })
				}

			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function zaitou(opt,navigator) {
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
					navigator.resetTo({ target: 'Main'})
					ToastCom({ title: 'success', info: '再投成功' })
					// let obj = {
					// 	method: 'regular.getOrderList',
					// 	sessionId:opt.sessionId,
					// 	timestamp:opt.timestamp,
					// }
					// dispatch(getyueliOrder(obj))
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }else{
					ToastCom({ title: 'fail', info: result.message })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}




