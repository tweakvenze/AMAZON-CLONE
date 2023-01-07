import React from 'react'
import "../css/menu.css";
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from "react-router-dom";
import { useStateValue} from "../StateProvider";
import { useLocation } from "react-router-dom";
function Menu(props) 
{
    const { pathname } = useLocation();
    const [state, dispatch] = useStateValue();
    let history = useHistory();
    let userName = state.user;
    let isOpen = props.isOpen;
    let setMenu = props.setMenu;
    let menu_container_classname;
    let signInBtnText;
    let activeMenuItem;

    if(pathname === "/")
    {
        activeMenuItem = "home";
    }
    else if(pathname === "/orders")
    {
        activeMenuItem = "orders";
    }
    else if(pathname === "/payments")
    {
        activeMenuItem = "payments";
    }
    else if(pathname === "/checkout")
    {
        activeMenuItem = "checlou";
    }

    //If the user is signed in then display SignIn else display SignOut
    if(state.user === "Hello Guest")
    {
        signInBtnText = "SignIn";
    }
    else{
        signInBtnText = "SignOut";
    }

    //Determining if we have to show the menu or not
    if(isOpen === true)
    {
        menu_container_classname = "menu-container-active";
    }
    else
    {
        menu_container_classname = "menu-container-inactive";
    }

    return (
        <div className = {menu_container_classname}>
            
            <CloseIcon className = "closing-icon" 
            fontSize = "large"
            onClick = {() => setMenu()}/>

            <div className = "menu-welcome-title">
                <h3>{userName}</h3>
            </div>
            
            <ul className = "menu-link-list-container">
            
                <li className = "list-item" onClick = {() => {
                    setMenu();
                    history.push("/");
                }}>
                    Home    
                </li>
                
                <li className = "list-item" onClick = {() => {
                    setMenu();
                    history.push("/checkout");
                }}>
                    Your Cart ({state.basket.length} items) 
                </li>
                
                <li className = "list-item" onClick = {() => {
                    setMenu();
                    history.push("/signin");
                }}>
                    {signInBtnText}
                </li>

                <li className = "list-item" onClick = {() => {
                    setMenu();
                    history.push("/orders");
                }}>
                    Your Orders
                </li>
            </ul>
        </div>
    )
}

export default Menu
