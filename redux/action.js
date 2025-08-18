import { ADD_to_CART,REMOVE_from_CART ,SET_PRODUCTS,GET_PRODUCTS,EMPTY_CART} from "./constant";

export const addtocart=(item)=>{
    
    return {
        type: ADD_to_CART,
        payload: item
   
    }
}
export const removetocart=(item)=>{
    return {
        type: REMOVE_from_CART,
        payload: item
    }}
export const emptycart=()=>{
    return { 
        type: EMPTY_CART
    }}

export const getproduct=()=>{
   console.log('📥 Action type: GET_PRODUCTS');
    return {
        type: GET_PRODUCTS
    }
}
export const setproduct=(item)=>{
    return {
        type: SET_PRODUCTS,
        payload: item
    }
}