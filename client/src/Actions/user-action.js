import reactCookies from "react-cookies";
import axios from "axios";
import { addUser ,updatePropos , updateImg} from "../features/users/userSlice";


let refreshToken;
const maxAgeAuth=3*24*60*60*1000;
const instance=axios.create({
    baseURL:"http://localhost:5000/api/users",
    withCredentials:true,
});

// login
export const loginAction=async (data)=>{
    instance.post("/login",data)
        .then(res=>{
            const token=res.data.token;
            refreshToken=token;
            instance.defaults.headers.common['authorization']=`Bearer ${token}`;
            reactCookies.save("jwt",token,{maxAge:maxAgeAuth});

        })
        .catch(err=>{
            console.log(err);
        })
}

// interceptor
instance.interceptors.response.use(res=>{
    return res;
},async function(err){
    const originalRequest=err.config
    if(err.config.url !=="/refreshToken" && err.response.status ===401){
        if(refreshToken && refreshToken !==""){
            instance.defaults.headers.common['authorization']=`Bearer {refreshToken}`;
            await instance.post("/refreshToken").then(res=>{
                instance.defaults.headers.common['authorization']=`Bearer {res.data.accessToken}`;
                originalRequest.headers['authorization']=`Bearer ${res.data.accessToken }`;
            }).catch(error=>{
                refreshToken=null;
            });
            return instance(originalRequest)
        }
    }
    
});

// get only user
export const getUser=(uid)=>{
    return (dispatch)=>{
        return instance.get(`/${uid}`).then(res=>{
            dispatch(addUser(res.data));
        }).catch(err=>{
            console.log("il ny a pas id");
        })
    }
}

// signup user 
export const signupAction=async(data)=>{
    await instance.post("/signup",data)
        .then(res=>{
            return res.data.message;
        })
        .catch(err=>{
            console.log(err);
        })
}

// update user propos
export const updateUserAction=(data,id)=>{
   return (dispatch)=>{
       return instance.put(`/propos/${id}`,data).then(res=>{
           if(res.data.message){
               return res.data;
           }else{
               dispatch(updatePropos(res.data));
               const message="successFull";
               return message;
           }
       }).catch(err=>{
           console.log(err);
       })
   }
}

// update user img

export const updateImgAction=(data,id)=>{
    return (dispatch)=>{
        return instance.put(`/img/${id}`,data).then(res=>{
            dispatch(updateImg(res.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}
