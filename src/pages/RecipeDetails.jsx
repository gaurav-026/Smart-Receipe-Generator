import React from 'react'
import { useLocation } from 'react-router-dom'

const RecipeDetails = () => {
    const location = useLocation();
    const {details} = location.state || {};

  return (
      <div className='lg:px-10 md:px-8 px-5 lg:py-10 md:py-8 py-5 flex flex-col gap-2'>
        {/* dish name  */}
        <h2 className='text-4xl'>
          {details.title}
        </h2>
        {/* short description  */}
        <p className='text-2xl text-textGrey '>
          {details.shortDescription}
        </p>
        {/* cooking time and difficulty  */}
        <p className='text-2xl flex'>
          <h3 >Cooking Time: </h3> <span className='text-textGrey'>&nbsp; {details.cookingTime}</span>
        </p>
        <p className='text-2xl flex'>
          <h3 >Difficulty: </h3> <span className='text-textGrey'>&nbsp; {details.difficulty}</span>
        </p>

        <h3 className='text-3xl' >Ingredients:</h3>
        <ul>
          {details.ingredients.map((ingredient, index) => (
            <li key={index} className='text-2xl text-textGrey '>
              - {ingredient}
            </li>
          ))}
        </ul>

        <h3 className='text-3xl'>Steps to Prepare:</h3>
        <ol>
          {details.steps.map((step, index) => (
            <li key={index} className='text-2xl text-textGrey '>
              - {step}
            </li>
          ))}
        </ol>
      </div>
  )
}

export default RecipeDetails
