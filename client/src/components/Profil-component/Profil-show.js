import React from 'react';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../features/users/userSlice';

const ProfilShow = ({handleUpdate}) => {
    const user=useSelector(getAllUser);
    return (
        <div className="profil-propos">
            <h1>Propos</h1>
            <div className="pro">{user.firstName}</div>
            <div className="pro">{user.lastName}</div>
            <div className="pro">{user.email}</div>
            <button 
                onClick={handleUpdate}
                className="btn update">Update</button>
        </div>
    );
}

export default ProfilShow;
