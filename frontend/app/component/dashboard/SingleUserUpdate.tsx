"use client"
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { updateProduct } from "@/app/lib/actions/admin/productUpdate";
import { useRouter } from "next/navigation";



interface SingleProductUpdateProps {
    user: {
        id: string;
        fullname: string;
        email: string;
        phone: string;
        avatar?: string;
        role: string;
        zipCode?: string;
        address?: string
        state?:string
        city?:string
    }
}
interface IFormInputs {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatar?: string;
    role: string;
    zipCode?: string;
    address?: string
    state?:string;
    city?:string;
}


const SingleUserUpdate: React.FC<SingleProductUpdateProps> = ({ user }) => {

    const router = useRouter()

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<IFormInputs>();

    if (user) {
        setValue("fullname", user.fullname);
        setValue("email", user.email);
        setValue("phone", user.phone);
        setValue("role", user.role);
        setValue("address", user.address || "");
        setValue("state", user.state);
        setValue("city", user.city);
        setValue("avatar",user.avatar);
        setValue("id", user.id)
    }





    const handleSuccess = (result: any) => {
        const uploadedUrl = result.info.secure_url;
        setUploadedImage(uploadedUrl);
        setValue('avatar', uploadedUrl);
    };

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            const res = await updateProduct(data)
            if (res) router.push("/dashboard/users")
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='bg-blue-950 bg-opacity-75 mt-4 rounded-md p-2'>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4'>
                <div>
                    <input
                        type="hidden"
                        defaultValue={user?.id}
                        {...register('id')}
                    />
                </div>
                <div className="felx felx-col w-full">
                    <label htmlFor="title">Full Name</label>
                    <input type="text" placeholder='Title'
                        defaultValue={user.fullname}
                        {...register('fullname', {
                            required: 'Full Name is required',
                            minLength: {
                              value: 3,
                              message: 'Name should be at least three letters',
                            },
                            pattern: {
                              value: /^[a-zA-Z\s]+$/,
                              message: 'Full Name should contain only letters',
                            },
                          })}
                        className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
                    <div className="text-yellow-300 text-sm">
                    {errors.fullname && <p>{errors.fullname.message}</p>}
                    </div>
                </div>
                   
              

                <div className="felx felx-col w-full">
                <label htmlFor="email" >Email*</label>
                <input
                  type="text"
                  placeholder="Email Id"
                  defaultValue={user.email}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className="bg-slate-900 p-4 rounded-md text-white outline-none w-full"
                />
                <div className="text-red-400 text-sm">
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                </div>

                <div className="felx felx-col w-full">
                <label htmlFor="phone" >Phone*</label>
                <input
                  type="tel"
                  placeholder="Enter 10 digit mobile number"
                  defaultValue={user.phone}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number',
                    },
                  })}
                  className="bg-slate-900 p-4 rounded-md text-white outline-none w-full"
                />
                <div className="text-red-400 text-sm">
                  {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                </div>

            {/* STATE */}
                <div className="felx felx-col w-full">
                    <label htmlFor="state">State</label>
                    <input type="text" placeholder="Kerala"
                    defaultValue="Kerala"
                    readOnly
                    className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
                </div>

            {/* CITY */}
                <div className="felx felx-col w-full">
                    <label htmlFor="city">CITY</label>
                    <input type="text" placeholder="city"
                    defaultValue={user.city}
                        {...register('city', { required: true })}
                        className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
                    <div className="text-yellow-300 text-sm">
                        {errors.city && 'Please Select City*'}
                    </div>
                </div>


            {/* ROLE */}
                <div className="felx felx-col w-full">
                    <label htmlFor="role">Role</label>
                    <select id="role"
                    defaultValue={user.role}
                        {...register('role', {
                            required: true, 
                        })}
                        className="bg-slate-900 p-4 rounded-md text-white outline-none w-full">
                        <option >ADMIN</option>
                        <option >USER</option>
                    </select>
                    <div className="text-yellow-300 text-sm">
                        {errors.role && 'Please Select Role*'}
                    </div>
                </div>


            {/* ADDRESS */}
                <div className="felx felx-col w-full">
                    <label htmlFor="address">Address</label>
                    <textarea id="address" rows={5} placeholder="address"
                        {...register('address')}
                        className="bg-slate-900 p-4 rounded-md text-white outline-none w-full"></textarea>
                    <div className="text-yellow-300 text-sm">
                        {errors.address && 'Please Enter Address*'}
                    </div>
                </div>


            {/* IMAGE */}
                  <div className="relative p-4 flex flex-col gap-4">
                    <>
                        {uploadedImage ? (
                            <Image
                                src={uploadedImage}
                                alt="user uploaded image"
                                width={100}
                                height={100}
                                className="bg-gray-200 rounded-md"
                            />
                        ) : (
                            <Image
                                src={user.avatar || ''}
                                alt="user image"
                                width={100}
                                height={100}
                                className="bg-gray-200 rounded-md"
                            />
                        )}
                        <div>
                            <CldUploadButton
                                options={{ multiple: false }}
                                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                                onSuccess={handleSuccess}
                            >
                                <span className="text-teal-500 mt-8">
                                    Change Image
                                </span>
                            </CldUploadButton>
                        </div>
                    </>

                    <input
                        type="text"
                        value={uploadedImage || ""}
                        className="opacity-0"
                        {...register('avatar')}
                    />

                </div>

                <button type="submit" className="bg-teal-500 p-2 rounded-md w-full h-14">
                    Update
                </button>
            </form>
        </div>
    );
};

export default SingleUserUpdate;

