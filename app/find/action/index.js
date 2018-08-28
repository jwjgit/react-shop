import * as TYPES from './types';
import { postBody, postImgBody, BASE_URL } from '../../tools/api'
import { ToastCom } from '../../component/toast'

import { clearMine } from '../../mine/action/index';
import { clearUser } from '../../user/action/index';
import { clearCars } from '../../cars/action/index';

export function getGift(opt) {
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
                    ToastCom({ title: 'info', info: '领取成功！' })
                }else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else {
                    ToastCom({ title: 'info', info: result.message })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
}