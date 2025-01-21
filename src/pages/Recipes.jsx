import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = (data)=>{
        console.log(data);
        navigate('/recipeDetails', {state: {details: data}});
    }
     const fetchRecipes = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3001/api/v1/getReceipeDetails', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          });
          const result = await response.json();
          console.log(result.response);
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
    <div className="flex gap-4 lg:p-10 md:p-8 p-5 flex-wrap">
            {loading ? (
                <Spinner />
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
                        <span className="text-xl">{item.title}</span>
                    </button>
                ))
            ) : (
                <p>No recipes available</p>
            )}
        </div>
    );
}

export default Recipes
