const express = require('express')
const { connection } = require('./config/db')
const { UserModel } = require('./model/UserModel')
const app = express()
var jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
const cors=require('cors')
const { LoginModel } = require('./model/LoginModel')
require('dotenv')
app.use(express.json())
app.use(cors())
app.get(`/`, (req, res) => {
    console.log('welcome')
})

app.post("/openaccount", async (req, res) => {
    let data = req.body
    console.log(data)
    try {
        let olddata = await UserModel.find()
        let filt = olddata.filter((el) => el.email == data.email && el.pan == data.pan)
        console.log(filt)
        if (filt.length > 0) {
            res.send('user already exist')
        } else {
            let newAdd = new UserModel(data)
            await newAdd.save()
            res.send(newAdd)
        }


    } catch (err) {
        res.send("issue with you process you cant register")
    }
})

app.patch("/updatekyc/:id", async (req, res) => {
    let id = req.params.id
    let data = req.body
    console.log(id, data)
    try {
        let updateData = await UserModel.updateOne({ _id: id }, { $set: data })
        res.send(updateData)
    } catch (err) {
        res.send(err)
    }
})

// app.patch("/updatediposite/:id", async (req, res) => {
//     let id = req.params.id
//     let {amount}= req.body
//     console.log(id, data)
//     try {
//         let updateData = await UserModel.updateOne({ _id: id }, { $set:{initialBal:amount} })
//         res.send(updateData)
//     } catch (err) {

//     }
// })




app.post(`/signup`,async(req,res)=>{
   const {email,password}=req.body
   
    try{

        bcrypt.hash(password, 8,async function(err, hash) {
            if(hash){
                let newAdd=new LoginModel({email,password:hash})
                await newAdd.save()
                res.send(newAdd)
            }else{
                console.log('issue with your code')
            }
            // Store hash in your password DB.
        });
        

       //let newAdd=new LoginModel(data)
    }catch(err){
        console.log(err)
    }
})



app.post(`/login`,async(req,res)=>{
    let {email,password}=req.body

    try{
        let allData=await LoginModel.findOne({email})
        console.log(allData)
        //let findData=allData.filter((el)=>el.email==email )
        if(allData){
            bcrypt.compare(password, allData.password, function(err, result) {
         if(err){
            res.send('unable to generate token')
         }else{
            let token = jwt.sign({ foo: 'bar' }, 'jitendra');
            res.send(token)
            localStorage.setItem("token",(token))
         }
            });
        }else{
            res.send(`user data not found`)
        }
        

        
       res.send(findData)
    }catch(err){
        console.log(err)
    }
})


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('db connected successfully')
    } catch (err) {
        console.log('failed')
    }
    console.log(`server running on port ${process.env.port}`)
})