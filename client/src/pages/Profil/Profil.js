import React,{useState} from 'react';
import ProfilImg from '../../components/Profil-component/Profil-img';
import ProfilShow from '../../components/Profil-component/Profil-show';
import ProfilUpdate from '../../components/Profil-component/Profil-update';
import "./Profil.scss";

const Profil = () => {
    const [isUpdate,setIsUpdate]=useState(true);

    const handleUpdate=()=>{
        setIsUpdate(!isUpdate)
    }

    return (
        <div className="Profil">
            <div id="body" className="Profil-body">
                <ProfilImg/>
                {isUpdate && <ProfilShow handleUpdate={handleUpdate} />}
                {!isUpdate && <ProfilUpdate handleUpdate={handleUpdate} />}
            </div>
        </div>
    );
}

export default Profil;
