import React,{useState} from 'react';
import { signupAction } from '../../Actions/user-action';
import "./SignUp.scss"

const Signup = (props) => {
    const [nom, setNom]=useState(String);
    const [prenom, setPrenom]=useState(String);
    const [email, setEmail]=useState(String);
    const [password, setPassword]=useState(String);
    
    const handleSubmit=(e)=>{
        e.preventDefault();

        const error=document.querySelector("#error");
        error.innerHTML="";

        if(nom.length===0 || nom.length<3 )
            return error.innerHTML="Le nom doit etre 03 caracter minimum !";

        if(prenom.length===0 || prenom.length<3 )
            return error.innerHTML="Le prenom doit etre 03 caracter minimum !";

        if(email.length===0 || email.length<3 )
            return error.innerHTML="All input are required !";

        if(password.length===0 || password.length<3 )
            return error.innerHTML="Le password doit etre 03 caracter minimum !";


        const data=new FormData();
        data.append("firstName",nom);
        data.append("lastName",prenom);
        data.append("email",email);
        data.append("password",password);
        const signu=signupAction(data)   ;
        if(signu){
            error.innerHTML=signu;
            props.setIsActtive(true)
        }
        
    }

    return (
        <div className="Signup">
            <div className='Signup-content'>
                <h1>S inscrire</h1>
                <div id='error' className="error" >
                    WELCOME
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input 
                        type="text"
                        placeholder='Entre votre nom'
                        value={nom}
                        onChange={(e)=>setNom(e.target.value)}
                        required
                    />
                    <br/>
                    <input 
                        type="text"  
                        placeholder='prenom' 
                        value={prenom}
                        onChange={(e)=>setPrenom(e.target.value)}
                        required
                    />
                    <br/>
                    <input 
                        type="email"  
                        placeholder='Email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                    <br/>
                    <input 
                        type="password"  
                        placeholder='password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                    <br/>
                    <button type='submit' className="btn-SignUp">SignUp</button>
                </form>
            </div>
            <div></div>
        </div>
    );
}

export default Signup;
