import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db, storage,auth } from '../Config/Firebase/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const Signup = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState("");

    const signupUserWithFirebase = async (data) => {
        console.log(data);
        const file = data.image[0];
        const storageRef = ref(storage, `image/${file.name}`)

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    setImageUrl(url);
                    console.log(imageUrl);
                })
                .catch((error) => {
                    console.log("Error getting URL: ", error);
                });
        });

        try {
            const docRef = await addDoc(collection(db, "users"), {
                FullName: data.fullName,
                FatherName: data.fatherName,
                Email: data.email,
                PhoneNumber: data.phoneNumber,
                CNIC: data.cnic,
                DateOfBirth: data.DOB,
                Gender: data.gender,
                LaptopAvailability: data.laptop,
                Address: data.address,
                Qualification: data.qualification,
                ProfileImage: imageUrl,
            });
            console.log("Document written with ID: ", docRef.id);
            reset();
            navigate('/login');
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }

    return (
        <>
            <div className='min-h-[100vh] flex flex-col items-center w-full'>
                <div className='bg-gray-200 rounded-xl mt-5 p-2 flex flex-row gap-2'>
                    <button className='bg-gray-300 p-3 rounded-xl text-sm font-medium'>
                        <Link to='/signup'>Admission Form</Link>
                    </button>

                    <button className='hover:bg-gray-300 p-3 rounded-xl text-sm'>
                        <Link to='/login'>Verify Admission</Link>
                    </button>
                </div>
                <h1 className='text-4xl my-8 text-center font-bold'>Admission Form</h1>
                <form onSubmit={handleSubmit(signupUserWithFirebase)} className='py-10 px-20 w-full flex flex-col justify-center'>
                    <div className='w-full flex flex-wrap justify-between'>
                        <div className='w-[48%] flex flex-col'>
                            <label>Full Name:</label>
                            <input className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' type="text" placeholder='Full Name' {...register("fullName", { required: true })} />
                            <br />
                            {errors.fullName && <span className='text-red-600 font-md'>This field is required</span>}
                        </div>
                        <div className='w-[48%] flex flex-col'>
                            <label>Father Name:</label>
                            <input className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' type="text" placeholder='Father Name' {...register("fatherName", { required: true })} />
                            <br />
                            {errors.fatherName && <span className='text-red-600 font-md'>This field is required</span>}
                        </div>
                        <div className='w-[48%] flex flex-col'>
                            <label className='mt-8'>Email:</label>
                            <input className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' type="email" placeholder='Email' {...register("email", { required: true })} />
                            <br />
                            {errors.email && <span className='text-red-600 font-md'>This field is required</span>}
                        </div>
                        <div className='w-[48%] flex flex-col'>
                            <label className='mt-8'>Phone Number:</label>
                            <input className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' type="text" placeholder='Phone Number'  {...register("phoneNumber", { required: true })} />
                            <br />
                            {errors.phoneNumber && <span className='text-red-600 font-md'>This field is required</span>}
                        </div>
                        <div className='w-[48%] flex flex-col'>
                            <label className='mt-8'>National ID (CNIC):</label>
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

                        <div className='w-[48%] flex flex-col'>
                            <label className='mt-8'>Date of Birth:</label>
                            <input className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' type="date"  {...register("DOB", { required: true })} />
                            <br />
                            {errors.DOB && <span className='text-red-600 font-md'>This field is required</span>}
                        </div>
                        <div className='w-[48%] flex flex-col'>
                            <label className='mt-8'>Gender:</label>
                            <select className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' {...register("gender")}>
                                <option value="female">Male</option>
                                <option value="male">Female</option>
                            </select>
                            <br />
                            {errors.gender && <span className='text-red-600 font-md'>This field is required</span>}
                        </div>
                        <div className='w-[48%] flex flex-col'>
                            <label className='mt-8'>Do you have a Laptop?</label>
                            <select className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' {...register("laptop")}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <br />
                            {errors.laptop && <span className='text-red-600 font-md'>This field is required</span>}
                        </div>
                    </div>
                    <div className='w-full flex flex-col'>
                        <label className='mt-8'>Address</label>
                        <input className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' type="text" placeholder='Address' {...register("address", { required: true })} />
                        <br />
                        {errors.address && <span className='text-red-600 font-md'>This field is required</span>}
                    </div>
                    <div className='w-full flex flex-col'>
                        <label className='mt-2'>last Qualification</label>
                        <select className='mt-2 outline-none border-2 border-gray-300 w-full rounded-lg p-3' {...register("qualification")}>
                            <option value="matric">Matric</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="bachelors">Bachelors</option>
                            <option value="masters">Masters</option>
                        </select>
                        <br />
                        {errors.qualification && <span className='text-red-600 font-md'>This field is required</span>}
                    </div>
                    <div className='w-full flex flex-col'>
                        <label className='mt-2'>Profile Image</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"  // File type restriction
                            className="file-input file-input-bordered w-full mt-2"
                            {...register("image", {
                                required: "Please upload your recent passport size picture",
                                validate: {
                                    acceptedFormats: (files) =>
                                        files[0] && ['image/jpeg', 'image/jpg', 'image/png'].includes(files[0]?.type) || "Only JPG, JPEG, and PNG files are allowed",
                                }
                            })} />
                        <div className='mt-5 text-md font-medium text-black'>
                            <p>• Upload your recent passport size picture</p>
                            <p>• Your face should be clearly visible without any glasses</p>
                            <p>• Allowed file types: JPG, JPEG, PNG</p>
                        </div>
                        <br />
                        {errors.image && <span className='text-red-600 font-md'>{errors.image.message}</span>}
                    </div>
                    <button className='py-2 px-4 bg-indigo-700 text-md font-medium text-white rounded-2xl' type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup