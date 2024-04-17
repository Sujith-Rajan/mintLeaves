
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Search from '@/app/component/dashboard/Search';
import { getProducts } from '@/app/lib/actions/admin/productsGet';
import Pagination from '@/app/component/dashboard/Pagination';
import { deleteProduct } from '@/app/lib/actions/admin/productDelete';

interface SearchParams {
  q?: string;
  page?: number;
}

const Products =  ({ searchParams }: { searchParams: SearchParams }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = searchParams?.q || '';
      const page = searchParams?.page || 1;
      const { count, products } = await getProducts(q, page);
      setProducts(products);
      setCount(count);
    };
    fetchData();
  }, [searchParams]);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
     
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="bg-blue-950 bg-opacity-75 mt-4 rounded-md p-4">
      <div className="flex justify-between">
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className="bg-violet-500 rounded-md p-2">Add New</button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr className='font-bold border-b-2'>
            <td>Title</td>
            <td>Category</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: any) => (
            <tr key={product.id} className='text-sm'>
              <td className='py-2'>
                <div className="flex gap-2 capitalize w-80 overflow-hidden items-center">
                  <Image src={product?.image} alt="products image in table" width={50} height={50} className="" />
                  {product.title}
                </div>
              </td>
              <td className='w-40 overflow-hidden'>{product.category}</td>
              <td className='w-40 h-12 overflow-hidden'>{product.desc}</td>
              <td>Rs.{product.price}</td>
              <td>{product.createdAt.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>
              <td>
                <div className="flex gap-2">
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className="bg-blue-400 px-2 py-1 rounded">View</button>
                  </Link>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete(product.id);
                  }}>
                    <input type="hidden" name='id' value={product.id} />
                    <button className="bg-red-400 px-2 py-1 rounded">Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default Products;

