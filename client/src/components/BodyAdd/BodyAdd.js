import React,{ useState } from 'react';
import "./BodyAdd.scss";
import {useDispatch ,useSelector} from "react-redux";
import { getAllUser } from '../../features/users/userSlice';
import { ajouteMusicAction } from '../../Actions/audios-action';
import { useNavigate } from 'react-router-dom';

const Bodyadd = () => {
    const [fileName ,setFileName]=useState(String);
    const [file ,setFile]=useState(null);
    const [img ,setImg]=useState(null);
    const [error ,setError]=useState("WELCOME");
    const navigate=useNavigate();

    const user=useSelector(getAllUser);
    const dispatch=useDispatch();

    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }

    const handleImg=(e)=>{
        setImg(e.target.files[0]);
    }

    const handleSubmit=(e)=>{ 
        e.preventDefault()

        if(fileName.length<=3)
            return setError("All input are required");
        if(img===null)
            return setError("All input are required");
        if(file===null)
            return setError("All input are required");
            
        const data=new FormData();
        data.append("nom",fileName);
        data.append("img",img);
        data.append("audio",file);
        dispatch(ajouteMusicAction(data,user._id))
        navigate("/home");
      
    }

    return (
        <div className="Bodyadd">
            <div id="body" className="BodyAdd-body">
                <h1>Ajoute une image</h1>
                <form encType='multipart/form-data' onSubmit={handleSubmit} >
                    <input type="text" value={error} className="error" disabled/><br/>
                    <label>Enter name of music</label>
                    <br/>
                    <input 
                        type="text"
                        value={fileName}
                        name="nom"
                        onChange={(e)=>setFileName(e.target.value)}
                        placeholder='Nom audio'
                        />
                    <br/>
                    <label>Enter image of music</label>
                    <br/>
                    <input 
                        type="file"
                        name="img"
                        onChange={handleImg}
                        placeholder='Image upload'
                        accept="image/*"
                        />
                    <br/>
                    <label>Enter music file</label>
                    <br/>
                    <input 
                        type="file"
                        onChange={handleFile}
                        name="file"
                        className="file"
                        placeholder='Music upload'
                        accept="audio/*"
                        />
                    <br/>
                    <input type="submit" value="Valide" className="btnSubmit"/>
                </form>
            </div>
        </div>
    );
}

export default Bodyadd;
