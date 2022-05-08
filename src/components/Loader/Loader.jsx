import React from 'react'

const Loader = ({ color = 'forDark' }) => {
  return (
    <div className='Loader'>
      <div className={`lds-default loader-${color}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div >
  )
}
export default Loader