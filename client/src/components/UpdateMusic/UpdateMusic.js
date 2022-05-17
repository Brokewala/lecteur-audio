import React,{useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateImgMusic, updateNameMusic } from '../../Actions/audios-action';
import { UidContext } from '../../app/AppContext';
import { getAllUser } from '../../features/users/userSlice';
import "./UpdateMusic.scss";


const Updatemusic = (props) => {
    const { update }=useContext(UidContext)
    const [Nom,setNom]=useState(String);
    const [Img,setImg]=useState(null);
    const user=useSelector(getAllUser);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    // useEffecte
    if(update===null){
        window.location="/home";
    }

    // update image
    const handleImg=(e)=>{
        setImg(e.target.files[0])
    }
        
    // update image
    const handleSubmitImg=(e)=>{
        e.preventDefault();

        if(Img===null)
            return alert("All input are required!")

        const data=new FormData();
        data.append("id",update._id)
        data.append("name",update.name)
        data.append("img",Img)
        data.append("audio",update.audio)
        dispatch(updateImgMusic(user._id,data));
        navigate("/home")
    }

    // update nom
    const handleName=(e)=>{
        e.preventDefault();

        if(Nom.length<3)
            return alert("All input are required!");

        const data=new FormData();
        data.append("id",update._id)
        data.append("nom",Nom)
        data.append("img",update.img)
        data.append("audio",update.audio)
        dispatch(updateNameMusic(user._id,data));
        navigate("/home")
    }

    return (
        <div className="Updatemusic">
           <div>
            {
                update!==null &&(
                    <div  className="updateBody">
                        <div className="update-img">
                            <h1>Update image</h1>
                            <form onSubmit={handleSubmitImg}>
                                <input 
                                    type="file"
                                    onChange={handleImg}
                                    accept='image/*'
                                    className="inp imageUpdate"
                                />
                                <br/>
                                <button type="submit">Update</button>
                            </form>
                        </div>
                        <div className="update-NameImg">
                            <h1>Update Name of music</h1>
                            <form onSubmit={handleName}>
                                <input 
                                    type="text"
                                    value={Nom}
                                    placeholder="Enter name of music"
                                    onChange={(e)=>setNom(e.target.value)}
                                    className="inp imageUpdate"
                                />
                                <br/>
                                <button type="submit">Update</button>
                            </form>
                        </div>
                    </div>
                )
            }
           </div>
        </div>
    );
}

export default Updatemusic;
