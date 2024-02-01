import * as types from "./actionType";
import axios from "axios";
import {saveLocalData} from "../Utils/LocalStorage"

export const regiterUser = (payload) => (dispatch) => {
    dispatch({ type: types.REGISTER_USER_REQUEST });
    console.log(payload);
return axios
    .post(`http://localhost:8080/authentication/signup`, payload)
    .then((r) =>{
        alert(r.data.msg);
        if(r.data.msg === "Signup successfull"){
            dispatch({ type: types.REGISTER_USER_SUCCESS })}
            window.location.href = "/authentication/login"
        })
    .catch((err) => dispatch({ type: types.REGISTER_USER_ERROR, payload: err }));
};

export const checkUser = (payload) => (dispatch) => {
dispatch({ type: types.CHECK_REGISTER_USER_REQUEST });
return axios
    .post(`http://localhost:8080/authentication/login`,payload)
    .then((r) =>{
        alert(r.data.message)
        if(r.data.message == "Login successfull"){
            console.log(r.data.user);
            saveLocalData("token",r.data.token)
            saveLocalData("user",r.data.user)
            dispatch({ type: types.CHECK_REGISTER_USER_SUCCESS})
            window.location.href = "/"
        }
    })
    .catch((err) =>
    dispatch({ type: types.CHECK_REGISTER_USER_ERROR, payload: err })
    );
};

export const logout = () => (dispatch) => {
dispatch({ type: types.LOGOUT_USER });
};

export const getcart=(payload)=>(dispatch)=>{
    dispatch({type:types.GET_CARTDATA_REQUEST})
    return axios.post(`http://localhost:8080/cart`,payload)
    .then(r=>{
        if(r.data.msg == "Here your cart Items"){
            let cart = r.data.cart;
            dispatch({type:types.GET_CARTDATA_SUCCESS,payload:cart})
        }
        else{
            dispatch({type:types.GET_DATA_FAILURE})
        }
    })
    .catch(err=>(dispatch({type:types.GET_DATA_FAILURE})))
}


export const addcart=(payload)=>(dispatch)=>{
    dispatch({type:types.ADD_CARTDATA_REQUEST})
    return axios.put(`http://localhost:8080/cart/addcart`,payload)
    .then(r=>{
        alert(r.data.msg)
        if(r.data.msg == "Product Added to Cart Successfully"){
        dispatch({type:types.ADD_CARTDATA_SUCCESS})}
        else{
            dispatch({type:types.ADD_CARTDATA_FAILURE})
        }
    })
    .catch((err)=>{
        dispatch({type:types.ADD_CARTDATA_FAILURE})
    })
}

export const updatecart=(payload)=>(dispatch)=>{
    if(payload.count>=1){
    // console.log(payload);
    dispatch({type:types.UPDATE_CARTDATA_REQUEST})
    return axios.patch(`http://localhost:8080/cart/updatecart`,payload)
    .then(r=>{
        if(r.data.msg == "Cart Updated Successfully"){
            dispatch({type:types.UPDATE_CARTDATA_SUCCESS})
        }
    })
    .catch((err)=>{
        dispatch({type:types.UPDATE_CARTDATA_FAILURE})
    })
}}

export const delcartitem=(payload)=>(dispatch)=>{
    dispatch({type:types.DELETE_CARTITEM_REQUEST})
    return axios.post(`http://localhost:8080/cart/delcart`,payload)
    .then(r=>{
        alert(r.data.msg)
        if(r.data.msg == "Product Deleted Successfully"){
        dispatch({type:types.DELETE_CARTITEM_SUCCESS})}
        else{
            dispatch({type:types.DELETE_CARTITEM_FAILURE})
        }
    })
    .catch((err)=>{
        dispatch({type:types.DELETE_CARTITEM_FAILURE})
    })
}

