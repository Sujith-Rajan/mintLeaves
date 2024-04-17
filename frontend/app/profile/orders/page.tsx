import React from 'react'

const Orders = () => {
  return (
    <div className='w-full p-4 flex flex-col gap-4'>
    <h2 className='text-gray-800 text-xl'>Order List</h2>
    <div className='w-full'>
      <table className='border-2 w-full'>
        <thead>
        <tr className=' text-gray-500 text-sm border-b-2 text-center'>
          <th >Order #</th>
          <th>Date Purchased</th>
          <th>Status</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody >
          <tr className='text-gray-400 text-xs text-center'>
            <td>#445458</td>
            <td>Mar 13,2024</td>
            <td>cancelled</td>
            <td>340</td>
            <td>View </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
  )
}

export default Orders
