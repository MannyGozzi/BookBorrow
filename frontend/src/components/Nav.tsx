import React from 'react'
import logo from '../assets/BooBo_logo.png'
import icon_user_account from '../assets/icon_user_account.png'
const Nav = () => {
  return (
    <nav className='flex justify-between h-20 w-3/4 content-center items-center mb-4'>
        <div className='flex content-center'>
            <img src={logo} className='h-20'/>
            <span className='theme-header self-center'>BooBo</span>
        </div>

        <div>
            <img src={icon_user_account} className='h-16'/>
        </div>
    </nav>
  )
}

export default Nav