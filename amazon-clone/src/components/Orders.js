import React from 'react'
import "../css/order.css";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react"; 
import { useStateValue } from "../StateProvider";
import Product from "./Product";
function Orders() 
{
    let productCss = {
        product_container_css : "payment-product",
        product_title_css: "payment-product-title",
        product_info_css: "payment-product-info",
        product_price_css: "payment-product-price",
        product_rating_css: "payment-product-rating",
        product_image_container_css: "payment-product-image-container",
        product_image_css: "payment-product-image",
        product_btn_container_css: "orders-product-btn-container",
        product_add_to_basket_btn_css: "payment-product-remove-from-basket-btn"
    }

    const [state, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => 
    {
        let temp = [];
        //Here we are getting the orders from db
          db.collection("users")
          .doc(state?.user)
          .collection("orders")
          .doc(state?.user)
          .get()
          .then(doc => 
           {
               if(doc.exists)
               {
                    doc.data().basket?.map(item => 
                    {
                        temp = [...temp, item];
                    })
               } 
              setOrders(temp);
          })
        
    }, [])


   
   
    return (
        <div className = "orders-page">
             <h1>Your Orders</h1>
            <div className = "orders-product-container">
            {
            orders?.map(item => {
                        console.log(item);
                        return <Product product = {item} 
                        key = {item.id}
                        productCss = {productCss}
                        productBtnText = {"Remove from basket"}/>
                    })
            }
            </div>
            <h1>Thanks for shopping with us</h1>
        </div>
    )
}

export default Orders
