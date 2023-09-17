import React, {useState} from "react";
import './Result.css'
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.css'
import { useLocation } from "react-router-dom";

function Result() {
    const { state } = useLocation();
    const { filename, result } = state;
    const im = 'static/uploads/' + filename 
    return (
        <div className="Result">
            <h2>Result: {result} </h2>
            <img src={im} width='700px' id="image"></img>
            <h5>{filename}</h5>
        </div>
    );
}

export default Result