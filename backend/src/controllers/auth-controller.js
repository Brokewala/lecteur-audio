const userModel=require("../models/user-model");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const { errorSignup , errorSignin } =require("../utils/user-erros");

// token
const maxAge=3*24*60*60*1000;//durre du cookier

// creation de token
const createToken=(id)=>{//creation de token
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3d'});
}

// refresh token
module.exports.refreshToken= async (req,res)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];//Bearer token
    if(!token){
        res.sendStatus(401);
    }
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
           res.sendStatus(401);
        }
        // check en BDD que le user a toujour les droit et qu 'il exit toujour
        delete user.iat;
        delete user.exp;

        const refreshhedToken=createToken(user);
        res.send({
            accessToken:refreshhedToken
        })
    })
}

// login
module.exports.signIn=async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    userModel.findOne({email:email})
        .then((docs)=>{
            const hash_password=docs.password;
            const resultat=bcrypt.compareSync(password,hash_password);
            if(resultat){
                const token=createToken(docs._id)
                res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge})
            
                res.status(201).json({
                    id:docs._id,
                    token:token
                });
            }else{
                res.status(401).json({error:"Password n'est pas valide"});
            }

        })
        .catch(err=>{
            console.log(err);
            res.status(401).json({error:"email n'est pas trouver !"});
        })

}

// s'incrire
module.exports.signUp=async (req,res)=>{
    const {firstName ,lastName,email ,password}=req.body;
    
    const newUserModel=new userModel({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    });


    newUserModel.save()
        .then((user)=>{
            res.status(201).json({message:"successFull!"});
        })
        .catch(err=>{
            const errors=errorSignup(err);
            res.status(200).send({errorSignup});
        })

}

// logout
module.exports.logOut=async (req,res)=>{}