import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';
import RecipeAPI from'../apis/recipeAPI';

const RecipeC = () => {

    const searchInput = useRef(null);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [apiKey, setAPIKey] = useState(process.env.REACT_APP_RECIPE_APIKEY);


    const searchBooks = async (e) => { 
        e.preventDefault()
        try{

            // const searchResponse = await RecipeAPI.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&query=" + search)

            // const recipeArray = [];
            // for(let i = 0; i < searchResponse.data.results.length; i++){
            //     const recipeInfo = await RecipeAPI.get("https://api.spoonacular.com/recipes/" + searchResponse.data.results[i].id + "/information?apiKey=" + apiKey)
            //     recipeArray.push(recipeInfo)
            // }
            // console.log(recipeArray)
            // setSearchResults(recipeArray);

        }catch(err){
            console.log(err);
        }
    };

    const saveRecipe = async (recipe) => { 
        try{
            const response = await PlannerAPI.post("/recipes/add-recipe",{
                recipe,
            });
            console.log(response)
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">
            <div className="grid grid-center">
                <form>
                    <div className="grid recipe-search-form">
                        <div className="title">Search for a Recipe</div>
                        <div className="grid">
                            <input className="modal-header" ref={searchInput} onChange={e => setSearch(e.target.value)} type="text" name="search" placeholder="Search..."/>
                        </div>
                        <div>
                            <button onClick={searchBooks}>Search</button>
                        </div>
                    </div>
                </form>
                <div className="search-results-container">
                    {searchResults.map(result => (
                        <div className="recipe-result" key={result.id}>
                            <div></div>
                            <div></div>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecipeC;