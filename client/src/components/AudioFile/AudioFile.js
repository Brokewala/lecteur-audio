import React, { useContext } from 'react';
import { HomeContext } from '../../app/AppContext';
import "./AudioFile.scss";

const Audiofile = ({item,handleDelete,handleUpdate,indexOfMusic}) => {
    const {handleSearchPlay,setIndexMusic}=useContext(HomeContext)

    return (
        <div className="Audiofile">
            <div 
                className="Audiofile-content1"
                onClick={()=>{
                    handleSearchPlay(item)
                    setIndexMusic(indexOfMusic)
                }}
            >
                <img src={item.img} alt={item.img} />
                <p >{item.name}</p>
            </div>
            <div className="audioAction">
                <button 
                    onClick={()=>handleDelete(item)}
                    className="update">Delete</button>
                <button
                    onClick={()=>handleUpdate(item)}
                     className="update">Update</button>
            </div>
        </div>
    );
}

export default Audiofile;
