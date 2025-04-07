import React, { useEffect, useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";

function ListDisplay({ filteredTask, deleteFunction, editTask }) {
    const [firstList, setFirstList] = useState(0);
    const showFiveList = 5;
    const endList = firstList + showFiveList;

    const totalTask = filteredTask.length;
    const totalPage = Math.ceil(totalTask / showFiveList);
    const currentPage = Math.floor(firstList / showFiveList);

    // Track completion stats
    let completedTask = 0;
    let completePercentage = 0;
    let pendingPercentage = 0;

    if (totalTask > 0) {
        completedTask = filteredTask.filter(
            task => task?.status?.toLowerCase() === "completed"
        ).length;

        completePercentage = ((completedTask / totalTask) * 100).toFixed(2);
        pendingPercentage = (100 - completePercentage).toFixed(2);
    }

    useEffect(() => {
        setFirstList(0);
    }, [filteredTask]);

    const handlePrevTask = () => {
        if (firstList > 0) {
            setFirstList(firstList - showFiveList);
        }
    };

    const handleNextTask = () => {
        if (endList < filteredTask.length) {
            setFirstList(firstList + showFiveList);
        }
    };

    return (
        <div className="px-4">
            <h1 className='font-semibold text-center text-3xl mt-8 font-serif text-white'>Your Tasks</h1>
            <hr className='border-t-2 border-purple-300 my-4' />

            <div className='flex flex-col lg:flex-row justify-between gap-6'>
                {/* Task Cards */}
                <div className='w-full lg:w-[70%]'>
                    {filteredTask.map((task, index) => {
                        if (index >= firstList && index < endList) {
                            return (
                                <div key={index} className='bg-purple-100 w-full rounded-2xl shadow-xl px-6 py-4 mb-6'>
                                    <div className='font-semibold font-serif flex justify-between mb-3'>
                                        <h1 className=' px-4 py-2 rounded-md bg-purple-200'>Title: {task.title}</h1>
                                        <h1 className=' px-4 py-2 rounded-md bg-purple-200'>Date: {task.date}</h1>
                                    </div>

                                    <div className='font-semibold font-serif rounded-md px-4 py-3 mb-3 bg-purple-200 break-words'>
                                        <h1>Description: {task.description}</h1>
                                    </div>

                                    <div className='font-semibold font-serif flex justify-between mb-3'>
                                        <h1 className='px-4 py-2 rounded-md bg-purple-200'>Priority: {task.priority}</h1>
                                        <h1 className='px-4 py-2 rounded-md bg-purple-200'>Status: {task.status}</h1>
                                    </div>

                                    <div className='flex justify-center gap-4'>
                                        <button
                                            onClick={() => deleteFunction(index)}
                                            className='px-4 py-2 bg-purple-400 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-purple-500 active:bg-orange-100 text-sm'
                                        >
                                            <MdDelete size={20} /> Delete
                                        </button>
                                        <button
                                            onClick={() => editTask(index)}
                                            className='px-4 py-2 bg-purple-400 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-purple-500 active:bg-orange-100 text-sm'
                                        >
                                            <MdEdit size={20} /> Edit
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                {/* Sidebar - Progress Tracker */}
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

            {/* Pagination Controls */}
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
    );
}

export default ListDisplay;
