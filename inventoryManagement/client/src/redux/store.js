import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import counterReducer from "./slices/counterSlice";
import productReducer from "./slices/productSlice";

let reducers = combineReducers({
  product: productReducer,
  counter: counterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
  { reducer: reducers },
  composeEnhancers(applyMiddleware({})),
);

export default store;
