import {Trade} from "core/interfaces/trade";
import {TradeModalFormData} from "core/interfaces/tradeModalForm";

export interface TradesStore {
    trades: Trade[];
    tradeModalIsOpened: boolean;
    isLoading: boolean;
}

export const enum TradeActionTypes {
    OPEN_TRADE = 'OPEN_TRADE',
    ADD_TRADE = 'ADD_TRADE',
    TOGGLE_LOADING = 'TOGGLE_LOADING'
}

interface OpenTrade {
    type: TradeActionTypes.OPEN_TRADE,
    payload: boolean
}

interface AddTrade {
    type: TradeActionTypes.ADD_TRADE,
    payload: TradeModalFormData
}

interface ToggleLoading {
    type: TradeActionTypes.TOGGLE_LOADING
}


export type TradeAction = OpenTrade | AddTrade | ToggleLoading;