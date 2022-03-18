import {TradeActionTypes} from "../types/Trade";
import {TradeModalFormData} from "core/interfaces/tradeModalForm";

export const openTrade = (isModalOpened: boolean) => {
    return {
        type: TradeActionTypes.OPEN_TRADE,
        payload: isModalOpened
    };
}

export const addTrade = (formData: TradeModalFormData) => {
    return {
        type: TradeActionTypes.ADD_TRADE,
        payload: formData
    };
}
