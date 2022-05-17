import React ,{useState} from 'react';
import Signin from '../SignIn/SignIn';
import Signup from '../SignUp/SignUp';
import "./Auth.scss";


const Auth = () => {
    const [isActive,setIsActtive]=useState(true);

    const handleActive=(auth)=>{
        if (auth==="signin")
            return setIsActtive(true)
        if (auth==="signup")
            return setIsActtive(false)
    }

    return (
        <div className="Auth">
            <div className="Auth-container">
                <div className="Auth-btn">
                    <button 
                        onClick={()=>handleActive("signin")} 
                        className={ isActive ?" isActive btn-login":"notActive btn-login"}
                        >Sign in</button>
                    <br/>
                    <button  
                        onClick={()=>handleActive("signup")}
                        className={!isActive ?"isActive btn-sigUp":"notActive btn-sigUp"}>Sign up </button>
                </div>
                <div className="Auth-content">
                    {isActive && <Signin />}
                    {!isActive && <Signup setIsActtive={setIsActtive} />}
                </div>
                <div className="Auth-logo">
                    <h1>Album Photos</h1>
                </div>
            </div>

        </div>
    );
}

export default Auth;
