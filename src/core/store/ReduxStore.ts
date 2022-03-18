import {applyMiddleware, createStore} from "redux";
import {addTradeHandler} from "./middleware/addTradeHandler";
import {rootReducer} from "./reducers";

export const store = createStore(rootReducer, applyMiddleware(addTradeHandler));