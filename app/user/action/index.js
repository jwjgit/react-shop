import * as TYPES from './types';
import { postBody, postImgBody, BASE_URL } from '../../tools/api'
import { ToastCom } from '../../component/toast'
import { getAddr } from '../../mine/action/index'
import { changeUpdateState, changeUpdate } from '../../home/action/index'

import { clearMine } from '../../mine/action/index';
import { clearCars } from '../../cars/action/index';

const appId = '1.1.7'  //这个需要注意：只能x.x.x 不能两位数，因为我们是做字符串的比较

export function loginByPwd(opt, navigator) {
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
				// console.log(result)
				if (result.code === '0') {
					dispatch({ 'type': TYPES.LOGIN_PWD, userInfo: result.result, sessionId: result.result.sessionId });
					dispatch(getAddr(result.result.addressList))
					navigator.resetTo({ target: 'Main' })
					// ToastCom({ title: 'info', info: '登陆成功！' })
					storage.save({
						key: 'sessionId',  // 注意:请不要在key中使用_下划线符号!
						data: {
							sessionId: result.result.sessionId
						},
					})
					storage.save({
						key: 'userInfo',  // 注意:请不要在key中使用_下划线符号!
						data: {
							userInfo: result.result
						},
					})
					storage.save({
						key: 'addrArr',  // 注意:请不要在key中使用_下划线符号!
						data: {
							addrArr: result.result.addressList
						},
					})
				}else if(result.code==='11'){
					ToastCom({ title: 'info', info: '账号不存在' })
				} else{
					ToastCom({ title: 'info', info: result.message })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}



export function appLaunch(opt, user) {
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
				// console.log(result)
				if (result.code === '0') {
					if (appId  >=  result.result.version) {
						if (result.result.needLogin) {
							storage.remove({
								key: 'userInfo'
							})
							storage.remove({
								key: 'sessionId'
							})
							//ToastCom({ title: 'info', info: '需要登录' })
							dispatch(clearSeesionId())
						} else {
							//ToastCom({ title: 'info', info: '登陆成功' })
							dispatch({ 'type': TYPES.LOGIN_PWD, userInfo: user, sessionId: user.sessionId });
						}
					} else {
						let newObj = {}
						newObj['v'] = result.result.version
						newObj['mes'] = result.result.message
						dispatch(changeUpdateState(true))
						dispatch(changeUpdate(newObj))
					}
				} else {
					ToastCom({ title: 'offline', info: '网络连接失败' })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function changeTName(opt, name) {
	return (dispatch) => {
		let obj = opt
		obj['trueName'] = name
		dispatch({ 'type': TYPES.CHANGE_TNAME, userInfo: obj });
		storage.save({
			key: 'userInfo',  // 注意:请不要在key中使用_下划线符号!
			data: {
				userInfo: obj
			},
		})
	}
}

export function changeUserinfo(opt, newobj) {
	return (dispatch) => {
		let obj = opt
		obj['nickName'] = newobj.nickName
		obj['sex'] = newobj.sex
		obj['birthday'] = newobj.birthday
		dispatch({ 'type': TYPES.CHANGE_USERINFO, userInfo: obj });
		storage.save({
			key: 'userInfo',  // 注意:请不要在key中使用_下划线符号!
			data: {
				userInfo: obj
			},
		})
	}
}

export function setPaySelect(opt, navigator) {
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
				// console.log(result)
				if (result.code === '0') {
					ToastCom({ title: 'success', info: '设置成功' })
					navigator.pop()
					// console.log(result)
				}else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
					ToastCom({ title: 'fail', info: result.message })
					navigator.pop()
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function getAuthCode(opt) {
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
				// console.log(result)
				if (result.code === '0') {
					dispatch({ 'type': TYPES.GET_AUTHCODE, });
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

export function register(opt, navigator) {
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
				// console.log(result)
				if (result.code === '0') {
					ToastCom({ title: 'info', info: '注册成功！' })
					var timestamp = Date.parse(new Date());
					let jsonArr = {
						method: 'user.login',
						type: '1'
					}
					jsonArr['timestamp'] = timestamp
					jsonArr['userName'] = opt.userName
					jsonArr['password'] = opt.password
					dispatch(loginByPwd(jsonArr, navigator))
				} else {
					ToastCom({ title: 'info', info: result.message })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function forget(opt, navigator) {
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
				// console.log(result)
				if (result.code === '0') {
					ToastCom({ title: 'info', info: '修改成功！' })
					var timestamp = Date.parse(new Date());
					let jsonArr = {
						method: 'user.login',
						type: '1'
					}
					jsonArr['timestamp'] = timestamp
					jsonArr['userName'] = opt.userName
					jsonArr['password'] = opt.password
					dispatch(loginByPwd(jsonArr, navigator))
				} else {
					ToastCom({ title: 'info', info: result.message })
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}
}

export function clearSeesionId() {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CLEAR_SESSIONID });
	}
}

export function clearUser(opt) {
	return (dispatch) => {
		dispatch({ 'type': TYPES.CLEAR_USER })
	}
}

