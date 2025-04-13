import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({fullName, height, width, style}) => {
  return (
    <div 
    className={`${width || 'width-12'} ${height || 'h-12'} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 text-3xl`}
    >
        {getInitials(fullName || "")}
    
    </div>
  )
}

export default CharAvatar