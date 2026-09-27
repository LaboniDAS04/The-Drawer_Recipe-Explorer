/*const recipes = [
  {
    id: 1,
    title: "Brown Butter Miso Pasta",
    cuisine: "Japanese-Italian",
    time: "20 min",
  },

  {
    id: 2,
    title: "Charred Corn & Black Bean Tacos",
    cuisine: "Mexican",
    time: "25 min",
  },

  {
    id: 3,
    title: "Coconut Lentil Dal",
    cuisine: "Indian",
    time: "35 min",
  },
];
*/
const API_PORT = "http://localhost:3000";
let recipes = [];
async function loadRecipes() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_PORT}/api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    recipes = data.Recipe;

    renderRecipes(recipes);
    renderFilterChips();

    console.log(recipes);
  } catch (error) {
    console.error("Error loading recipes:", error);
  }
}
const authCard = document.querySelector("#authCard");
const credentials = document.querySelectorAll(".credentials");
const wrap = document.querySelector(".wrap");

window.addEventListener("DOMContentLoaded", () => {
  loadRecipes();
  credentials.forEach((element) => (element.style.display = "none"));
  setTimeout(function () {
    authCard.style.display = "block";
    authCard.style.opacity = "1";
    wrap.style.pointerEvents = "none";
    wrap.style.opacity = "0.5";
  }, 2000);
});

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitBtn = document.querySelector("#submitBtn");
const tabSignin = document.querySelector("#tabSignin");
const tabSignup = document.querySelector("#tabSignup");
const switchToSignup = document.querySelector("#switchToSignup");
const signupElements = document.querySelectorAll("#tabSignup,#switchToSignup");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const fieldError = document.querySelectorAll(".field-error");
const userIcon = document.querySelector("#userIcon");
const createAccount = document.querySelector("#createAccount");
const signIn = document.querySelector("#signIn");
const logOut = document.querySelector("#logOut");
const addRecipe =document.querySelector(".addRecipe");


let authMode = "signin";

function create_Account(element) {
  authMode = "signup";
  tabSignin.classList.remove("active");
  element.classList.add("active");

  cardTitle.textContent = "Create your account";
  cardSub.textContent =
    "Create an account to pick up where your drawer left off.";

  submitBtn.textContent = "Create account";

  authCard.classList.add("mode-signup");
}

function sign_In() {
  authMode = "signin";
  tabSignup.classList.remove("active");
  switchToSignup.classList.remove("active");
  tabSignin.classList.add("active");
  cardTitle.textContent = "Welcome back";
  cardSub.textContent = "Sign in to pick up where your drawer left off.";

  submitBtn.textContent = "Sign in";
  authCard.classList.remove("mode-signup");
}

signupElements.forEach((element) => {
  element.addEventListener("click", () => {
    create_Account(element);
  });
});

tabSignin.addEventListener("click", () => {
  sign_In();
});

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  fieldError.forEach((element) =>
    element.parentElement.classList.remove("has-error"),
  );

  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (authMode === "signup") {
    console.log("Signup data:");
    console.log("Name:", nameValue);
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    const response = await fetch(`${API_PORT}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.field === "email") {
        emailError.textContent = data.message;
        emailError.parentElement.classList.add("has-error");
      }
      if (data.field === "name") {
        nameError.textContent = data.message;
        nameError.parentElement.classList.add("has-error");
      }
      if (data.field === "password") {
        passwordError.textContent = data.message;
        passwordError.parentElement.classList.add("has-error");
      }
    }
  }
  if (authMode === "signin") {
    console.log("Signin data:");
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    const response = await fetch(`${API_PORT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.field === "email") {
        emailError.textContent = data.message;
        emailError.parentElement.classList.add("has-error");
      }
      if (data.field === "password") {
        passwordError.textContent = data.message;
        passwordError.parentElement.classList.add("has-error");
      }
      if (data.field.length === 2) {
        passwordError.textContent = data.message;
        passwordError.parentElement.classList.add("has-error");
      }
    }
    if (response.ok) {
      localStorage.setItem("token", data.token);
      authCard.style.display = "none";
      authCard.style.opacity = "0";
      wrap.style.pointerEvents = "auto";
      wrap.style.opacity = "1";
      credentials.forEach(e=>e.style.display="none");

      userIcon.style.display = "block";
      logOut.style.display = "block";

      if(data.role=="admin"){
        addRecipe.style.display="block";
      }
    }

    console.log(response.status);
    console.log(data);
  }
});

const controls = document.querySelector(".controls");
logOut.addEventListener("click", () => {
  localStorage.removeItem("token");
  addRecipe.style.display="none";
  credentials.forEach((e) => (e.style.display = "none"));
  createAccount.style.display = "block";
  signIn.style.display = "block";
  grid.style.pointerEvents = "none";
  grid.style.opacity = "0.5";
  controls.style.pointerEvents = "none";
  controls.style.opacity = "0.5";
});

createAccount.addEventListener("click", () => {
  create_Account(tabSignup);
  authCard.style.display = "block";
  authCard.style.opacity = "1";
  wrap.style.pointerEvents = "none";
  wrap.style.opacity = "0.5";
  grid.style.pointerEvents = "auto";
  grid.style.opacity = "1";
  controls.style.pointerEvents = "auto";
  controls.style.opacity = "1";
});

signIn.addEventListener("click", () => {
  sign_In();
  authCard.style.display = "block";
  authCard.style.opacity = "1";
  wrap.style.pointerEvents = "none";
  wrap.style.opacity = "0.5";
  grid.style.pointerEvents = "auto";
  grid.style.opacity = "1";
  controls.style.pointerEvents = "auto";
  controls.style.opacity = "1";
});

searchInput.addEventListener("input", function (event) {
  console.log(searchRecipes(event.target.value));
  renderRecipes(searchRecipes(event.target.value));
});
let selectedFilter = "All";
const searchRecipes = (searchTerm) => {
  const cleanedTerm = searchTerm.trim().toLowerCase();
  let filteredRecipes;
  if (selectedFilter === "All") {
    filteredRecipes = recipes;
  } else {
    filteredRecipes = recipes.filter(
      (recipe) => recipe.cuisine === selectedFilter,
    );
  }
  return filteredRecipes.filter((recipe) =>
    Object.values(recipe).some((value) =>
      String(value).toLowerCase().includes(cleanedTerm),
    ),
  );
};
const grid = document.querySelector("#grid");
const emptyState = document.querySelector("#emptyState");
function renderRecipes(recipeList) {
  grid.innerHTML = "";
  if (recipeList.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";
  const cards = recipeList.map((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("card");
    recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.cuisine}</p>
            <img src="${recipe.image}" alt="${recipe.title}">
        `;
    recipeElement.addEventListener("click", function () {
      const selectedRecipe = recipe;
      let ingredientsHTML = "";
      let measurementsHTML = "";
      for (let i = 0; i < selectedRecipe.ingredients.length; i++) {
        ingredientsHTML += `<li>${selectedRecipe.ingredients[i]}</li>`;
      }
      for (let i = 0; i < selectedRecipe.ingredients.length; i++) {
        measurementsHTML += `<li>${selectedRecipe.ingredients[i]} - ${selectedRecipe.measures[i]}</li>`;
      }
      console.log(ingredientsHTML);
      console.log(measurementsHTML);
      indexCard.innerHTML = `
      <h2>${selectedRecipe.title}</h2>
      <p>${selectedRecipe.cuisine}</p>
      <img src="${selectedRecipe.image}" alt="${selectedRecipe.title}">
      <h2>${selectedRecipe.ingredients.length} Ingredients</h2>
      <ul>${ingredientsHTML}</ul>
      <h2>Measurements</h2>
      <ul>${measurementsHTML}</ul>
      <h2>Instructions</h2>
      <p>${selectedRecipe.instructions}</p>
      <button id="closeButton">Close</button>
      `;
      scrim.classList.add("open");
      scrim.scrollTop = 0;
      const closeButton = document.querySelector("#closeButton");
      closeButton.addEventListener("click", function () {
        scrim.classList.remove("open");
      });

      console.log(selectedRecipe);
    });
    /* grid.appendChild(recipeElement);*/
    return recipeElement;
  });
  grid.append(...cards);
  console.log(cards);
}
const scrim = document.querySelector("#scrim");


let filters = ["All"];
const chipRow = document.querySelector("#chipRow");
const chips = document.querySelectorAll(".chip");
function renderFilterChips() {
  for (let recipe of recipes) {
    if (!filters.includes(recipe.cuisine) && recipe.cuisine !== null) {
      filters.push(recipe.cuisine);
    }
  }
  chipRow.innerHTML = "";
  const chips = filters.map((filter) => {
    const chip = document.createElement("button");
    chip.classList.add("chip");
    chip.textContent = filter;
    chip.addEventListener("click", function () {
      chips.forEach((c) => c.classList.remove("selected"));
      const filter = this.textContent;
      selectedFilter = filter;
      renderRecipes(searchRecipes(searchInput.value));
      chip.classList.add("selected");
    });

    return chip;
  });
  chipRow.append(...chips);
}




/* =======================================================================
   ADMIN - add a recipe
   The "+" button only appears for a logged-in admin (see applyAuthState).
   ======================================================================= */
const formScrim = document.querySelector("#formScrim");
const recipeForm = document.querySelector("#recipeForm");
const recipeBanner = document.querySelector("#recipeBanner");
const ingredientRows = document.querySelector("#ingredientRows");
const addIngredientRow = document.querySelector("#addIngredientRow");
const cancelRecipe = document.querySelector("#cancelRecipe");
const saveRecipe = document.querySelector("#saveRecipe");

function showRecipeBanner(message, kind) {
  recipeBanner.textContent = message;
  recipeBanner.classList.remove("error", "success");
  recipeBanner.classList.add("show", kind);
}
function clearRecipeBanner() {
  recipeBanner.classList.remove("show", "error", "success");
  recipeBanner.textContent = "";
}

function buildIngredientRow() {
  const row = document.createElement("div");
  row.classList.add("ing-row");
  row.innerHTML = `
    <input type="text" class="ing-name" placeholder="Ingredient" />
    <input type="text" class="ing-measure" placeholder="Measure (e.g. 1 cup)" />
    <button type="button" class="remove-row" title="Remove">&times;</button>
  `;
  row.querySelector(".remove-row").addEventListener("click", () => {
    // always keep at least one row on screen
    if (ingredientRows.children.length > 1) {
      row.remove();
    } else {
      row.querySelectorAll("input").forEach((input) => (input.value = ""));
    }
  });
  return row;
}

function resetRecipeForm() {
  recipeForm.reset();
  clearRecipeBanner();
  ingredientRows.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    ingredientRows.append(buildIngredientRow());
  }
}

function openFormScrim() {
  resetRecipeForm();
  formScrim.classList.add("open");
  formScrim.scrollTop = 0;
}
function closeFormScrim() {
  formScrim.classList.remove("open");
}

addIngredientRow.addEventListener("click", () => {
  ingredientRows.append(buildIngredientRow());
});

addRecipe.addEventListener("click", () => {
  openFormScrim();
});

cancelRecipe.addEventListener("click", closeFormScrim);

formScrim.addEventListener("click", (event) => {
  if (event.target === formScrim) closeFormScrim();
});



  const imageInput = document.getElementById('rImage');
  const imagePreview = document.getElementById('imagePreview');
  const previewImg = document.getElementById('previewImg');

  let imageString="";
  imageInput.addEventListener('change', function() {
    const file = this.files[0];
    
    if (file) {
      const reader = new FileReader();
      console.log("hi")
      reader.addEventListener('load', function() {
        // Set the image src to the file data and display the container
        imageString=this.result;
        previewImg.setAttribute('src', imageString);
        imagePreview.style.display = 'block';
      });
      
      // Read the local file as a data URL
      reader.readAsDataURL(file);
    } else {
      // Hide the preview if no file is selected
      console.log("hello")
      imagePreview.style.display = 'none';
      previewImg.setAttribute('src', '');
    }
  });



recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearRecipeBanner();

  const title = document.querySelector("#rTitle").value.trim();
  const cuisine = document.querySelector("#rCuisine").value.trim();
  const category = document.querySelector("#rCategory").value.trim();
  const instructions = document.querySelector("#rInstructions").value.trim();

  const image=imageString;
  
  // only keep rows where the ingredient was actually filled in,
  // and keep measures lined up with them (the API requires equal lengths)
  const ingredients = [];
  const measures = [];
  ingredientRows.querySelectorAll(".ing-row").forEach((row) => {
    const ingredientValue = row.querySelector(".ing-name").value.trim();
    const measureValue = row.querySelector(".ing-measure").value.trim();
    if (ingredientValue) {
      ingredients.push(ingredientValue);
      measures.push(measureValue || "to taste");
    }
  });

  if (!title || !cuisine || !category || !image || !instructions) {
    showRecipeBanner("Please fill in every field above.", "error");
    return;
  }
  if (ingredients.length === 0) {
    showRecipeBanner("Add at least one ingredient.", "error");
    return;
  }

  saveRecipe.disabled = true;
  saveRecipe.textContent = "Saving…";
  token=localStorage.getItem("token");

  try {
    const response = await fetch(`${API_PORT}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        cuisine,
        category,
        image,
        ingredients,
        measures,
        instructions,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      showRecipeBanner(data.message || "Could not save the recipe.", "error");
      return;
    }

    showRecipeBanner("Recipe added to the drawer.", "success");
    await loadRecipes();
    renderRecipes(searchRecipes(searchInput.value));
    setTimeout(closeFormScrim, 900);
  } catch (error) {
    console.error("Error adding recipe:", error);
    showRecipeBanner("Could not reach the server.", "error");
  } finally {
    saveRecipe.disabled = false;
    saveRecipe.textContent = "Save recipe";
  }
});

