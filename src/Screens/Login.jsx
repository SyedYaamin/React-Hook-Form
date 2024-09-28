import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { auth, db } from '../Config/Firebase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";




export const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [userData, setUserData] = useState(null);
    const loginUserWithFirebase = async (data) => {
        try {

            const q = query(collection(db, "users"), where("CNIC", "==", data.cnic));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    console.log("User found:", doc.data());
                    setUserData(doc.data());
                });
                navigate('/');
            } else {
                console.log("No user found with this CNIC.");
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className='bg-gray-200 rounded-xl mt-5 p-2 flex flex-row gap-2'>
                    <button className='hover:bg-gray-300 p-3 rounded-xl text-sm font-medium'>
                        <Link to='/signup'>Admission Form</Link>
                    </button>

                    <button className='bg-gray-300 p-3 rounded-xl text-sm'>
                        <Link to='/login'>Verify Admission</Link>
                    </button>
                </div>
                <h1 className='text-4xl my-8 text-center font-bold'>Admission Verification</h1>
                <form onSubmit={handleSubmit(loginUserWithFirebase)} className='py-10 px-20 w-full flex flex-col justify-center'>
                    <div className='w-full flex flex-col'>
                        <label className='mt-8 text-black font-bold'>CNIC (Which you provided during form submission)</label>
                        <input
                            className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3'
                            type="text"
                            placeholder='National ID (CNIC)'
                            {...register("cnic", {
                                required: "CNIC is required",
                                pattern: {
                                    value: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
                                    message: "Invalid CNIC format"
                                }
                            })}
                        />
                        <br />
                        {errors.cnic && <span className="text-red-500 text-sm">{errors.cnic.message}</span>}
                    </div>
                    <button className='py-2 px-4 bg-indigo-700 text-md font-medium text-white rounded-2xl' type='submit'>Submit</button>
                </form>
            </div>
        </>
    )

}