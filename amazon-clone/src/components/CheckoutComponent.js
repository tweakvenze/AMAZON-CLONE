import React from 'react'
import "../css/checkout.css";
import { getBasketTotal, getBasketTotal1 } from '../Reducer';
import { useStateValue } from '../StateProvider';
import Product from './Product';
import Subtotal from './SubtotalComponent';
import ScrollToTop from "./ScrollToTop";
function CheckoutComponent() 
{
    const [state, dispatch] = useStateValue();
    let basket = state.basket;

    //getBasketTotal is a function defined in reducer.js
    let basketTotal = getBasketTotal(basket);
    
    let productCss = {
      product_container_css : "checkout-product",
      product_title_css: "checkout-product-title",
      product_info_css: "checkout-product-info",
      product_price_css: "checkout-product-price",
      product_rating_css: "checkout-product-rating",
      product_image_container_css: "checkout-product-image-container",
      product_image_css: "checkout-product-image",
      product_btn_container_css: "checkout-product-btn-container",
      product_add_to_basket_btn_css: "checkout-product-remove-from-basket-btn"
    }

    return (
        <div className = "checkout">
            <div className = "checkout-left">
                <img className = "checkout-title-image" src = "https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"></img>
                <h1 className = "checkout-title">Your Shopping Basket total ({state.basket.length} items)</h1>
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
            <div className = "checkout-right">
                <Subtotal totalNumberOfItems = {state.basket.length}
                basketTotal = {basketTotal}/>
            </div>      
        </div>
    )
}

export default CheckoutComponent
