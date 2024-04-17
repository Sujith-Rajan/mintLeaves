"use client"
import Image from "next/image";
import React, {useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { updateProduct } from "@/app/lib/actions/admin/productUpdate";
import { useRouter } from "next/navigation";



interface SingleProductUpdateProps {
  product: {
    id:string
    title: string
    price: number
    stock: number
    desc?: string
    image: string
    category: string
    subCategory?: string
    quantityType: string
  }
}
interface IFormInputs {
  id:string
  title: string
  category: string
  price: number
  stock: number
  subCategory?: string
  quantityType: string
  desc?: string
  image: string
}


const SingleProductUpdate: React.FC<SingleProductUpdateProps> = ({ product }) => {

  const router = useRouter()

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<IFormInputs>();

  if (product) {
    setValue("title", product.title);
    setValue("category", product.category);
    setValue("price", product.price);
    setValue("stock", product.stock);
    setValue("subCategory", product.subCategory || "");
    setValue("quantityType", product.quantityType);
    setValue("desc", product.desc || "");
    setValue("image", product.image);
    setValue("id",product.id)
  }





  const handleSuccess = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    setUploadedImage(uploadedUrl);
    setValue('image', uploadedUrl);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try{
         const res = await updateProduct(data)
         if(res) router.push("/dashboard/products")
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div className='bg-blue-950 bg-opacity-75 mt-4 rounded-md p-2'>
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4'>
        <div>
        <input
          type="hidden"
         defaultValue={product?.id}
         {...register('id')}
        />
        </div>
        <div className="felx felx-col w-full">
          <label htmlFor="title">Product</label>
          <input type="text" placeholder='Title'
            defaultValue={product?.title}
            {...register('title', {
              required: true, minLength: {
                value: 2,
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
          <label htmlFor="category">Category</label>
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
          <label htmlFor="price">Price</label>
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
          <label htmlFor="number">Stock</label>
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
          <label htmlFor="subCategory">Sub Category</label>
          <input type="text" placeholder="Sub Category"
            {...register('subCategory', { required: false })}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full" />
          <div className="text-yellow-300 text-sm">
            {errors.subCategory && 'Please Select Sub-Category*'}
          </div>
        </div>

        <div className="felx felx-col w-full">
          <label htmlFor="quantityType">Quantity Type</label>
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
          <label htmlFor="desc">Description</label>
          <textarea id="desc" rows={5} placeholder="description"
            {...register('desc')}
            className="bg-slate-900 p-4 rounded-md text-white outline-none w-full"></textarea>
          <div className="text-yellow-300 text-sm">
            {errors.desc && 'Please Select Appropiate Category*'}
          </div>
        </div>




        <div className="relative p-4 flex flex-col gap-4">
          <>
          {uploadedImage ? (
            <Image
              src={uploadedImage}
              alt="product uploaded image"
              width={100}
              height={100}
              className="bg-gray-200 rounded-md"
            />
          ) : (
            <Image
              src={product.image}
              alt="product image"
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
            {...register('image')}
          />
         
        </div>

        <button type="submit" className="bg-teal-500 p-2 rounded-md w-full h-14">
          Update
        </button>
      </form>
    </div>
  );
};

export default SingleProductUpdate;

