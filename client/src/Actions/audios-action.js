import axios from "axios";
import { ajouteMusic, deleteMusic,UPDATEALL } from "../features/users/userSlice";

const instance=axios.create({
    baseURL:"http://localhost:5000/api/users",
    withCredentials:true,
    headers:{ 'Content-Type': `multipart/form-data`}
});

// ajoute music
export const ajouteMusicAction=(data,id)=>{
    return (dispatch)=>{
        return instance.patch(`/addMusic/${id}`,data).then(res=>{
            dispatch(ajouteMusic(res.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}

// delete music
export const deleteMusicOne=(id,data)=>{
    return (dispatch)=>{
        return instance.patch(`/deleteMusic/${id}`,data).then(docs=>{
            dispatch(deleteMusic(docs.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}

// update name of music
export const updateNameMusic=(id,data)=>{
    return(dispatch)=>{
        return instance.put(`/updateName/${id}`,data).then(res=>{
            dispatch(UPDATEALL(res.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}

// update img of music
export const updateImgMusic=(id,data)=>{
    return (dispatch)=>{
        return instance.put(`/updateMusicImg/${id}`,data).then(res=>{
            dispatch(UPDATEALL(res.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}