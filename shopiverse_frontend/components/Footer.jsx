import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import { FaRegCopyright } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='footer-container'>
      <p>
        <FaRegCopyright /> {new Date().getFullYear()} Shopiverse. All rights
        reserved.
      </p>
      <p className='icons'>
        <AiFillFacebook />
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillLinkedin />
      </p>
    </div>
  );
}


