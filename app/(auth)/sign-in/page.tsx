'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import myImage from "../../../public/images/Hello.png";
import { HiOutlineEye , HiOutlineEyeOff  } from 'react-icons/hi';
// import { User } from '../../../interface/user.d';


export default function SignInPage(): JSX.Element {
  const [user, setUser] = useState<User>({ 
    firstName: '',
    lastName: '',
    email: '', 
    password: '', 
    role: ''
   });

   const validateUser = async () => {
      try { 
        const response = await fetch('http://127.0.0.1:8000/api/test/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        if (data.status === 200){
          alert('Successfully connected to server');
        }
      }catch(error) {
        console.error(error);
      }
   };
   
    useEffect(() => {
      validateUser();
    }, []);

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisibility(!passwordVisibility);
    }
    
   return (
    <>
    <div className="flex items-center justify-center min-h-screen ">
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-16'>

        {/* Column 1 - Image */}
        <div>
          <Image src={myImage} alt="Two people greeting each other" width={590} height={752}></Image>
        </div>

        {/* Column 2 - Login Feature */}
        <div>

          <div className='flex flex-col items-center gap-4'>

          <div className='text-center mb-4'>
             <h1 className='mb-9 text-4xl font-bold text-deepSkyBlue'>Welcome to KeelWorks!</h1>
            <p className='text-sm'>Login to continue your educational journey!</p>
          </div>

          {/* Email Input Field */}
          <div className='mb-4'>
            <label className='block mb-1'>Email</label>
            <input type="email" className='block border rounded pb-2 w-80 p-1'></input>
          </div>
      
          {/* Password Input Field */}
          <div className='mb-4 relative'>
            <label className='block mb-1'>Password</label>
            <input type={passwordVisibility ? 'text' : 'password'} className='block border rounded pb-2 w-80 p-1'></input>
            <button type='button' className='absolute text-xl inset-y-0.5 right-0 flex items-center px-5 pt-7 ' onClick={togglePasswordVisibility}>
              {passwordVisibility ? (
              <HiOutlineEyeOff className='text-black-500 transform -scale-x-100'/>
              ) : (
                <HiOutlineEye className='text-black-500' />
              )}</button>
            <a className='absolute right-0 top-full font-medium text-xs underline text-blue-500 hover:text-blue-700 cursor-pointer mt-1'>Forgot password?</a>
          </div>

          {/* Buttons section */}
          <button className='px-4 py-3 mt-5 bg-secondary font-bold rounded-3xl w-80'>
              Login
          </button>
          
          {/* The horizontal line with text in the middle */}
            <div className='inline-flex items-center justify-center w-full'>
                <hr className='w-80 h-px my-8 bg-gray-500 border-0 dark:bg-gray-700'></hr>
                <span className='absolute px-3 font-medium text-gray-500 -translate-x-1 bg-white dark:bg-gray-900'>or</span>
            </div>

            <button className='px-4 mb-4 py-3 border border-gray-500 flex items-center justify-center gap-2 rounded-3xl dark:text-slate-200 w-80 shadow-md'>
              <img className='w-6 h-6 flex-shrink-0' src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"></img>
              <span className='flex-grow text-center font-bold'>Sign in With Google</span>
            </button>
            
            <button className='px-5 py-3 border gap-2 bg-gray-200 rounded-3xl mb-10 w-80'>
              Don't have an account? <span className='font-bold'>Register</span>
            </button>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};
