
import { combineReducers } from 'redux';
import homeReducer from '../home/reducer/index.js';
import mainReducer from '../main/reducer/index.js';
import carsReducer from '../cars/reducer/index.js';
import findReducer from '../find/reducer/index.js';
import mineReducer from '../mine/reducer/index.js';
import newsReducer from '../news/reducer/index.js';
import userReducer from '../user/reducer/index.js';
import cateReducer from '../cate/reducer/index.js'

export default combineReducers({
	homeStore: homeReducer,
	mainStore: mainReducer,
	carsStore: carsReducer,
	findStore: findReducer,
	mineStore: mineReducer,
	newsStore: newsReducer,
	userStore: userReducer,
	cateStore: cateReducer
});

