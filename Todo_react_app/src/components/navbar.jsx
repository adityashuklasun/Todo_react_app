import React from 'react'

function navbar() {
  return (
    <div>
        <nav className=" flex justify-between bg-green-500 p-4 text-white">
            <div className="logo">
                <span className="font-bold text-xl mx-8">iTask</span>
            </div>
            <ul className='flex space-x-4'>
  <li className="cursor-pointer hover:font-bold transition-all duration-400">Home </li>
  <li className="cursor-pointer hover:font-bold transition-all duration-400">About</li>
            </ul>


            </nav>
    </div>
  )
}

export default navbar
