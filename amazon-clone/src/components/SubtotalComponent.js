import React from 'react'
import { useHistory} from "react-router-dom";
function SubtotalComponent(props) 
{
    let history = useHistory();
    let totalNumberOfItems = props.totalNumberOfItems;
    let basketTotal = props.basketTotal;
    return (
        <div className = "subtotal-container">
            <p className = "total-price">Subtotal ({totalNumberOfItems}): 
            <strong>${basketTotal}</strong></p>
            <input type = "checkbox" id = "gift"></input>
            <label for = "gift" className = "gift-label">This order contains a gift</label>
            <button className = "checkout-button" 
            onClick = {() => history.push("/payments")}>Proceed to checkout</button>
        </div>
    )
}

export default SubtotalComponent
