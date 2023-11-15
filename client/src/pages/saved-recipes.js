import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    // Initial data fetching
    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/${userID}`
                );
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSavedRecipes();
    }, [userID]); // Include userID in the dependency array

    // Additional effects that depend on userID can be added here
    useEffect(() => {
        // Your additional logic here, if needed
    }, [userID]);

    return (
        <div>
            <h1>Saved Recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="ingredients">

                                {recipe.ingredients.map((ingredient) => (
                                    <p>
                                        {ingredient}
                                    </p>
                                ))}


                        </div>


                        <p>{recipe.instructions}</p>
                        <p>{recipe.description}</p>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} minutes</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
