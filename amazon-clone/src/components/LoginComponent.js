import React from 'react'
import { Link, useHistory} from 'react-router-dom';
import { useState } from "react";
import { auth } from "../firebase"
import "../css/login.css";
import { useStateValue } from '../StateProvider'
function LoginComponent() 
{
    const [state, dispatch] = useStateValue();

    function onClickingSignIn(e)
    {
        //This line is used to prevent reloding the page
        e.preventDefault();

        auth().signInWithEmailAndPassword(email, password)
        .then(auth => {
            if(auth)
            {
                history.push("/");
                dispatch({
                    type: "SIGN_IN",
                    user: email,
                })
            }
        }).catch(error => alert(error.message))
    }

    function onClickingCreateNewAccount(e)
    {
        //This line is used to prevent reloding the page
        e.preventDefault();

        auth().createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            if(auth)
            {
                //If the authentication succedes then push into history
                history.push("/");
            }
        }).catch(error => alert(error.message))
    }
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    return (
        <div className = "login-container">
            <Link to = "/">
            <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            className = "login-amazon-icon"></img>
            </Link>
            <form className = "login">
                <h1 className = "sign-in-heading">Sign in</h1>

                {/* Email */}
                <label for = "email" className = "label-email">Email: </label>
                <input type = "email" id = "email" className = "text-email"
                value = {email} onChange = {e => setEmail(e.target.value)}></input>

                {/* Password */}
                <label for = "password" className = "label-password">Password: </label>
                <input type = "password" id = "password" className = "text-password"
                value = {password} onChange = {e => setpassword(e.target.value)}></input>

                {/* SignIn button */}
                <button className = "sign-in-btn" onClick = {onClickingSignIn}>Sign In</button>

                {/* Privacy Notice */}
                <small className = "privacy-notice-text">By signing-in you agree to <strong>Amazon's Fake clone</strong> Conditions of Use & Sale. Please see our Privacy Notice, 
                    our Cookies Notice and our Interest-Based Ads Notice.</small>

                {/* Create new account */}
                <button className = "create-new-account-btn" onClick = {onClickingCreateNewAccount}>Create New Account</button>
            </form>
        </div>
    )
}

export default LoginComponent
