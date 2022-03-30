import { combineReducers } from 'redux';
// slices
import cartReducer from './slices/cart';
import calendarReducer from './slices/calendar';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
	cart: cartReducer,
	calendar: calendarReducer,
});

export default rootReducer;
