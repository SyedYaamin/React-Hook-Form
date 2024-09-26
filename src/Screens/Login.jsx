import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { auth } from '../Config/Firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";


export const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const loginUserWithFirebase = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className='min-h-[100vh] flex justify-center items-center'>
                <form onSubmit={handleSubmit(loginUserWithFirebase)} className='border-2 flex flex-col items-center border-black min-w-[400px] min-h-[400px] rounded-3xl p-5'>
                    <h1 className='text-5xl  mt-3 text-center font-bold'>Login</h1>
                    <input className='w-full mt-8 rounded-xl px-4 py-3 outline-none border-2 border-black bg-transparent' type="email" placeholder='Enter Email' {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                    <input className='mt-5 w-full px-4 py-3 outline-none border-2 border-black bg-transparent rounded-xl' type="password" placeholder='Enter Password' {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                    <button className='bg-indigo-700 mt-4 px-7 py-3 rounded-lg text-white font-bold text-xl'>Login</button>
                    <p className='mt-2'>Not a User? <span className='text-indigo-700 cursor-pointer'><Link to='/signup'>Signup</Link></span></p>
                </form>
            </div>
        </>
    )
}
