import { Alert, Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from "../redux/slices/userSlice";
import OAuth from './OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error: errorMessage} = useSelector((state)=> state.user);

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all filed!'))
    }

    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
      }

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex flex-col md:flex-row items-center gap-5 p-3 max-w-3xl mx-auto">

        {/* Left */}
        <div className='flex-1'>
          <Link to="/" className='font-semibold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>ArNa's</span>
              Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email or google account
          </p>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className=' flex flex-col gap-4' onSubmit={handleSubmit}>
              {errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}
                </Alert>
              )}
            <h1 className='text-2xl font-semibold mb-3'>Sign Up</h1>
            <div>
              <Label>Username</Label>
              <TextInput type='text'  placeholder='Username' onChange={handleChange} id="username" />
            </div>
            <div>
              <Label htmlFor="email">Your email</Label>
              <TextInput type='email' placeholder='example@mail.com' onChange={handleChange} id="email" />
            </div>
            <div>
              <Label htmlFor="password">Your Password</Label>
              <TextInput type='password' placeholder='Password' onChange={handleChange} id="password" />
            </div>
            <Button className='cursor-pointer bg-linear-65 from-purple-500 to-pink-500' type='submit'>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>

              ): "Sign Up" }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to="/sign-in" className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp