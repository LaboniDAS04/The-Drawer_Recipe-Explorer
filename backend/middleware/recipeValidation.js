const validateRecipe = (req, res, next) => {
  const {
    title,
    cuisine,
    category,
    image,
    ingredients,
    measures,
    instructions
  } = req.body;

  // Title
  if (!title || !title.trim()) {
    const error = new Error("Recipe title is required");
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  // Cuisine
  if (!cuisine || !cuisine.trim()) {
    const error = new Error("Cuisine is required");
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  // Category
  if (!category || !category.trim()) {
    const error = new Error("Category is required");
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  // Image
  if (!image || !image.trim()) {
    const error = new Error("Recipe image is required");
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  // Ingredients
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    const error = new Error("At least one ingredient is required");
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  // Measures
  if (!Array.isArray(measures) || measures.length === 0) {
    const error = new Error("At least one measurement is required");
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  // Ingredients and measures should match
  if (ingredients.length !== measures.length) {
    const error = new Error(
      "Ingredients and measurements must have the same number of items"
    );
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  // Instructions
  if (!instructions || !instructions.trim()) {
    const error = new Error("Recipe instructions are required");
    error.statusCode = 400;
    error.errorCode = "VALIDATION_ERROR";
    return next(error);
  }

  next();
};

module.exports = validateRecipe;