import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';

const Close = ({ color = 'grey', size = '11px', onClick }) => {
  return (
    <IconContext.Provider
      value={{ color, size }}
    >
      <span
        className='pointer'
        onClick={onClick}
      >
        <AiOutlineClose className='Paintings__close'></AiOutlineClose>
      </span>
    </IconContext.Provider>
  )
}
export default Close