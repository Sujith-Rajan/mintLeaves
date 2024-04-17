import React from 'react'

const page = () => {
  return (
    <div className='p-2 flex gap-4'>
        <div className='p-4 flex flex-col justify-center border-2 shadow-md rounded-lg gap-4'>
          <h3 className='text-3xl text-gray-700 font-bold'>Orders</h3>
          <div>
            <h4 className='text-gray-600'>Total Orders: 300</h4>
          </div>
        </div>
        <div className='p-4 flex flex-col justify-center border-2 shadow-md rounded-lg gap-4'>
          <h3 className='text-3xl text-gray-700 font-bold'>Transactions</h3>
          <div>
            <h4 className='text-gray-600'>Total transaction: 300</h4>
          </div>
        </div>

        <div className='p-4 flex flex-col justify-center border-2 shadow-md rounded-lg gap-4'>
          <h3 className='text-3xl text-gray-700 font-bold'>Refund</h3>
          <div>
            <h4 className='text-gray-600'>Total refund: 300</h4>
          </div>
        </div>
        <div className='p-4 flex flex-col justify-center border-2 shadow-md rounded-lg gap-4'>
          <h3 className='text-3xl text-gray-700 font-bold'>Cashbacks</h3>
          <div>
            <h4 className='text-gray-600'>Total cashbacks: 300</h4>
          </div>
        </div>
    </div>
  )
}

export default page
