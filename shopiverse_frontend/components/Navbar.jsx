import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'><FaHome /></Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart((prevShowCart) => !prevShowCart)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}
