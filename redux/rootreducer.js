import { combineReducers } from 'redux';
import { cartReducer, productReducer } from './reducer';
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});
export default rootReducer;
