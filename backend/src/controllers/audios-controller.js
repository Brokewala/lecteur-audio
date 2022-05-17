// user controller
const userModel=require("../models/user-model");
const ObjectId=require("mongoose").Types.ObjectId;

// ajoute image into album
module.exports.ajouteMusic=async(req,res)=>{
    if(req.files===null)
        return res.status(400).send({msg:"no file set"})
        
    const id=req.params.id;
    const trueName=req.body.nom;
    // image variable
    const img=req.files.img;
    const imgName=img.name;
    const imgNameData=new Date().getTime()+imgName;
    const trueImgName=`Upload/images/${imgNameData}`;
    // audio variable
    const audio=req.files.audio;
    const audioName=audio.name;
    const audioNameData=new Date().getTime()+audioName;
    const trueAudioName=`Upload/music/${audioNameData}`;


    await userModel.findByIdAndUpdate(
        {_id:id},
        {
            $addToSet:{
                album:{
                    name:trueName,
                    img:trueImgName,
                    audio:trueAudioName
                }
            }
        },
        {new:true,upsert:true}
    )
    .select("-password")
    .then(docs=>{
        if(docs){
            // ajoute image
            img.mv(`${__dirname}../../../../client/public/Upload/images/${imgNameData}`,(err)=>{
                if(err){
                    console.log(err);
                    return res.status(400).send({msg:"no file set image"})
                }
    
            })
            // ajoute audio
            audio.mv(`${__dirname}../../../../client/public/Upload/music/${audioNameData}`,(err)=>{
                if(err){
                    console.log(err);
                    return res.status(400).send({msg:"no file set audio"})
                }

            })
        }
        // envoi data
        res.status(201).json(docs);
        
    }).catch(err=>{
        res.status(200).json(err);
    })

      
}

// delete audio
module.exports.deleteMusic=async (req,res)=>{

    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : '+ req.params.id);

    const idUnique=req.params.id;
    const idAudio=req.body.idAudio;

    await userModel.findByIdAndUpdate(idUnique,
        {
            $pull:{
                album:{_id:idAudio}
            }
        },{new:true,upsert:true},
        )
        .select("-password")
        .then(docs=>{
            res.status(201).json(docs);
        }).catch(err=>{
            res.status(200).json({msg:"Not found ID!"})
        })
}

// update audio nom
module.exports.updateMusicName=async(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : '+ req.params.id);

    const id=req.params.id;
    const idAudio=req.body.id;
    const nom=req.body.nom;
    const img=req.body.img;
    const audio=req.body.audio;

    await userModel.findByIdAndUpdate(
        {_id:id},
        {
            $set:{
                album:{
                    _id:idAudio,
                    name:nom,
                    img:img,
                    audio:audio
                }
            }
        },
        {new:true,upsert:true}
    ).then(docs=>{
        res.status(201).json(docs)
    }).catch(err=>{
        console.log(err);
    })

}

// update audio image
module.exports.updateMusicImg=async(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : '+ req.params.id);

    const id=req.params.id;
    const idAudio=req.body.id;
    const nom=req.body.name;
    const audio=req.body.audio;
    // files
    const file=req.files.img
    const FileName=new Date().getTime()+file.name;
    const dataImg=`Upload/images/${FileName}`;

    await userModel.findByIdAndUpdate(
        {_id:id},
        {
            $set:{
                album:{
                    _id:idAudio,
                    name:nom,
                    img:dataImg,
                    audio:audio
                }
            }
        },
        {new:true,upsert:true}
    ).then(docs=>{
       if (docs) {
            file.mv(`${__dirname}../../../../client/public/Upload/images/${FileName}`,(err)=>{
                if(err){
                    res.statics(400).send(err)
                }
                res.status(200).json(docs);
            })
       }
    }).catch(err=>{
        console.log(err);
    })

}