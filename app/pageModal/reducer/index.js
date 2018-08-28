import * as TYPES from '../action/types';
import * as initialState from '../store/index'

export default function user(state = initialState.home, action) {

	switch (action.type) {
		// case TYPES.CHANGE_NAME:
		// 	return {
		// 		...state,
		// 		carsArr: action.carsArr
		// 	}

		default:
			return state;
	}

} 