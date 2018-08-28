import * as TYPES from '../action/types';
import * as initialState from '../store/index'

export default function user(state = initialState.news, action) {

	switch (action.type) {
		case TYPES.GET_NEWSLIST:
			return {
				...state,
				newsList: action.newsList
			}

		default:
			return state;
	}

} 