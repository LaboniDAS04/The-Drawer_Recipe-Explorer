const Recipe= require('../model/recipe');

const addRecipe=async(req,res,next)=>{
    try{
        const recipe=await Recipe.create(req.body);
        res.status(201).json({
            message:"Recipe added successfully",
            Recipe:recipe
        });
    }
    catch(error){
        next(error);
    }
}
const getRecipes=async(req,res,next)=>{
    try{
        const recipes=await Recipe.find();
        res.status(200).json({
            message:"Recipes fetched successfully",
            Recipe:recipes
        });
    }
    catch(error){
        next(error);
    }
}
const getRecipeByTitle=async(req,res,next)=>{
    try{
        const recipe=await Recipe.findOne({ title: req.params.title });
        if(!recipe){
            return res.status(404).json({
                message:"Recipe not found"
            })
        }
        res.status(200).json({
            message:"Recipe fetched successfully",
            Recipe:recipe
        })
    }
    catch(error){
        next(error);
    }
}
const deleteRecipe=async(req,res,next)=>{
    try{
        const recipe=await Recipe.findOneAndDelete({ title: req.params.title });
        if(!recipe){
            return res.status(404).json({
                message:"Recipe not found"
            })
        }
        res.status(200).json({
            message:"Recipe deleted successfully"
        })
    }
    catch(error){
        next(error);
    }
}
const updateRecipe=async(req,res,next)=>{
    try{
        const recipe=await Recipe.findOneAndUpdate({ title: req.params.title },req.body,{new:true,runValidators:true});
        if(!recipe){
            return res.status(404).json({
                message:"Recipe not found"
            })
        }
        res.status(200).json({
            message:"Recipe updated successfully",
            Recipe:recipe
        })
    }
    catch(error){
        next(error);
    }
}






module.exports={
    addRecipe,
    getRecipes,
    getRecipeByTitle,
    deleteRecipe,
    updateRecipe
}