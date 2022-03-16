import { combineReducers } from 'redux';
// slices
import cartReducer from './slices/cart';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
	cart: cartReducer,
});

export default rootReducer;
