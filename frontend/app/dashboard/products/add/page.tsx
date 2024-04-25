"use client"
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import apiRequest from "@/app/lib/apiRequest";

interface IFormInputs {
  title: string
  category: string
  price: number
  stock: number
  subCategory?: string
  quantityType: string
  desc?: string
  image: string
}


const AddProduct = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<IFormInputs>();


  const handleSuccess = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    setUploadedImage(uploadedUrl);
    setValue('image', uploadedUrl);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const res = await apiRequest.post('/admin-dashboard/product',data)
    const product = res.data
    
    }
    catch (error) {
      console.log("server action add-product", error)
    }
  }


  return (
    <div className='bg-blue-950 bg-opacity-75 mt-4 rounded-md p-2'>
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-2'>

        <div className="felx felx-col w-full">
          <input type="text" placeholder="title"
            {...register('title', {
              required: true, minLength: {
                value:2,
                message: 'Pleas Enter Valid title'
              },
              
            })}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
          <div className="text-yellow-300 text-sm">
            {errors.title &&
              <p>{errors.title.message ? `${errors.title.message}` : "Please Enter Product Name *"}</p>
            }
          </div>
        </div>

        <div className="felx felx-col w-full">
          <select id="category"
            {...register('category', {
              required: true,
              validate: {
                notEmpty: value => value !== "Choose a Category" || "Please select an appropriate category",
              }
            })}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full">
            <option  >Choose a Category</option>
            <option >Vegetables</option>
            <option >Fruits</option>
            <option >Bakery</option>
            <option >Groceries</option>
            <option >Beverages</option>
            <option >Households</option>
            <option >Personalcare</option>
          </select>
          <div className="text-yellow-300 text-sm">
            {errors.category && 'Please Select Appropiate Category*'}
          </div>
        </div>

        <div className="felx felx-col w-full">
          <input type="number" placeholder="price"
            {...register('price', {
              required: true, min: {
                value: 10,
                message: 'Minimum Price 10'
              }
            })}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
          <div className="text-yellow-300 text-sm">
            {errors.price &&
              <p>{errors.price.message ? `${errors.price.message}` : 'Please Enter Price of Product*'}</p>
            }
          </div>
        </div>

        <div className="felx felx-col w-full">
          <input type="number" placeholder="stock"
            {...register('stock', {
              required: true, max: {
                value: 100,
                message: 'Stock should be maximum 100'
              }, min: {
                value: 0,
                message: 'Negative value will not take'
              }
            })}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
          <div className="text-yellow-300 text-sm">
            {errors.stock &&
              <p>{errors.stock.message ? `${errors.stock.message}` : "Please Enter Stock*"}</p>}
          </div>
        </div>

        <div className="felx felx-col w-full">
          <input type="text" placeholder="Sub Category"
            {...register('subCategory', { required: false })}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
          <div className="text-yellow-300 text-sm">
            {errors.subCategory && 'Please Select Sub-Category*'}
          </div>
        </div>

        <div className="felx felx-col w-full">
          <select id="quantityType"
            {...register('quantityType', {
              required: true, validate: {
                notEmpty: value => value !== "Quantity" || "Please select Quantity",
              }
            })}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full">
            <option >Quantity</option>
            <option >Number</option>
            <option >Kg</option>
          </select>
          <div className="text-yellow-300 text-sm">
            {errors.quantityType && 'Please Select Quantity*'}
          </div>
        </div>

        <div className="felx felx-col w-full">
          <textarea id="desc" rows={5} placeholder="description"
            {...register('desc')}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full"></textarea>
          <div className="text-yellow-300 text-sm">
            {errors.desc && 'Please Select Appropiate Category*'}
          </div>
        </div>



        <div className="relative p-4 flex flex-col gap-4">

          <>
            <Image src={uploadedImage ? `${uploadedImage}` : "/logo/no_image.jpg"} alt="product uplod image" width={100} height={100}
              className="bg-gray-200 rounded-md"></Image>
            <div>
              <CldUploadButton
                options={{ multiple: false }}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                onSuccess={handleSuccess}
              >
                <span className="text-teal-500 mt-8">
                  Upload Image
                </span>
              </CldUploadButton>
            </div>
          </>

          <input
            type="text"
            value={uploadedImage || ""}
            className="opacity-0"
            {...register('image', {
              required: true,
              validate: {
                notEmpty: (value) => value.trim() !== "" || "Please choose image"
              }
            })}
          />
          {errors.image && (
            <p className="text-yellow-300">{errors.image.message || "Please choose image"}</p>
          )}

        </div>

        <button type="submit" className="bg-teal-500 p-2 rounded-md w-full h-14">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
