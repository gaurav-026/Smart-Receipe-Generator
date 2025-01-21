import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (item)=>{
    // console.log(item);
    navigate("/generatedReceipe", { state: { recipes: item.savedDetails.recipes } });
}
// fetch favourite receipes from backend 
  const fetchFavourites = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://smart-receipe-generator.onrender.com/api/v1/getFavourite', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const result = await response.json();
      // console.log(result);
      setFavourites(result.response);
    } catch (error) {
      console.error('Error fetching favourites:', error);
      toast.error("Error while fetching favourites!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div className='min-h-[100vh] md:mt-10 mt-5 lg:mt-10 flex flex-col gap-3'>
      {/* spinner  */}
      {loading ? (
        <div className='flex items-center justify-center'>
          <div className='p-4 bg-bgOrange w-fit rounded-md'><Spinner /></div>
        </div>
      ) : (
        // display favourite recipes 
        favourites.map((item, index) => (
          <div className="flex justify-between items-center lg:mx-10 md:mx-8 mx-5 px-4 py-4 bg-lightOrange hover:pointer rounded-md hover:shadow-md" key={index} onClick={()=> handleClick(item)}>
            <div className='flex flex-col '>
            <h2 className='text-2xl md:text-3xl lg:text-3xl'>{item.savedDetails.recipes.dishName}</h2>
            <p className='text-xl md:text-2xl lg:text-2xl text-textGrey'>{item.savedDetails.recipes.description}</p>
            </div>
            <FaAngleRight size={30} color='#FF6600'/>
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;
