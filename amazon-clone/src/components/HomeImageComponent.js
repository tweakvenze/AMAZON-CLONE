import React from 'react'
import "../css/homeimage.css";
import {useEffect} from "react";
function HomeImageComponent()
{
    
    return (
        <div className = "home-image-container">
            <img src = "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            className = "home-image">
            </img>
        </div>
    )
}

export default HomeImageComponent
