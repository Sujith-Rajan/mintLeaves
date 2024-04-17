import React from 'react'

const UserAddress = () => {
  return (
    <div className='w-full p-4 flex flex-col gap-4'>
      <h2 className='text-gray-800 text-xl'>My Addresses</h2>
      <div className='flex flex-col gap-4'>

        <div>
        <label htmlFor="address" className='text-gray-500 text-sm'>New Address * (Add your new delivery address here. You can select one of these address on checkout)</label>
        <textarea name="address" id="" rows={4} className='outline-none border-2 w-full'></textarea>
        </div>

       

      </div>
      <button className='bg-teal-600 hover:bg-teal-700 text-white p-2 mt-4'>Save Changes</button>
    </div>
  )
}

export default UserAddress
