import * as TYPES from '../action/types';
import * as initialState from '../store/index'

export default function user(state = initialState.user, action) {

	switch (action.type) {
		// case TYPES.CHANGE_NAME:
		// 	return {
		// 		...state,
		// 		carsArr: action.carsArr
		// 	}

		case TYPES.LOGIN_PWD:
			return {
				...state,
				userInfo: action.userInfo,
				sessionId: action.sessionId
			}

		case TYPES.CHANGE_TNAME:
			return {
				...state,
				userInfo: action.userInfo,
			}

		case TYPES.GET_AUTHCODE:
			return {
				...state,
				authcodeStart: true,
			}
		case TYPES.CLEAR_SESSIONID:
			return {
				...state,
				sessionId: '',
			}
		case TYPES.CHANGE_USERINFO:
			return {
				...state,
				userInfo: action.userInfo,
			}
		case TYPES.CLEAR_USER:
			return {
				...state,
				userInfo: {},
				sessionId: '',
				authcodeStart: false
			}





		default:
			return state;
	}

} 