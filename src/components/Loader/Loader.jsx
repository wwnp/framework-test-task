import React from 'react'
import './style.Loader.css'

const Loader = ({ color = 'forDark' }) => {
  return (
    <div className='Loader'>
      <div className={`lds-default loader-${color}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div >
  )
}
export default Loader