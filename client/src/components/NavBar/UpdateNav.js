import React from 'react';
import Navigates from './Navigates';
import "./UpdateNav.scss";

const Updatenav = () => {
    return (
        <div className="Updatenav" id="nav">
            <div className="NavBar-header">
                <h1>Broke Music</h1>
            </div>
            <Navigates/>
            <hr/>
        </div>
    );
}

export default Updatenav;
