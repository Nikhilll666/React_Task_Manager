import React, { useEffect, useState } from 'react'
import FilterTask from './FilterTask'
import { MdEdit, MdDelete } from "react-icons/md";
function ListDisplay({ filteredTask, deleteFunction, editTask }) {
    const [firstList, setFirstList] = useState(0)
    // const [paginatedList, setPaginatedList] = useState(filteredTask)

    const showFiveList = 5
    const endList = firstList + showFiveList

    let totalTask = filteredTask.length
    console.log(totalTask, "this is total task");
    let quotient
    let totalPage
    if (totalTask % showFiveList === 0) {
        quotient = totalTask / showFiveList
        totalPage = Math.floor(quotient)
    } else {
        quotient = totalTask / showFiveList
        totalPage = Math.floor(quotient) + 1
    }

    let currentPage = Math.floor(firstList / showFiveList)
    let completedTask = 0
    let completePercentage
    let pendingPercentage

    if (totalTask > 0) {
        for (let i = 0; i < FilterTask.length; i++) {
            if (FilterTask[i].status.toLowerCase() === "completed") {
                completedTask += 1
            }
        }
        completePercentage = ((completedTask / totalTask) * 100).toFixed(2)
        pendingPercentage = (100 - completePercentage).toFixed(2)

    }


    useEffect(() => {
        // Reset firstList to 0 when filtered tasks change
        setFirstList(0);
    }, [FilterTask]);
    // if (filteredTask.length > 0) {
    //     setFirstList(0)
    // }

    function handlePrevTask() {
        // alert("previous value.....")

        if (firstList > 0) {
            setFirstList(firstList - showFiveList)
        }
    }
    function handleNextTask() {
        // alert("next taskk.....")
        if (endList < filteredTask.length) {
            setFirstList(firstList + showFiveList)
        }
    }




    return (
        <div className="px-4">
  <h1 className='font-semibold text-center text-3xl mt-8 font-serif text-white'>Your Tasks</h1>
  <hr className='border-t-2 border-purple-300 my-4' />

  <div className='flex flex-col lg:flex-row justify-between gap-6'>

    <div className='w-full lg:w-[70%]'>
      {filteredTask.map((el, ind) => {
        if (ind >= firstList && ind < endList) {
          return (
            <div key={ind} className='bg-purple-100 w-full rounded-2xl shadow-xl px-6 py-4 mb-6'>
              <div className='font-semibold font-serif flex justify-between mb-3'>
                <h1 className='bg-orange-100 px-4 py-2 rounded-md hover:bg-purple-200'>Title: {el.title}</h1>
                <h1 className='bg-orange-100 px-4 py-2 rounded-md hover:bg-purple-200'>Date: {el.date}</h1>
              </div>

              <div className='font-semibold font-serif bg-orange-100 rounded-md px-4 py-3 mb-3 hover:bg-purple-200 break-words'>
                <h1>Description: {el.description}</h1>
              </div>

              <div className='font-semibold font-serif flex justify-between mb-3'>
                <h1 className='bg-orange-100 px-4 py-2 rounded-md hover:bg-purple-200'>Priority: {el.priority}</h1>
                <h1 className='bg-orange-100 px-4 py-2 rounded-md hover:bg-purple-200'>Status: {el.status}</h1>
              </div>

              <div className='flex justify-center gap-4'>
                <button
                  onClick={() => deleteFunction(ind)}
                  className='px-4 py-2 bg-purple-400 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-purple-500 active:bg-orange-100 text-sm'
                >
                  <MdDelete size={20} /> Delete
                </button>
                <button
                  onClick={() => editTask(ind)}
                  className='px-4 py-2 bg-purple-400 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-purple-500 active:bg-orange-100 text-sm'
                >
                  <MdEdit size={20} /> Edit
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>

    <div className='w-full lg:w-[28%] h-fit bg-[rgb(144,161,185)] rounded-xl shadow-md p-4 sticky top-[12vh]'>
      <h1 className='text-center font-semibold font-serif py-2 bg-purple-100 rounded'>Progress Tracker</h1>
      <div className='text-white mt-4 space-y-3'>
        <h1 className='text-center'><strong>Total Tasks:</strong> {totalTask}</h1>
        <h1 className='text-center font-serif'>Completed Task: {completePercentage}%</h1>
        <h1 className='text-center font-serif'>Pending Task: {pendingPercentage}%</h1>
        <h1 className='text-center font-serif'>In Progress Task: %</h1>
      </div>
    </div>
  </div>

  <hr className='border-t-2 border-purple-300 my-6' />
  <div className='flex justify-center items-center gap-6'>
    <button
      onClick={handlePrevTask}
      disabled={firstList === 0}
      className={`py-2 px-4 rounded-lg font-bold font-serif transition-all duration-200 ${firstList === 0 ? 'bg-slate-400 cursor-not-allowed text-white' : 'bg-black text-white hover:bg-gray-800'}`}
    >
      Previous
    </button>
    <div className='font-serif font-semibold text-white'>
      Page {currentPage + 1}/{totalPage}
    </div>
    <button
      onClick={handleNextTask}
      disabled={endList >= filteredTask.length}
      className={`py-2 px-4 rounded-lg font-bold font-serif transition-all duration-200 ${endList >= filteredTask.length ? 'bg-slate-400 cursor-not-allowed text-white' : 'bg-black text-white hover:bg-gray-800'}`}
    >
      Next
    </button>
  </div>
</div>

    )
}

export default ListDisplay
