import * as TYPES from '../action/types';
import * as initialState from '../store/index'

export default function user(state = initialState.cate, action) {

	switch (action.type) {
		case TYPES.GET_ALLCATE:
			return {
				...state,
				allCate: action.allCate
			}

		case TYPES.GET_FINDLIST:
			return {
				...state,
				findGoodsList: state.findGoodsList.concat(action.findGoodsList),
				pageNo: action.pageNo,
				isrefresh: action.isfresh
			}

		case TYPES.CLEAN_FINDGOODSLIST:
			return {
				...state,
				findGoodsList: [],
				pageNo:1,
				isrefresh:true
			}
		default:
			return state;
	}

} 