const mongoose=require("mongoose");
const {isEmail} =require("validator");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20,
        unique:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20,
        unique:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"

    },
    email:{
        type:String,
        required:true,
        validate:[isEmail],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:3
    },
    profilPicture:{type:String},
    album:{
        type:[
            {
                name:{
                    type:String,
                    min:3,
                },
                img:{
                    type:String,
                    min:3,
                    trim:true,
                },
                audio:{
                    type:String,
                    min:3,
                    trim:true,
                }
            }
        ]
    }
},{
    timestamps:true
}
);


userSchema.pre("save",async function(next){
    const hash=await bcrypt.hashSync(this.password,10);
    this.password=hash;
    next();

});

userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email});
    if(user){
        const auth=await bcrypt.compareSync(password,user.password);
        if(auth){
            return user;
        }
        throw Error("incorect password")
    }
    throw Error("incorect email")
}


module.exports=mongoose.model("User",userSchema);