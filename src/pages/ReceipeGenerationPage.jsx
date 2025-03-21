import React, { useState } from 'react'
import img1 from '../assets/Frame 2.png'
import img2 from '../assets/Frame 4 (1).png'
import img3 from '../assets/Frame 3.png'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const ReceipeGenerationPage = () => {
  //input field state
  const [ingredients, setIngredients] = useState('');
  //filters state
  const [receipeType, setReceipeType] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  //handle click 
  const handleClick = async () => {
    setLoading(true);
    try {
      //if no ingredients found show toast
      if (!ingredients) {
        alert('please enter ingredients');
        setLoading(false);
        return;
      }
      //storing all the filters in array
      const filters = [receipeType, cookingTime, difficulty, dietPreference, restrictions];
      //Api calling
      // console.log("Calling api..")
      const response = await fetch('http://localhost:3001/api/v1/generateResponse', {
        method: 'POST',
        headers: {
          "Content-type": 'application/json',
        },
        body: JSON.stringify({
          ingredients, filters
        }),
      })
      // console.log("Waiting for response")
      // Check for response success
      if (!response.ok) {
        throw new Error("Failed to fetch recipe");
      }

      const data = await response.json();
      const jsonString = data.response.replace(/^```json\s*/, "").replace(/```$/, "");
    // Ensure proper parsing of JSON response
    const recipeData = JSON.parse(jsonString);
    console.log(recipeData);
      if (recipeData) {
        // Store the results in state or pass them to the new route
        navigate("/generatedReceipe", { state: { recipes: recipeData, ingredients: ingredients } });
      } else {
        alert("No recipes found. Please try again.");
      }

    }
    catch (error) {
      console.log("Error occured while generating", error);
      alert('An error Occured! Please try again');
      
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='lg:mx-10 md:mx-8 mx-5 py-5'>
      <div className='flex justify-between lg:flex-row flex-col-reverse'>
        {/* heading  */}
        <div className='lg:w-[45%] flex flex-col lg:gap-6 md:gap-6 gap-4 lg:justify-center'>
        <h1 className='lg:text-8xl md:text-6xl text-5xl font-medium lg:text-start text-center'>Create Delicious Receipies in Seconds</h1>
        <p className='lg:text-3xl md:text-3xl text-2xl font-medium'>This is the most popular application which can tell you about receipies based on their selected ingredients. </p>
        {/* genearte button  */}
        <div className='flex gap-4 text-2xl bg-grey py-2  rounded-full px-8 border-2 border-bgOrange '>
          <input type="text" placeholder='Enter ingredients' className='lg:pb-2 md:pb-2 pb-1 px-4 outline-none rounded-md w-full' onChange={(e) => setIngredients(e.target.value)} />
          <button className={`bg-textOrange text-white  px-4 pt-0 ${loading ? "pb-0" : "lg:pb-2 md:pb-2 pb-1"} rounded-md`} onClick={handleClick}>{loading ? (<Spinner />) : "Generate"}</button>
        </div>
        </div>
         {/* images here  */}
        <div className='lg:py-5 py-8 flex items-center justify-center '>
         
        <div className='flex gap-3 h-fit '>
          <div className='flex flex-col gap-3'>
            <img src={img1} alt="img1" width={200} />
            <img src={img2} alt="img1" width={200} />
          </div>
          <img src={img3} alt="img3" width={200} />
        </div>
        </div>
      </div>
      {/* filters & other stuffs */}
      <div className='flex flex-col gap-6 '>

        {/* filters  */}
        <span className='text-2xl'>Select Filters</span>
        <div className='flex flex-wrap gap-4 text-2xl text-textOrange'>
          {/* Receipe Type  */}
          <select name="preparationTime" id="preparationTime" className='border border-textOrange lg:pb-2 md:pb-2 pb-1  px-4  rounded-md flex items-center outline-none appearance-none bg-lightOrange' onChange={(e) => setReceipeType(e.target.value)}>
            <option value="Select">Receipe Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunk">Lunch</option>
            <option value="snacks">Snacks</option>
            <option value="dinner">Dinner</option>
          </select>
          {/* Cooking time  */}
          <select name="preparationTime" id="preparationTime" className='border border-textOrange lg:pb-2 md:pb-2 pb-1 px-4  rounded-md flex items-center outline-none appearance-none bg-lightOrange' onChange={(e) => setCookingTime(e.target.value)} >
            <option value="Select">Cooking Time</option>
            <option value="5-10min">5-10 mins</option>
            <option value="10-25min">15-25 mins</option>
            <option value="30-40min">30-40 mins</option>
            <option value="40-90min">40-90 mins</option>
          </select>
          {/* Difficulty  */}
          <select name="preparationTime" id="preparationTime" className=' border border-textOrange lg:pb-2 md:pb-2 pb-1  px-4  rounded-md flex items-center outline-none appearance-none bg-lightOrange' onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Select">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
          </select>
          {/* Diet Preference  */}
          <select name="preparationTime" id="preparationTime" className='bg-lightOrange border border-textOrange lg:pb-2 md:pb-2 pb-1 px-4  rounded-md flex items-center outline-none appearance-none' onChange={(e) => setDietPreference(e.target.value)}>
            <option value="Select">Diet Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="high-protein">High-Protein</option>
            <option value="omnivorous">Omnivorous</option>
          </select>
          {/* Restrictions */}
          <select name="preparationTime" id="preparationTime" className='bg-lightOrange border border-textOrange lg:pb-2 md:pb-2 pb-1 px-4  rounded-md flex items-center outline-none appearance-none' onChange={(e) => setRestrictions(e.target.value)} >
            <option value="Select">Restrictions</option>
            <option value="low-fat">Low Fat</option>
            <option value="sugar-free">Sugar-Free</option>
            <option value="glutan-free">Gluten-Free</option>
            <option value="nut-free">Nut-Free</option>
          </select>

        </div>
        {/* Example prompts  */}
        <span className='text-2xl'>Example Prompts</span>
        <div className='bg-lightOrange flex flex-wrap gap-2 px-4 py-4 rounded-md'>
          <p className='px-3 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Bread, butter, and cheese</p>
          <p className='px-2 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Pasta, olive oil, and garlic</p>
          <p className='px-2 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Potatoes, carrots, and green beans</p>
          <p className='px-2 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Tomatoes, cucumbers, and onions</p>
          <p className='px-2 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Chicken breast, eggs, and yogurt</p>
          <p className='px-2 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Pineapple, mango, and coconut</p>
          <p className='px-2 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Orange juice, carrots, and ginger</p>
          <p className='px-2 lg:pb-2 md:pb-2 pb-1 text-textOrange w-fit rounded-full text-xl bg-white'>Almond milk, frozen berries, and bananas</p>
        </div>
      </div>
    </div>
  )
}

export default ReceipeGenerationPage
