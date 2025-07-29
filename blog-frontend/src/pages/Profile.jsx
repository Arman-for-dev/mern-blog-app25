import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {theme} = useSelector(state => state.theme);
  console.log(theme);
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-900 text-gray-200'}`}>
        <h1 className={`text-2xl font-bold p-4 ${theme === 'light' && 'text-red-700'}`}>Profile page</h1>
    </div>
  )
}

export default Profile