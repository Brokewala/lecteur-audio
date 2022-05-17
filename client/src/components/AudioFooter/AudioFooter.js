import React, { useContext } from 'react';
import { HomeContext } from '../../app/AppContext';
import "./AudioFooter.scss";

const Audiofooter = ({audio}) => {
    const {handleNext,handlePrev,AudioRef}=useContext(HomeContext)

    return (
        <div className="Audiofooter">
            <div className="play left">
                <button 
                    onClick={handlePrev}
                    className="btn">Prev</button>
                <button className="btn">Aleatoire</button>

            </div>
            <div className="play center">
                    <audio src={audio} ref={AudioRef} autoPlay controls ></audio>
            </div>
            <div className="play right">
                <button className="btn">Reboucle</button>
                <button 
                    onClick={handleNext}
                    className="btn"
                    >Next</button>

            </div>

        </div>
    );
}

export default Audiofooter;
