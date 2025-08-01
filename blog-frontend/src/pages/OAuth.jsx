import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider} from 'firebase/auth';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/slices/userSlice';

const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () =>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});
        try {
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    googlePhotoUrl: result.user.photoURL,

                })
            });
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Button type='button' className='bg-linear-65 from-pink-500 to-orange-500 text-white' outline onClick={handleClick}>
       <AiFillGoogleCircle className='w-6 h-6 mr-2' /> Continue with Google
    </Button>
  )
}

export default OAuth