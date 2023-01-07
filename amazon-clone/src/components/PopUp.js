import React from 'react';
import "../css/popup.css";
import ReactDOM from "react-dom";
function PopUp(props) 
{
    let txtToShow = props.btntext == "Add to Basket" ? "Item Added" : "Item Removed";
    return ReactDOM.createPortal(
        <div className = {props.open ? "popup-active" : "popup-inactive"}>
            {txtToShow}
        </div>,
        document.getElementById("popup")
    );
}

export default PopUp

