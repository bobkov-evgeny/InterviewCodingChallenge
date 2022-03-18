import React from "react";
import TradeModalForm from "../TradeModalForm/TradeModalForm";
import {useActions} from "core/hooks/useActions";
import {useTypedSelector} from "core/hooks/useTypedSelector";

import './TradeModal.scss';

const TradeModal: React.FC = () => {
    const {openTrade} = useActions();
    const {tradeModalIsOpened} = useTypedSelector(state => state.trade);

    const handleModalClose = () => openTrade(!tradeModalIsOpened);

    return (
        <div
            className={`modal-container ${tradeModalIsOpened ? 'show' : ''}`}
            onMouseDown={handleModalClose}
        >
            <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    Open new trade
                    <span style={{cursor: 'pointer'}} onClick={handleModalClose}>
                        &#10005;
                    </span>
                </div>

                <hr/>

                <div className="modal-body">
                    <TradeModalForm />
                </div>
            </div>
        </div>
    )
};

export default TradeModal;