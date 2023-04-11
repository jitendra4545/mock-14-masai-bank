const mongoose=require(`mongoose`)



const LoginSchema=mongoose.Schema({
    email:String,
    password:String
},{
    versionKey:false
}
)


const LoginModel=mongoose.model("kanbanuser",LoginSchema)


module.exports={
    LoginModel
}