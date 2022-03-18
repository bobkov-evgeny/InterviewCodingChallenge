import React from "react";
import {TradeListItemProps} from "core/interfaces/tradeListItem";

const TradeListItem: React.FC<TradeListItemProps> = ({currency, amount, id}) => {

    return (
        <tr>
            <td>#{id + 1}</td>
            <td>{amount}</td>
            <td>{currency}</td>
        </tr>
    )
};

export default React.memo(TradeListItem);