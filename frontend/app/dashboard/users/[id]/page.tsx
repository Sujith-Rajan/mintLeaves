import SingleUserUpdate from '@/app/component/dashboard/SingleUserUpdate'
import { getUser } from '@/app/lib/actions/admin/userGet'
import React from 'react'

interface UpdateUserProps{
  params:{id:string}
}

const UpdateUser = async({params}:UpdateUserProps) => {
  const {id} = params
  const user = await getUser(id)

  return (
    <div>
      <SingleUserUpdate user={user}/>
    </div>
  )
}

export default UpdateUser