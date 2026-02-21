import WorkspaceMenu from '@/components/ui/workspace-menu'
import React from 'react'

const ClientNavbar = () => {
  return (
    <div className='bg-black px-2 flex items-center  border-b h-10'>
        <WorkspaceMenu/>
    </div>
  )
}

export default ClientNavbar