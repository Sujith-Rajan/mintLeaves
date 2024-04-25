"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Search from '@/app/component/dashboard/Search';
import Pagination from '@/app/component/dashboard/Pagination';
import { useRouter } from 'next/navigation';
import apiRequest from '@/app/lib/apiRequest';

interface SearchParams {
  q?: string;
  page?: number;
}

interface User {
  
  id: string;       
  fullname: string; 
  email: string;      
  phone: string;      
  avatar?: string;  
  role: string;    
  zipCode?:string;
  
}

const Users =  ({ searchParams }: { searchParams: SearchParams }) => {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = searchParams?.q || '';
      const page = searchParams?.page || 1;
      
      try{
          const queryParams = {
              params: {
                q,
                page,
              },
            };
          const res = await apiRequest.get("/admin-dashboard/user",queryParams)
          const{count , users} = res.data
          setUsers(users);
          setCount(count);
      }
      catch(err){
          console.log(err)
          throw new Error("Failed to fetch products!"+ err)     
      }
    
    };
    fetchData();
  }, [searchParams]);


  const handleDelete = async (id: string) => {
    try {
      const res = await apiRequest.delete(`/admin-dashboard/user/${id}`)
       const user = res.data
      router.push("/dashboard/users")
      setUsers((prevUsers) => prevUsers.filter((user) =>user.id !== id));

    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };



  return (
    <div className="bg-blue-950 bg-opacity-75 mt-4 rounded-md p-4">
      <div className="flex justify-between">
        <Search placeholder="Search for a product..." />
      
      </div>
      <table className="w-full">
        <thead>
          <tr className='font-bold border-b-2'>
            <td>{}</td>
            <td>User</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Zip Code</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id} className='text-sm '>
              <td className='py-2'>
                <div className="flex capitalize  overflow-hidden items-center">
                  <Image src={user?.avatar || ''} alt="user image" width={50} height={50} className="" />
                 
                </div>
              </td>
              <td>
              {user.fullname}
              </td>
              <td className='overflow-hidden'>{user.email}</td>
              <td className='h-12 overflow-hidden'>{user.phone}</td>
              <td>{user.zipCode}</td>
              <td>{user.role}</td>
              <td>{""}</td>
              <td>
                <div className="flex gap-2">
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className="bg-blue-400 px-2 py-1 rounded">View</button>
                  </Link>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete(user.id);
                  }}>
                    <input type="hidden" name='id' value={user.id} />
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

export default Users;

