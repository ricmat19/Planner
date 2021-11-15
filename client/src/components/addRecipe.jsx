import React, { useEffect, useRef, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import RecipeAPI from "../apis/recipeAPI";
import PropTypes from 'prop-types';

const AddRecipeC = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [apiKey] = useState(process.env.REACT_APP_RECIPE_APIKEY);

  const searchInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
    try {

      //Check if logged in
      const loginResponse = await IndexAPI.get(`/login`);
      setLoggedIn(loginResponse.data.data.loggedIn)

    } catch (err) {
        console.log(err);
    }
    };
    fetchData();
}, []);

  const searchRecipes = async (e) => {
    e.preventDefault();
    
    if(loggedIn){
      try {
        const searchResponse = await RecipeAPI.get(
          "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
            apiKey +
            "&query=" +
            search
        );

        const recipeArray = [];
        for (let i = 0; i < searchResponse.data.results.length; i++) {
          const recipeInfo = await RecipeAPI.get(
            "https://api.spoonacular.com/recipes/" +
              searchResponse.data.results[i].id +
              "/information?apiKey=" +
              apiKey
          );
          recipeArray.push(recipeInfo);
        }
        setSearchResults(recipeArray);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const saveRecipe = async (recipe) => {
    if(loggedIn){
      try {
        await IndexAPI.post("/recipes/add-recipe", {
          recipe,
        });

        props.setNewRecipe(recipe);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-center">
        <form>
          <div className="grid search-form">
            <div className="title">Search for a Recipe</div>
            <div className="grid">
              <input
                ref={searchInput}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                name="search"
                placeholder="Search..."
              />
            </div>
            <div>
              <button className="form-button" onClick={searchRecipes}>
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="search-results-container">
          {searchResults.map((result) => (
            <div key={result.data.id}>
              <div className="sub-title">{result.data.title}</div>
              <div className="grid">
                <div>
                  <div>Ingredients</div>
                  <ul>
                    {result.data.extendedIngredients.map(
                      (ingredient, index) => (
                        <div key={index}>
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
                  {result.data.analyzedInstructions[0].steps.map(
                    (step, index) => (
                      <div className="recipe-steps" key={index}>
                        <div>
                          {index + 1}. {step.step}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div className="recipe-button-div">
                    <button
                      className="form-button"
                      onClick={() => saveRecipe(result.data.id)}
                    >
                      Add
                    </button>
                  </div>
                  <div>
                    <div className="align-right">
                      Servings: {result.data.servings}
                    </div>
                    <img className="meal-image" src={result.data.image} />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AddRecipeC.propTypes = {
  setNewRecipe: PropTypes.func
}

export default AddRecipeC;
