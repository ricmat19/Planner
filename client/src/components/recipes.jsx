import React, { useEffect, useRef, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import RecipeAPI from "../apis/recipeAPI";
import AddRecipeC from "./addRecipe";
import PropTypes from "prop-types";

const RecipesC = (props) => {
  // const [loginStatus, setLoginStatus] = useState("");
  const [addRecipesModal, setAddRecipesModal] = useState("modal");
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState("");
  const [deletedRecipe, setDeletedRecipe] = useState("");
  const [apiKey] = useState(process.env.REACT_APP_RECIPE_APIKEY);

  const addRecipesRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.addEventListener("mousedown", (event) => {
          if (addRecipesRef.current !== null) {
            if (!addRecipesRef.current.contains(event.target)) {
              setAddRecipesModal("modal");
            }
          }
        });

        //Get the list of recipes in the DB
        let recipes = [];
        if (props.recipeModal === "modal modal-active") {
          const recipesResponse = await IndexAPI.get(`/recipes`);
          for (let i = 0; i < recipesResponse.data.data.recipes.length; i++) {
            recipes.push(recipesResponse.data.data.recipes[i].recipe);
          }

          // const loginResponse = await IndexAPI.get(`/login`);
          // setLoginStatus(loginResponse.data.status);

          // if (loginResponse.data.data.loggedIn) {
            //Request all data from Recipe API pertaining to the list of recipes
            const recipeArray = [];
            for (let i = 0; i < recipes.length; i++) {
              const recipeInfo = await RecipeAPI.get(
                "https://api.spoonacular.com/recipes/" +
                  recipes[i] +
                  "/information?apiKey=" +
                  apiKey
              );
              recipeArray.push(recipeInfo);
            }
            setRecipes(recipeArray);
          // }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.recipeModal, newRecipe, deletedRecipe]);

  const displayAddRecipeModal = () => {
    setAddRecipesModal("modal modal-active");
  };

  const removeRecipe = async (recipe) => {
    try {
      // const loginResponse = await IndexAPI.get(`/login`);
      // setLoginStatus(loginResponse.data.status);

      // if (loginResponse.data.data.loggedIn) {
        await IndexAPI.delete(`/recipes/remove-recipe/${recipe}`);
        setDeletedRecipe(recipe);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Day's To Do's */}
      <div className={addRecipesModal}>
        <div ref={addRecipesRef} className="modal-content">
          <AddRecipeC setNewRecipe={(newRecipe) => setNewRecipe(newRecipe)} />
        </div>
      </div>

      <div className="grid grid-center">
        <button onClick={displayAddRecipeModal} className="item-button">
          <img src="../images/plus-solid-white.svg" />
        </button>
        <div className="title">Recipe Collection</div>
        <div>
          {recipes.map((recipe) => {
            return (
              <div key={recipe.data.id} className="grid grid-center">
                <div>
                  <div className="sub-title">{recipe.data.title}</div>
                  <div className="grid recipe-info-div">
                    <div>
                      <div>Ingredients</div>
                      <ul>
                        {recipe.data.extendedIngredients.map(
                          (ingredient, index) => (
                            <div className="recipe-ingredients" key={index}>
                              <li>
                                {ingredient.nameClean}{" "}
                                {ingredient.measures.us.amount}{" "}
                                {ingredient.measures.us.unitShort}
                              </li>
                            </div>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <div>Steps</div>
                      {recipe.data.analyzedInstructions[0].steps !== undefined
                        ? recipe.data.analyzedInstructions[0].steps.map(
                            (step, index) => (
                              <div className="recipe-steps" key={index}>
                                <div>
                                  {index + 1}. {step.step}
                                </div>
                              </div>
                            )
                          )
                        : "Unknown"}
                    </div>
                    <div>
                      <div className="recipe-button-div">
                        <button
                          className="form-button"
                          onClick={() => removeRecipe(recipe.data.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div>
                        <div className="align-right">
                          Servings: {recipe.data.servings}
                        </div>
                        <img className="meal-image" src={recipe.data.image} />
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="login-error-message">{loginStatus}</div> */}
    </div>
  );
};

RecipesC.propTypes = {
  recipeModal: PropTypes.string,
};

export default RecipesC;
