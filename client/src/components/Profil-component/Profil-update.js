import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../../Actions/user-action';
import { getAllUser } from '../../features/users/userSlice';


const ProfilUpdate = ({handleUpdate}) => {
    const [firstName,setFirstName]=useState(String);
    const [lastName,setLastName]=useState(String);
    const [email,setEmail]=useState('');
    const dispatch=useDispatch();
    const user=useSelector(getAllUser);


    const handleSubmit=(e)=>{
        e.preventDefault();

        const error=document.querySelector("#error");

        if(firstName.length<3)
            return error.innerHTML="The Name must be required!";

        if(lastName.length<3)
            return error.innerHTML="The LastName must be required!";
        
        if(email.length<=9)
            return error.innerHTML="The Email must be required!";
            
        const data={
           firstName:firstName,
           lastName:lastName,
           email:email,
        }
        const res=dispatch(updateUserAction(data,user._id));
        res.then(docs=>{
            console.log(docs.message);
           if(docs.message===undefined){
                error.innerHTML="successFull";
                handleUpdate()
           }else{
                error.innerHTML=docs.message;
           }
        })

    }

    return (
        <div className="ProfilUpdate">
            <div id="error">Update propos</div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    placeholder='Entre votre nom'
                    required
                     />
                <br/>
                <input 
                    type="text"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    placeholder='Entre votre prenom'
                    required
                     />
                <br/>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Entre votre email'
                    required
                />
                <br/>

                <div className="btn-update">
                    <button 
                        type='submit' 
                        className=" btn valide">valide</button>
                    <button 
                        type='button'
                        onClick={handleUpdate}
                        className="btn cancel">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ProfilUpdate;
