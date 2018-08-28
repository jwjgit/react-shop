import * as TYPES from '../action/types';
import * as initialState from '../store/index'

export default function user(state = initialState.home, action) {

	switch (action.type) {
		// case TYPES.CHANGE_NAME:
		// 	return {
		// 		...state,
		// 		carsArr: action.carsArr
		// 	}
		case TYPES.CLEAN_SPECIALPROLIST:
			return {
				...state,
				specialProList: [],
			}
		case TYPES.GET_SPECIALPROLIST:
			return {
				...state,
				specialProList: state.specialProList.concat(action.specialProList),
				isrefresh: action.isfresh,
				pageNo: action.pageNo
			}
		case TYPES.GET_HOTPROLIST:
			return {
				...state,
				hotProList: action.hotProList
			}
		case TYPES.GET_INDEXINFO:
			return {
				...state,
				indexInfo: action.indexInfo
			}
		case TYPES.GET_GOODSLIST:
			return {
				...state,
				goodsList: action.goodsList
			}
		case TYPES.GET_GOODSDETAIL:
			return {
				...state,
				goodsDetail: action.goodsDetail,
				goodsSpec: action.goodsSpec
			}
		case TYPES.CHANGE_SHOW:
			return {
				...state,
				isShow: action.isShow
			}
		case TYPES.CHANGE_SHOWSTR:
			return {
				...state,
				showStr: action.showStr
			}
		case TYPES.CHANGE_UPDATESTATE:
			return {
				...state,
				isUpdate: action.isUpdate
			}
		case TYPES.CHANGE_UPDATE:
			return {
				...state,
				update: action.update
			}


		default:
			return state;
	}

} 