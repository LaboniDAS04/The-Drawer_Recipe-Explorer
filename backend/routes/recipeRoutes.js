const express=require('express');
const router=express.Router();
const {
    addRecipe,
    getRecipes,
    getRecipeByTitle,
    deleteRecipe,
    updateRecipe
}=require('../controller/recipeController');
const authenticate=require('../middleware/authMiddleware');
const authorize=require('../middleware/roleMiddleware');
const validateRecipe=require('../middleware/recipeValidation');

router.get('/',getRecipes);
router.get('/:title',authenticate,authorize("viewer","admin"),getRecipeByTitle);
router.post('/',authenticate,authorize("admin"),validateRecipe,addRecipe);
router.delete('/:title',authenticate,authorize("admin"),deleteRecipe);
router.put('/:title',authenticate,authorize("admin"),validateRecipe,updateRecipe);
router.patch('/:title',authenticate,authorize("admin"),validateRecipe,updateRecipe);



module.exports=router;