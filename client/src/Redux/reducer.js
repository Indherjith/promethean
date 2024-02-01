import * as types from "./actionType";
import { getLocalData } from "../Utils/LocalStorage";
const initialState = {
  products: [],
  cart: [],
  isLoading: false,
  isError: false,
  isAuth: getLocalData("token") ? true : false,
  token: getLocalData("token") || "",
  userData : getLocalData("user") || ""
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.GET_DATA_SUCCESS:
      return {
        ...state,
        products: [...payload],
        isLoading: false,
        isError: false,
      };
    case types.GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.GET_CARTDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.GET_CARTDATA_SUCCESS:
      return {
        ...state,
        cart: payload,
        isLoading: false,
        isError: false,
      };
    case types.GET_CARTDATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.ADD_CARTDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.ADD_CARTDATA_SUCCESS: {
      let newCart = [...state.cart, payload];
      return {
        ...state,
        cart: newCart,
        isLoading: false,
        isError: false,
      };
    }
    case types.ADD_CARTDATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.UPDATE_CARTDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.UPDATE_CARTDATA_SUCCESS: {
      let newcart = state.cart.map((item) =>
        item.id === payload.id ? payload : item
      );
      return {
        ...state,
        cart: newcart,
        isLoading: false,
        isError: false,
      };
    }
    case types.UPDATE_CARTDATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.REGISTER_USER_REQUEST: {
        return { 
            ...state, 
            isError : false,
            isLoading: true
        };
    }

    case types.REGISTER_USER_SUCCESS: {
        return { 
            ...state, 
            isError : false,
            isLoading: false
        };
    }
    case types.REGISTER_USER_ERROR: {
        return { 
            ...state, 
            isError: true, 
            isLoading: false
        };
    }

    //checkuser
    case types.CHECK_REGISTER_USER_REQUEST: {
        return { 
            ...state, 
            isLoading: true,
            isError : false 
        };
    }
    case types.CHECK_REGISTER_USER_SUCCESS: {
        return { 
            ...state, 
            isLoading: false,
            isError : false,
            userData : payload
        };
    }
    case types.CHECK_REGISTER_USER_ERROR: {
        return { 
            ...state, 
            isError: true, 
            isLoading: false 
        };
    }

    //logout
    case types.LOGOUT_USER: {
        localStorage.removeItem("token");
        return { 
            ...state, 
            isLoading: false,
            isError:false, 
            token: "", 
            isAuth: false 
        };
    }
    
    default:
      return state;
  }
};
export { reducer };