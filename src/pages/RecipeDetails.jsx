import React from 'react'
import { useLocation } from 'react-router-dom'

const RecipeDetails = () => {
    const location = useLocation();
    const {details} = location.state || {};

  return (
      <div className='lg:px-10 md:px-8 px-5 lg:py-10 md:py-8 py-5 flex flex-col lg:gap-2 md:gap-2 gap-1'>
        {/* dish name  */}
        <h2 className='lg:text-4xl md:text-4xl text-3xl'>
          {details.title}
        </h2>
        {/* short description  */}
        <p className='lg:text-2xl md:text-2xl text-xl text-textGrey '>
          {details.shortDescription}
        </p>
        {/* cooking time and difficulty  */}
        <p className='lg:text-2xl md:text-2xl text-xl flex'>
          <h3 >Cooking Time: </h3> <span className='text-textGrey'>&nbsp; {details.cookingTime}</span>
        </p>
        <p className='lg:text-2xl md:text-2xl text-xl flex'>
          <h3 >Difficulty: </h3> <span className='text-textGrey'>&nbsp; {details.difficulty}</span>
        </p>

        <h3 className='lg:text-3xl md:text-3xl text-2xl' >Ingredients:</h3>
        <ul>
          {details.ingredients.map((ingredient, index) => (
            <li key={index} className='lg:text-2xl md:text-2xl text-xl text-textGrey '>
              - {ingredient}
            </li>
          ))}
        </ul>

        <h3 className='lg:text-3xl md:text-3xl text-2xl'>Steps to Prepare:</h3>
        <ol>
          {details.steps.map((step, index) => (
            <li key={index} className='lg:text-2xl md:text-2xl text-xl text-textGrey '>
              - {step}
            </li>
          ))}
        </ol>
      </div>
  )
}

export default RecipeDetails
