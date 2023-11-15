import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });


  git clone --single-branch --branch development https://github.com/username/project.git


      const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2 className={'w-full flex flex-row flex-wrap bg-brand-grey-100 pb-3 font-bold text-3xl'}> Create Recipe</h2>
      <form onSubmit={handleSubmit} className={'w-full flex flex-row flex-wrap bg-brand-grey-100'}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={'w--full block relative py-2 px-5 text-sm border border-brand-grey-300'}
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className={'w--full block relative py-2 px-5 text-sm border border-brand-grey-300'}
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            className={'w--full block relative py-2 px-5 text-sm border border-brand-grey-300'}
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}

        <button type="button" onClick={handleAddIngredient} className={'w-full block text-white bg-purple-700 p-1 rounded-sm text-xs'}>
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          className={'w--full block relative py-2 px-5 text-sm border border-brand-grey-300'}
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className={'w--full block relative py-2 px-5 text-sm border border-brand-grey-300'}
          value={recipe.imageUrl}
          onChange={handleChange}
          required={false}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          className={'w--full block relative py-2 px-5 text-sm border border-brand-grey-300'}
          value={recipe.cookingTime}
          onChange={handleChange}
          required={false}
        />
        <button type="submit " className={'block w-full max-w-fit relative mt-6 text-white bg-purple-500 rounded-lg p-2 font-bold px-5'}>Create Recipe</button>
      </form>
    </div>
  );
};
