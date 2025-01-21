import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='flex justify-between items-center pt-4 pb-6 lg:px-10 md:px-8 px-5 bg-textOrange text-white'>
      <Link to={'/'} className="lg:text-3xl md:text-3xl text-2xl font-kavoon">ChefAI</Link>
      <div className='flex lg:gap-4 md:gap-4 gap-2 lg:text-2xl md:text-2xl text-xl'>
      <Link to={'/recipe'}>Receipies</Link>
      <Link to={'/favourite'}>Favourite</Link>
      </div>
      <span className='lg:text-2xl md:text-2xl text-xl'>Profile</span>
    </nav>
  )
}

export default Header
