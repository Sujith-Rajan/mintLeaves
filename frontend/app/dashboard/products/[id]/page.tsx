import SingleProductUpdate from '@/app/component/dashboard/SingleProductUpdate'
import { getProduct } from '@/app/lib/actions/admin/productGet'

import React from 'react'

interface UpdateProductProps{
  params:{id:string}
}

const UpdateProduct = async({params}:UpdateProductProps) => {
  const {id} = params
  const product = await getProduct(id)

  return (
    <div>
      <SingleProductUpdate product={product}/>
    </div>
  )
}

export default UpdateProduct
