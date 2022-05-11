import React, { useEffect } from 'react'
import brand from '../../assets/images/brand.png'
import blackSun from '../../assets/images/blackSun.png'
import whiteSun from '../../assets/images/whiteSun.png'
import './style.Header.css'

const Header = ({ changeTheme, theme }) => {
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])
  return (
    <div className='header'>
      <div className='pointer'>
        <img src={brand} width={64} height={64} alt="123" />
      </div>

      <div
        className='pointer'
        onClick={() => changeTheme()}
      >
        <img src={theme === 'dark' ? whiteSun : blackSun} width={20} height={20} alt="sun" />
      </div>
    </div>
  )
}
export default Header