import {put, takeLatest,call} from "redux-saga/effects";
import axios from "axios";
import { GET_PRODUCTS,SET_PRODUCTS } from "./constant";


function* fetchProductsSaga(action) {
  console.log("🚀 GET_PRODUCTS triggered. Starting fetch...");
    
  try {
    //console.log('📥 Action type: GET_PRODUCTS');
    const product = yield call(axios.get, 'http://172.19.0.96:3000/items');
    yield put({type: SET_PRODUCTS, payload: product.data});
  } catch (error) {
    console.error("Error fetching products:", error);
    
   
  }
}   
 export function* watchFetchProducts() {
  // console.log("👀 Watching for GET_PRODUCTS...");
  yield takeLatest(GET_PRODUCTS, fetchProductsSaga);

} 


