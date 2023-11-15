import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]); // Add userID to the dependency array

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const inName = recipe.name.toLowerCase().includes(lowerCaseQuery);
    const inIngredients = recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowerCaseQuery)
    );
    return inName || inIngredients;
  });

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
      <div className={'main-container w-full block relative py-20'}>
        <div className={'main-container-wrapper w-11/12 mx-auto relative block'}>
          <h1 className={'block relative pb-5 text-3xl font-bold'}>Recipes</h1>
          <div className={'search-recipe-container w-full block relative pb-5'}>
            <form onSubmit={(e) => {
              e.preventDefault();
            }} className={'block relative w-full max-w-[300px] flex flex-row justify-between'}>
              <label htmlFor="name" hidden>Name</label>
              <input
                  type="text"
                  className={'w-full block border border-brand-grey-100 py-2 px-3 text-sm'}
                  id="name"
                  name="name"
                  placeholder={'Search For Recipes'}
                  onChange={handleSearchChange}
                  value={searchQuery}
              />
              <button type="submit" className={'block relative max-w-fit py-2 px-2 text-center text-white font-medium bg-blue-300 rounded-xl '}>Search</button>
            </form>
          </div>

          {filteredRecipes.length === 0 ? (
              <div className={'no-recipes block relative w-full text-center text-2xl font-bold'}>
                <p>No recipes found.</p>
              </div>
          ) : (
            <ul className={'flex flex-row flex-wrap w-full relative'}>
              {filteredRecipes.map((recipe) => (
                  <li key={recipe._id} className={'w-full sm:w-1/2 relative flex flex-col sm:px-6 pb-5 border-none'}>
                    <div className={'item-wrapper w-full border-brand-300 border h-full py-5 px-6'}>
                      <h2 className={'block relative text-lg font-bold'}>{recipe.name}</h2>

                      <button
                          onClick={() => saveRecipe(recipe._id)}
                          disabled={isRecipeSaved(recipe._id)}
                      >
                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                      </button>

                      <div className="ingredients">
                        {recipe.ingredients.length > 1 ? (

                            recipe.ingredients.map((ingredient, index) => (
                                <p key={index}>- {ingredient}</p>
                            ))
                        ) : (
                            <p>No ingredients available</p>
                        )}
                      </div>

                      {recipe.instructions !== '' ? (
                          <div className="instructions">
                            <p>{recipe.instructions}</p>
                          </div>
                      ) : null}

                      <img src={recipe.imageUrl} alt={recipe.name} loading={'lazy'} />
                      <p>Cooking Time: {recipe.cookingTime} minutes</p>

                    </div>


                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
};