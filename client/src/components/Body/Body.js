import React,{ useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMusicOne } from '../../Actions/audios-action';
import { getAllUser } from '../../features/users/userSlice';
import { HomeContext, UidContext } from '../../app/AppContext';
import Audiofile from '../AudioFile/AudioFile';
import "./Body.scss";

const Body = () => {
    const { audio,img,audioName,setHomepage}=useContext(HomeContext)
    const { setUpdate,setActiveUpdate }=useContext(UidContext)
    const dispatch=useDispatch();
    const user=useSelector(getAllUser);
    const album=user.album;

    // delete music
    const handleDelete=(item)=>{
        const question=prompt("Are you sur to delete this(yes or no)")
        if(question==="yes"){
            if(audio!==item.audio){
                const id=user._id;
                const data=new FormData();
                data.append("idAudio",item._id);
                dispatch(deleteMusicOne(id,data))
            }else{
                alert("TU ne peut pas supprimer cette music")
            }
        }
    }

    // update music
    const handleUpdate=(item)=>{
        setActiveUpdate(true)
        setUpdate(item);
        setHomepage("update")
    }

    return (
        <div id="body" className="Body">
            <div className="body-content">
                <div className="body-header">
                    <div className="body-mg">
                        <img src={img===null?"./Upload/profils/logo.jpg":img} alt="logo" />
                        <h1>{audioName}</h1>
                    </div>
                </div>
                <div className="body-audio">
                    <div className="playList">
                        {
                            album && (
                                album.map((item,index)=>(
                                    <Audiofile 
                                        key={index} 
                                        item={item} 
                                        handleDelete={handleDelete}
                                        handleUpdate={handleUpdate}
                                        indexOfMusic={index}
                                        />
                            ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;
