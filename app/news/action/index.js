import * as TYPES from './types';
import { postBody, postImgBody, BASE_URL } from '../../tools/api'
import { ToastCom } from '../../component/toast'

import { clearMine } from '../../mine/action/index';
import { clearUser } from '../../user/action/index';
import { clearCars } from '../../cars/action/index';

export function getNewsList(opt) {
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
					dispatch({ 'type': TYPES.GET_NEWSLIST, newsList: result.result.messageList });
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


