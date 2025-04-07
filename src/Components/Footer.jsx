import React from 'react';

function Footer() {
  return (
    <footer className='w-full bg-gray-900 h-[10vh] mt-10 shadow-xl flex items-center justify-center px-4'>
      <p className='text-center text-sm md:text-base text-gray-300 tracking-wide font-bold'>
        © 2025 <span className='text-purple-300 font-semibold'>TaskNest</span> by Nikhil — All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
