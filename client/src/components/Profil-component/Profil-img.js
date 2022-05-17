import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImgAction } from '../../Actions/user-action';
import { getAllUser } from '../../features/users/userSlice';


const ProfilImg = () => {
    const [active,setActive]=useState(true);
    const [file,setFile]=useState(null);
    const user=useSelector(getAllUser);
    const profilPicture=user.profilPicture;
    const dispatch=useDispatch();

    const handleActive=()=>{
        setActive(!active)
    }

    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(file===null)
            return alert("You have to required this input");
        
        const data=new FormData();
        data.append("img",file);
        dispatch(updateImgAction(data,user._id))
        handleActive();
    }


    return (
        <div className="ProfilImg">
            <div className="img-content">
                <img 
                    src={profilPicture===undefined?"./Upload/profils/logo.png.ico":profilPicture} 
                    alt="profil" 
                    />
            </div>
            {active &&  <button onClick={handleActive} className="btn update">Update</button>}
            {
                !active && (
                    <div className="update-img">
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="file" 
                                name="file" 
                                className="file"
                                onChange={handleFile}
                                accept='image/*' 
                            />
                            <div className="btn-updates">
                                <button type="submit" className="btn valide">valide</button>
                                <button type='button' onClick={handleActive} className="btn cancel">cancel</button>
                            </div>
                        </form>
                </div>
                )
            }
                

        </div>
    );
}

export default ProfilImg;
