import React from 'react'
import "../css/navbar.css";
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import {auth} from "../firebase";
import { useState } from "react";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";

function NavbarComponent(props) 
{
    const [state, dispatch] = useStateValue();
    const[isOpen, setMenu] = useState(false);//For Hamburger icon
    let signInBtnText;
    let history = useHistory();

    function handleAuthentication()
    {
        //If the user is logged in then
        if(!(state.user === "Hello Guest"))
        {
            dispatch({
                type: "EMPTY_BASKET"
            })
            history.replace("/")
            auth().signOut();//Here we sign out
        }
    }

    function onSearch()
    {
        dispatch({
            type: "SET_POP_UP",
        })
    }
    
    //If the user is signed in then display SignIn else display SignOut
    if(state.user === "Hello Guest")
    {
        signInBtnText = "SignIn";
    }
    else{
        signInBtnText = "SignOut";
    }

    return (
        <>
            <div className = "navbar">
            {/* Menu icon */}
            <MenuIcon className = "navbar-menu-icon" 
            onClick = {() => setMenu(!isOpen)}
            fontSize = "large"/>


            <Link to = "/">
            {/* Amazon icon */}
            <img src = "http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            className = "navbar-amazon-icon"/>
            </Link>

            
            {/* Search Bar Input */}     
            <input type = "text" className = "navbar-input" placeholder = "Enter the text"></input>

            <button onClick = {onSearch}>
            {/* Search Bar Icon */}
            <SearchIcon className = "navbar-search-icon"/>
            </button>
            
           
            {/* option-1 */}
            {/* if user is not logged in go to sign in page else
            just log out */}
            <Link to = {!(state.user != "Hello Guest") && "/signin"} className = "link">
            <div onClick = {handleAuthentication} className = "navbar-option">
                <p className = "navbar-option-line-one"><small>{state.user}</small></p>
                <p className = "navbar-option-line-two">{signInBtnText}</p>
            </div>
            </Link>

            {/* option-2 */}
            <Link to = "/orders">
            <div className = "navbar-option">
                <button>
                <p className = "navbar-option-line-one">Returns</p>
                <p className = "navbar-option-line-two">&Orders</p>
                </button>
            </div>
            </Link>

            {/* option-3 */}
            <div className = "navbar-option">
                <button>
                <p className = "navbar-option-line-one">Your</p>
                <p className = "navbar-option-line-two">Prime</p>
                </button>
            </div>

            <Link to = "/checkout" className = "link">
            {/* option-4 */}
            <div className = "navbar-option">
                <p className = "options-shopping-cart-quantity">{state.basket?.length}</p>
                <ShoppingCartIcon className = "options-shopping-cart-icon"/>
            </div>   
            </Link>
            </div>

            <Menu isOpen = {isOpen} setMenu = {() => setMenu(!isOpen)}/>
        </>         
    )
}

export default NavbarComponent
