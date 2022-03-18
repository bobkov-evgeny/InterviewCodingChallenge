import { Middleware } from "redux";
import { TradeActionTypes } from "../types/Trade";

export const addTradeHandler: Middleware = (store) => (next) => (action) => {
    if (action.type === TradeActionTypes.ADD_TRADE) {
        store.dispatch({type: TradeActionTypes.TOGGLE_LOADING});
        setTimeout(() => {
            return next(action);
        }, 2000);
    } else {
        return next(action);
    }
}