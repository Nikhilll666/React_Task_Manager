import React from 'react'

function Navbar() {
  return (
    <div className='w-full bg-gray-900 px-[2%] h-[10vh] mb-[30px] shadow-xl fixed flex items-center justify-center'>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center'>
            <img 
              className='w-full h-full object-cover' 
              src="https://media.licdn.com/dms/image/v2/C560BAQH_Jfejs4medw/company-logo_200_200/company-logo_200_200/0/1669871888837/hyperverge_academy_logo?e=2147483647&v=beta&t=xFnN0qCxXexxxGnDmYvVLoFPSaLTYukeknHB7I-Ac1M" 
              alt="Logo"
            />
        </div>
        <div>
            <h1 className='font-bold text-md text-white ml-8'>Hyperverge Academy Mini Hackathon 3.1</h1>
        </div>
    </div>
  )
}

export default Navbar

