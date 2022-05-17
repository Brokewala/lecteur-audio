import React from 'react';
import "./Navigates.scss"

const Navigates = ({ChangePage}) => {
    return (
        <div className="Navigation">
            <p onClick={()=>ChangePage("body")}  className="Link">Home Music</p>
            <p onClick={()=>ChangePage("profil")} className="Link">Profil Music</p>
            <p onClick={()=>ChangePage("ajoute")} className="Link">Ajoute Music</p>
        </div>
    );
}

export default Navigates;
