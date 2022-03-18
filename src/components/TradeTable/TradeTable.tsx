import React from "react";
import {useTypedSelector} from "core/hooks/useTypedSelector";
import TradeListItem from "components/TradeListItem/TradeListItem";

import "./TradeTable.scss";

const TradeTable: React.FC = () => {
    const {trades} = useTypedSelector(state => state.trade);

    return (
        <div className='trade-table'>
            <table>
                <thead>
                    <tr>
                        <th style={{width: '100px'}}>Trade ID</th>
                        <th>Amount</th>
                        <th>Currency</th>
                    </tr>
                </thead>

                <tbody style={{height: trades.length ? 'auto' : '100px'}}>
                    {trades.length > 0 ?
                        trades.map((tradeItem, index) => (
                            <TradeListItem
                                currency={tradeItem.currency}
                                amount={tradeItem.amount}
                                id={index}
                                key={index}
                            />
                        ))
                        :
                        <tr className='empty-table-filler'/>
                    }
                </tbody>
            </table>
        </div>
    )
};

export default TradeTable;