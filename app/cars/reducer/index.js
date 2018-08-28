import * as TYPES from '../action/types';
import * as initialState from '../store/index'

export default function user(state = initialState.cars, action) {

	switch (action.type) {
		// case TYPES.CHANGE_NAME:
		// 	return {
		// 		...state,
		// 		carsArr: action.carsArr
		// 	}
		case TYPES.CAR_LIST:
			return {
				...state,
				carList: action.carList,
				carNum: action.carNum,
				carMoney: action.carMoney,
				selectArr: action.selectArr
			}

		case TYPES.SELECT_ADDR:
			return {
				...state,
				selectedAddr: action.selectedAddr
			}
		case TYPES.ORDER_GOODS:
			return {
				...state,
				orderGoods: action.orderGoods
			}

		case TYPES.GET_CARSID:
			return {
				...state,
				carsId: action.carsId
			}
		case TYPES.CHANGE_SELECT:
			return {
				...state,
				selectArr: action.selectArr
			}
		case TYPES.GET_PAYINFO:
			return {
				...state,
				payInfo: action.payInfo
			}

		case TYPES.CLEAR_CARS:
			return {
				...state,
				carList: [],
				carNum: 0,
				carMoney: 0,
				selectedAddr: {},
				orderGoods: [],
				carsId: '',
				selectArr: [],
				payInfo: {}
			}
		case TYPES.CHANGE_ALLCLICK:
			return {
				...state,
				allClick: action.allClick
			}
		case TYPES.CHANGE_POSTFEE:
			return {
				...state,
				postfee: action.postfee
			}
		case TYPES.CHANGE_INDEXNUM:
			return {
				...state,
				carList: action.carList,
				carNum: action.carNum
			}
		default:
			return state;
	}

}