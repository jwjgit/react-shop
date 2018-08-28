import * as TYPES from './types';
import { postBody, postImgBody, BASE_URL } from '../../tools/api'
import { ToastCom } from '../../component/toast'
import { Platform, NativeModules } from 'react-native'
import Alipay from 'react-native-alipay-zmt';

import { clearMine } from '../../mine/action/index';
import { clearUser } from '../../user/action/index';

var CryptoJS = require("crypto-js");
var Buffer = require('buffer').Buffer

export function getCarList(opt, stop) {
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
                if (!!stop) {
                    stop()
                }
                if (result.code === '0') {
                    if (result.result.cartVoList === undefined || result.result.cartVoList.length === 0) {
                        dispatch({ 'type': TYPES.CAR_LIST, carList: [], carNum: 0, carMoney: 0, selectArr: [] });
                    } else {
                        let arr = []
                        let obj =  false 
                        for (let i = 0; i < result.result.cartVoList[0].list.length; i++) {
                            arr.push(obj)
                        }
                        dispatch({ 'type': TYPES.CAR_LIST, carList: result.result.cartVoList[0].list, carNum: result.result.cartVoList[0].goodsNum, carMoney: result.result.cartVoList[0].goodsTotalPrice, selectArr: arr });
                    }
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

export function selectAddr(opt) {
    return (dispatch) => {
        dispatch({ 'type': TYPES.SELECT_ADDR, selectedAddr: opt })
    }
}

export function selectGoods(arr, a) {
    let type = true
    let ctarr = arr.map((item, i) => { 
        if (i === a) { 
            return !item  
        } else { 
            return item
        } 
    }) 
    // lala = [false ,true ]
    ctarr.indexOf(false)== -1 ? (type = true) :(type = false)
    // s.length == 1? type = true :type = false
    return (dispatch) => {
        dispatch({ 
            'type': TYPES.CHANGE_SELECT, 
            selectArr: ctarr
        })
        dispatch({ 'type': TYPES.CHANGE_ALLCLICK, allClick: type })
    }
}

export function selectAll(arr, click) {
    return (dispatch) => {
        let type = !click
        dispatch({ 'type': TYPES.CHANGE_SELECT, selectArr: arr.map((item, i) => { return type  }) })
        dispatch({ 'type': TYPES.CHANGE_ALLCLICK, allClick: type })
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
                    dispatch({ 'type': TYPES.ORDER_GOODS, orderGoods: result.result.map });
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

export function pursePay(opt,navigator) {
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
                    navigator.push({ target: 'Main' })
                    ToastCom({title:'success',info:'支付成功！'})
                    //dispatch({ 'type': TYPES.ORDER_GOODS, orderGoods: result.result.map });
                }else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                }else{
                    ToastCom({title:'fail',info:result.message})
                    navigator.push({ target: 'Main' })
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export function getCarsId(opt) {
    return (dispatch) => {
        dispatch({ 'type': TYPES.GET_CARSID, carsId: opt })
    }
}

export function getPayInfo(opt) {
    return (dispatch) => {
        let obj = {}
        // obj['ordersAmount'] = opt.goodsAmount
        obj['ordersAmount'] = opt.orderTotalPrice
        obj['orderPaySn'] = opt.paySn
        let arr = [{ createTimeStr: opt.createTimeStr }]
        obj['orderList'] = arr
        dispatch({ 'type': TYPES.GET_PAYINFO, payInfo: obj })
    }
}


export function submitOrder(opt, navigator) {
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
                    dispatch({ 'type': TYPES.GET_PAYINFO, payInfo: result.result });
                    navigator.push({ target: 'Payment' })
                }else if(result.code === '6'){
                    dispatch(clearMine())
                    dispatch(clearUser())
                    dispatch(clearCars())
                    ToastCom({title:'fail',info:'登录信息过期，请重新登录'})
                } else{
                    ToastCom({title:'fail',info:result.message})
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export function payByAli(opt, navigator) {
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
                    var b = new Buffer(result.result.result, 'base64')
                    var s = b.toString();
                    if (Platform.OS === 'ios') {
                        Alipay.pay(s)
                            .then(result => {
                                alert("result is ", result)
                                ToastCom({ title: 'success', info: '购买成功！' })
                                //show("result is ", result);
                                navigator.push({ target: 'Main' })
                                //show("result is ", result);
                            })
                            .catch(error => {
                                show(error);
                                navigator.push({ target: 'Main' })
                            })
                        navigator.push({ target: 'Main' })
                    } else {
                        let res = opt
                        NativeModules.AliPay.payV2(s).then(result => {
                            ToastCom({ title: 'success', info: '购买成功！' })
                            //show("result is ", result);
                            navigator.push({ target: 'Main' })
                        })
                            .catch(error => {
                                show(error);
                                navigator.push({ target: 'Main' })
                            })
                        //navigator.push({ target: 'Main' })
                    }
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

export function deleteCars(opt, fun) {
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
                    ToastCom({ title: 'success', info: '删除成功' })
                    fun()
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

export function clearCars(opt) {
    return (dispatch) => {
        dispatch({ 'type': TYPES.CLEAR_CARS })
    }
}

export function updateCount(opt,carList) {
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
                    //ToastCom({ title: 'success', info: '删除成功' })
                    let arr = carList
                    let n = 0
                    arr.map((item,i) =>
                        {if(item.cartId === opt.cartIds){
                            item.goodsNum = opt.count
                        }
                        n = n + item.goodsNum
                        }
                    )
                    dispatch({ 'type': TYPES.CHANGE_INDEXNUM, carList: arr,carNum:n})
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

export function getPostfee(opt) {
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
//              let postfee = result.result.transportFee ? result.result.transportFee : 0;
                    dispatch({ 'type': TYPES.CHANGE_POSTFEE, postfee: result.result.transportFee })
                    //ToastCom({ title: 'success', info: '删除成功' })
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






