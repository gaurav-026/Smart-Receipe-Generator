import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // go to recipe detail page when button is clicked
    const handleClick = (data) => {
        console.log(data);
        navigate('/recipeDetails', { state: { details: data } });
    }
    // fetch recipes from backend 
    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://smart-receipe-generator.onrender.com/api/v1/getReceipeDetails', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const result = await response.json();
            // console.log(result.response);
            setRecipes(result.response);
        } catch (error) {
            toast.error("An error occured");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);
    return (
        <div className="flex gap-6 lg:p-10 md:p-8 p-5 flex-col">
            <h1 className='lg:text-3xl md:text-3xl text-2xl'>Get your favourite Recipe</h1>
            <div className='flex flex-wrap lg:justify-start md:justify-start justify-center gap-4'>
            {loading ? (
                <div className='flex items-center justify-center'>
                <div className='p-4 bg-bgOrange w-fit rounded-md'><Spinner /></div>
              </div>
            ) : recipes.length > 0 ? (
                recipes.map((item, index) => (
                    <button
                        key={item._id || index} // Use a unique key, preferably `_id` from the database
                        className="flex flex-col items-center"
                        onClick={() => handleClick(item)} // Pass the `item` directly to `handleClick`
                    >
                        <img
                            src={item.imageUrl || '/placeholder.png'} // Fallback to placeholder if imageUrl is missing
                            alt={item.title}
                            width="120px"
                            className="rounded-full"
                        />
                        <span className="lg:text-xl md:text-xl text-lg">{item.title}</span>
                    </button>
                ))
            ) : (
                <p>No recipes available</p>
            )}
            </div>
        </div>
    );
}

export default Recipes
