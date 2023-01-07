import './app.css';
import Navbar from "./components/NavbarComponent";
import HomeImage from "./components/HomeImageComponent";
import Products from "./components/Product";
import {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CheckOut from "./components/CheckoutComponent";
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";
import { useEffect } from "react";
import LoginComponent from './components/LoginComponent';
import ScrollToTop from "./components/ScrollToTop";
import Payment from './components/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './components/Orders';
function App() 
{
  let products = [
    {
      productId: 1,
      productTitle: "The Lean Startup: How Constant Innovation creates" 
      + "Constant succesfull business asdjasdjh, asdnasmd asd asdāśd" +  
     "as da sd a sda sdasd asdasdasd asdasd",
      productPrice: 11.47,
      productrating: 3,
      productImage: "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
    },
    {
      productId: 2,
      productTitle: "Xiaomi POCO M3 Smartphone, 4 GB + 64 GB, 6.53 Pollici FHD + Ampio 1080P FHD + Display 52 MP, Tripla Fotocamera, 6000 mAh Batteria, Doppi Altoparlanti",
      productPrice: 11.47,
      productrating: 3,
      productImage: "https://m.media-amazon.com/images/I/61gQhjBgwBL._AC_UL320_.jpg"
    },
    {
      productId: 3,
      productTitle: "2020 Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage, backlit keyboard) - Space Gray",
      productPrice: 11.47,
      productrating: 3,
      productImage: "https://m.media-amazon.com/images/I/71an9eiBxpL._AC_UY218_.jpg"
    },
    {
      productId: 4,
      productTitle: "Hisense 40-Inch 40H5500F Class H55 Series Android Smart TV with Voice Remote (2020 Model)",
      productPrice: 11.47,
      productrating: 3,
      productImage: "https://m.media-amazon.com/images/I/61lJa-K8CqL._AC_UL320_.jpg"
    },
  ];
  let productCss = {
    product_container_css : "product",
    product_title_css: "product-title",
    product_info_css: "product-info",
    product_price_css: "product-price",
    product_rating_css: "product-rating",
    product_image_container_css: "product-image-container",
    product_image_css: "product-image",
    product_btn_container_css: "product-btn-container",
    product_add_to_basket_btn_css: "product-add-to-basket-btn"
  };
  const [state, dispatch] = useStateValue();

  const promise = loadStripe("pk_test_51ItXdvSF1DG0iX3gF8W557q9tbde6y1s5XpUrbgQHBK7srlgFj3KJZSzRz8Lfv81Y04HxsZAzUcWuZl7vlHiEF9500CqdXbiVc");

  //This is load after the component is loaded
  useEffect(() => 
  {
    //Adding the listener on auth
    auth().onAuthStateChanged(authUser => {
      if(authUser)
      {
        //If user is authenticated
        dispatch({
          type: "SET_USER",
          user: authUser.email,
        })
      }
      else
      {
        dispatch({
          type: "SET_USER",
          user: "Hello Guest",
        })
      }
    })
  }, []);


  return (
    <div className="app">
       <Router>
         <Switch>

          {/*Checkout Page */} 
          <Route path="/checkout">
            <Navbar/>
            <ScrollToTop/>
            <div className = "checkout-page-container">
              <CheckOut/>
            </div>
          </Route>

          {/*Orders Page */}
          <Route path="/orders">
            <Navbar/>
            <ScrollToTop/>
            <Orders/>
          </Route>
          
          {/*Login page */}
          <Route path = "/signin">
           <Navbar/>
           <ScrollToTop/>
           <LoginComponent/>
          </Route>

          {/*payments page */}
          <Route path = "/payments">
           <Navbar/>
           <ScrollToTop/>
           <Elements stripe = {promise}>
              <Payment/>
           </Elements>
           
          </Route>

          {/* HomePage */}
          <Route exact path = "/">
           <Navbar/>
           <ScrollToTop/>
           <div className = "home-page-container">
              {/* HomeImage */}
              <HomeImage/>

              {/* Products */}
              <div className = "products">
              {
                products.map(product => 
                {
                  return <Products product = {product} 
                  key = {product.productId} 
                  productCss = {productCss}
                  productBtnText = {"Add to Basket"}/>
                })
              }
              </div>
            </div> 
         </Route>
         </Switch>
        </Router>
    </div>
  );
}

export default App;
