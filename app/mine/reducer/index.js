import * as TYPES from '../action/types';
import * as initialState from '../store/index'

export default function user(state = initialState.mine, action) {

	switch (action.type) {
		// case TYPES.CHANGE_NAME:
		// 	return {
		// 		...state,
		// 		carsArr: action.carsArr
		// 	}
		case TYPES.GET_ADDR:
			return {
				...state,
				addrArr: action.addrArr
			}
		case TYPES.SAVE_ADDR:
			return {
				...state,

			}
		case TYPES.GET_RESULT:
			return {
				...state,
				result: action.result
			}
		case TYPES.GET_WALLET:
			return {
				...state,
				wallet: action.wallet
			}
		case TYPES.GET_BANKLIST:
			return {
				...state,
				bankList: action.bankList,
				moBank: action.moBank
			}
		case TYPES.CHANGE_BANK:
			return {
				...state,
				moBank: action.moBank
			}
		case TYPES.GET_ORDERLIST:
			return {
				...state,
				orderList: action.orderList,
				orderList1: action.orderList1,
				orderList2: action.orderList2,
				orderList3: action.orderList3,
				orderList4: action.orderList4,
			}
		case TYPES.GET_ORDERDETAIL:
			return {
				...state,
				orderDetail: action.orderDetail,
				expressVoList: action.expressVoList,
			}
		case TYPES.GET_RECOMLIST:
			return {
				...state,
				recomList: action.recomList,
			}
		case TYPES.GET_MOADDR:
			return {
				...state,
				moAddr: action.moAddr,
			}
		case TYPES.CLEAR_MINE:
			return {
				...state,
				addrArr: [],
				result: '',
				wallet: {
					availablePredeposit: 0,
					freezePredeposit: 0,
					memberPoints: 0
				},
				bankList: [],
				moBank: {},
				orderList: [],
				orderList1: [],
				orderList2: [],
				orderList3: [],
				orderList4: [],
				recomList: [],
				moAddr: {}
			}
		case TYPES.YUELI_LIST:
			return {
				...state,
				yueliList: action.yueliList,
		}
		case TYPES.YUELI_RECORD:
			return {
				...state,
				yueliRecord: action.yueliRecord,
		}
		case TYPES.GET_CHANPINLIST:
			return {
				...state,
				chanpinList: action.chanpinList,
		}
		default:
			return state;
	}

} 