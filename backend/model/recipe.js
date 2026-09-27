const mongoose=require('mongoose');
const recipeSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    cuisine:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true
    },
    ingredients:{
        type: [String],
        required:true
    },
    measures:{
        type: [String],
        required:true
    },
    instructions:{
        type:String,
        required:true
    }
})



const Recipe=mongoose.model("Recipe",recipeSchema);
module.exports=Recipe