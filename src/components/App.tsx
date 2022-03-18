import React from "react";
import {useTypedSelector} from "core/hooks/useTypedSelector";
import {useActions} from "core/hooks/useActions";
import TradeModal from "components/TradeModal/TradeModal";
import TradeTable from "components/TradeTable/TradeTable";

import '../styles/main.scss';

export const App: React.FC = () => {
    const {tradeModalIsOpened} = useTypedSelector(state => state.trade)
    const {openTrade} = useActions();

    return (
        <div className="container">
            <button
                className='action-button'
                type='button'
                onClick={() => openTrade(!tradeModalIsOpened)}
            >
                Open Trade
            </button>

            <TradeTable/>
            {tradeModalIsOpened && <TradeModal/>}
        </div>
    )
};
