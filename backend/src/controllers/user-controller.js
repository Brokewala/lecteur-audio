// user controller
const userModel=require("../models/user-model");

// get only user
module.exports.onlyUser=async (req,res)=>{
    const id=req.params.id;
    await userModel.findById({_id:id})
        .select("-password")
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            res.status(200).send({message:"vous n'est pas utilisateur de cette compte!"})
        })
   
}

// get only user
module.exports.allUser= async (req,res)=>{
    await userModel.find()
        .select("-password")
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            res.status(200).send({message:"il ny a pas de utilisateur!"})
        })
}

// delete only user
module.exports.deleteUser= async (req,res)=>{
    const id=req.params.id;
    await userModel.findByIdAndDelete({_id:id})
        .select("-password")
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            res.status(200).send({message:"il ny a pas de utilisateur!"})
        })
}

// update only user
module.exports.updateUser= async (req,res)=>{
    const id=req.params.id;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;

    const userExist=await userModel.findOne({email:req.body.email});
    if(userExist){

        if(firstName===userExist.firstName)
            return res.status(200).send({message:"nom already existe!"});

        if(lastName===userExist.lastName)
            return res.status(200).send({message:"prenom already existe!"});

        if(email===userExist.email)
            return res.status(200).send({message:"email already existe!"})
    }else{
        await userModel.findByIdAndUpdate(
            {_id:id},
            {
                $set:{
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email
                }
            },
            {new:true,upsert:true,setDefaultsOnInsert:true}
            )
            .select("-password")
            .then(docs=>{
                return res.status(201).json(docs)
            })
            .catch(err=>{
                return res.status(200).json(err)
            })
    }


}

// update img
module.exports.updateImg=async (req,res)=>{
    
    if(req.files===null)
         res.status(400).json({msg:"no file upload"});
    
    const id=req.params.id;
    const file=req.files.img;
    const fileName=file.name;
    const imgName=new Date().getTime()+fileName;
    
    await file.mv(`${__dirname}../../../../client/public/Upload/profils/${imgName}`,(error)=>{
        if(error){
            console.log(error);
            res.status(400).json({msg:"no file upload"});
        }
        
        const profilPicture=`Upload/profils/${imgName}`;
        userModel.findByIdAndUpdate(
            {_id:id},
            {
                $set:{
                    profilPicture:profilPicture
                }
            },
            {new:true,upsert:true,setDefaultsOnInsert:true}
            )
            .select("-password")
            .then(docs=>{
                res.status(201).json(docs);
               
            }).catch(err=>{
                res.status(200).json(err);
            })

    })
        

}

