const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://<user>:<password>@cluster0.eqqo6ry.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>console.log("DB connected..")
)

app.get('/getbrands',async(req,res)=>{
    try{
        return res.json(await BrandName.find());
    }
    catch(err){
        console.log(err.message);
    }
});

app.get('/getbrands/:id',async (req,res)=>{
    try{
        return res.json(await BrandName.findById(req.params.id));
    }
    catch(err){
        console.log(err.message);
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find());
    }
    catch(err){
        console.log(err.message);
    }
})

app.post('/addbrands',async(req,res)=>{
    const {brandname} = req.body;
    try{
        const newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find());
    }
    catch(err){
        console.log(err.message);
    }
})

app.listen(3000,()=>console.log('Server is running..'));