import React ,{ useState } from 'react';
import "./SignIn.scss";
import { loginAction } from '../../Actions/user-action';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Signin = () => {
    const [email ,setEmail]=useState(String);
    const [password,setPassord]=useState(String);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault()

        const error=document.querySelector("#error");
        error.innerHTML="";

        if(email.length<=0){
            error.className="error";
            return error.innerHTML="All input are required!"
        }
        
        if(password.length<=0){
            error.className="error";
            return error.innerHTML="All input are required!"
        }

        const data={
            email:email,
            password:password
        }
        const loginA=loginAction(data);
        if(loginA){
            navigate("/home")
        }

    }
    return (
        <div className="Signin">
            <div className="Signin-content">
                <h1>Connexion</h1>
                <div id='error'>
                    WELCOME
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="email-content">
                        <input 
                            type="email"
                            className='email'
                            placeholder='Entre votre email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                             />
                    </div>
                    <div className="password-content">
                        <input 
                            type="password"
                            onChange={(e)=>setPassord(e.target.value)}
                            placeholder="Entre votre mot de passe"
                            value={password}
                            className='password'
                            required
                             />
                    </div>
                    <button type='submit' className="btn btn-SignIn">Connexion</button>
                </form>
            </div>
        </div>
    );
}

export default Signin;
