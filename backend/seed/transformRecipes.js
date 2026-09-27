const mongoose = require("mongoose");
const connectDb = require("../config/db");
const Recipe = require("../model/recipe");

require("dotenv").config();


connectDb().then(async() => {
    const recipes = await mongoose.connection.db
    .collection("recipes")
    .find({})
    .toArray();

console.log("Total recipes:", recipes.length);
const transformedRecipes = recipes.map((oldRecipe) => {
    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = oldRecipe[`strIngredient${i}`];
        const measure = oldRecipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(ingredient.trim());
            measures.push(measure ? measure.trim() : "");
        }
    }

    return {
        title: oldRecipe.strMeal,
        cuisine: oldRecipe.strArea,
        category:oldRecipe.strCategory,
        image: oldRecipe.strMealThumb,
        ingredients: ingredients,
        measures: measures,
        instructions: oldRecipe.strInstructions
    };
});
//await Recipe.deleteMany({});

await Recipe.insertMany(transformedRecipes);

console.log("Recipes migrated successfully");


});