import {TradeAction, TradeActionTypes, TradesStore} from "../types/Trade";

const initialState: TradesStore = {
    trades: [],
    tradeModalIsOpened: false,
    isLoading: false
};

export const tradeReducer = (state = initialState, action: TradeAction): TradesStore => {
    switch (action.type) {
        case TradeActionTypes.OPEN_TRADE:
            return {
                ...state,
                tradeModalIsOpened: action.payload
            }

        case TradeActionTypes.ADD_TRADE:
            return {
                ...state,
                trades: [...state.trades, action.payload],
                isLoading: false,
                tradeModalIsOpened: false
            }

        case TradeActionTypes.TOGGLE_LOADING:
            return {
                ...state,
                isLoading: true
            }

        default:
            return state
    }
}