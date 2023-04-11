const mongoose=require('mongoose')


const UserSchema=mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    dob:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    initialBal:{type:Number,required:true},
    adhar:{type:Number,required:true},
    pan:{type:String,required:true},
    address:String,
    isActive:Boolean
},{
    versionKey:false
})



const UserModel=mongoose.model("bankuser",UserSchema)


module.exports={
    UserModel
}