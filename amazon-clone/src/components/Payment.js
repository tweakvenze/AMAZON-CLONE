import React from 'react';
import "../css/payment.css";
import { useStateValue } from '../StateProvider';
import Product from "../components/Product";
import { getBasketTotal } from '../Reducer';
import {useState} from "react";
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
function Payment() 
{
    const history = useHistory();
    const [state, dispatch] = useStateValue();
    const [disabled, setDisabled] = useState(true);
    const [btntxt, setbtntxt] = useState("Buy Now");
    let totalItemsInBasket = state.basket?.length;
    let basket = state.basket;
    let basketTotal = getBasketTotal(state.basket);
    let productCss = {
        product_container_css : "payment-product",
        product_title_css: "payment-product-title",
        product_info_css: "payment-product-info",
        product_price_css: "payment-product-price",
        product_rating_css: "payment-product-rating",
        product_image_container_css: "payment-product-image-container",
        product_image_css: "payment-product-image",
        product_btn_container_css: "payment-product-btn-container",
        product_add_to_basket_btn_css: "payment-product-remove-from-basket-btn"
    }

    function handleChange(event)
    {
        setDisabled(event.empty);
    }

    function handleClick(event)
    {
        if(state.user === "Hello Guest")
        {
            alert("You need to sign in first to make a payment");
            history.push("/signin");
        }
        else{

            //When payment is processing btn is disabled and txt is changed to 
            //processing
            setDisabled(true);
            setbtntxt("Processing");

            //Just mocking the payment here
            setTimeout(() => 
            {
                //Pushing the data in DB    
                //Currently i am only storing one order per person
                db.collection("users")
                .doc(state.user)
                .collection("orders")
                .doc(state.user)//This will generate a id for orders
                .set({
                    basket: state.basket,
                    amount:basketTotal
                });

                //After placing the order cart would be empty
                dispatch({
                    type: "EMPTY_BASKET",
                })

                //We go towards orders page here
                history.replace("/orders");
            }, 1000);
        }
    }

    return (
        <div className = "payment-page">
            <div className = "delivery-details-container">
                <h3 className = "delivery-address-label">Delivery Address:</h3>
                <div className = "delivery-details">
                    <h5 className = "customer-name">ankur75@gmail.com</h5>
                    <h5 className = "customer-address">741, kamaniya gate, jabalpur</h5>
                    <h5 className = "customer-country">Bhopal, India</h5>
                </div>
            </div>

            <div className = "products-bought-details-container">
                <h1 className = "products-bought-details-title">Review Items</h1>
                {
                    basket.map(item => {
                        //console.log(item);
                        return <Product product = {item} 
                        key = {item.id}
                        productCss = {productCss}
                        productBtnText = {"Remove from basket"}/>
                    })
                }
            </div>
            
            <div className = "payment-method-container">
                <h3 className = "payment-method-label">Payment Method:</h3>
                <div className = "payment-details-container">
                    <h3>Card Details</h3>
                    <CardElement onChange = {handleChange}/>
                    <div className = "payment-total-price-container">
                        <h3>Order Total: ${basketTotal}</h3>
                        <button disabled = {disabled} 
                        onClick = {handleClick}>{btntxt}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
