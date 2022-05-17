// error utils
module.exports.errorSignup=async(err)=>{
    const errors={firstName:"" ,lastName:"",email:"",password:""};

    if(err.message.includes("firstName"))
        errors.firstName="Le nom incoreact ou dejat pris";

    if(err.message.includes("lastName"))
        errors.lastName="Le prenom incoreact ou dejat pris";

    if(err.message.includes("email"))
        errors.email="Le email incoreact ou dejat pris";

    if(err.message.includes("password"))
        errors.password="Le password incoreact ou dejat pris";
        

    return errors;
}

// login
module.exports.errorSignin=async(err)=>{
    const errors={email:"",password:""};

    if(erro.message.includes("email"))
        errors.email="Le email incoreact ou dejat pris";

    if(erro.message.includes("password"))
        errors.password="Le password incoreact ou dejat pris";
        

    return errors;
}