import React from 'react'
import CreateTask from './Components/CreateTask'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
  return (
    <>
    <Navbar/>
    <div className='pt-[11vh] px-4'>
  <h1 className='text-center font-bold font-serif mb-4 text-3xl tracking-wide'>
    📝 Task Manager
  </h1>

  <div className='w-full max-w-5xl mx-auto bg-gray-900 px-6 py-6 rounded-2xl shadow-2xl border border-purple-300'>
    <CreateTask />
  </div>
</div>

      <Footer />
    </>
  )
}

export default App
