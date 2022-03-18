import {combineReducers} from "redux";
import {tradeReducer} from "./tradeReducer";

export const rootReducer = combineReducers({
    trade: tradeReducer
})

export type RootState = ReturnType<typeof rootReducer>