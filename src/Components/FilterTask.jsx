import React, { useEffect, useState } from 'react'
import ListDisplay from './ListDisplay';
import { IoFilter } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';

function FilterTask({ tasks, onDelete, onEdit }) {
    console.log("this is task", tasks);
    const [priority, setPriority] = useState("all")
    const [status, setStatus] = useState("all")
    const [filteredTask, setFilteredTask] = useState([])

    useEffect(() => {
        setFilteredTask(tasks)
    }, [tasks])

    function handleFilteredTask() {
        const filterTaskArr = []
        if (tasks) {
            tasks.forEach((el) => {
                if ((priority === "all" || priority.toLowerCase() === el.priority.toLowerCase()) && (status === "all" || el.status.toLowerCase() === status)) {
                    filterTaskArr.push(el)
                    console.log(filterTaskArr);
                }
            })

            if (filterTaskArr.length === 0) {
                alert("no data is here....")
                toast.success('Task Fitered Successfully...')
            }
           

            setFilteredTask(filterTaskArr)
            console.log("this is filtered", filterTaskArr);

        }
    }






    return (
        <>
            {/* <h1 className='font-serif font-bold text-center text-2xl m-8'>Filter Tasks</h1> */}
            <div className='rounded-xl shadow-xl bg-purple-100 p-4 mt-8 flex flex-wrap items-center justify-between gap-4'>

  <div className='flex items-center gap-2 w-full md:w-auto'>
    <label className='font-serif font-bold' htmlFor="priority">Priority:</label>
    <select
      value={priority}
      onChange={(el) => setPriority(el.target.value)}
      className="min-w-[140px] py-2 px-3 bg-purple-500 text-white hover:bg-purple-600 rounded-lg"
    >
      <option value="all">All</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

            <div className='flex items-center gap-2 w-full md:w-auto'>
                <label className='font-serif font-bold' htmlFor="status">Status:</label>
                <select
                value={status}
                onChange={(el) => setStatus(el.target.value)}
                className="min-w-[140px] py-2 px-3 bg-purple-500 text-white hover:bg-purple-600 rounded-lg"
                >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In-Progress</option>
                <option value="completed">Completed</option>
                </select>
            </div>

            <button
                onClick={() => handleFilteredTask(tasks)}
                className='py-2 px-4 bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700 rounded-lg flex items-center gap-2'
            >
                <IoFilter size={20} /> <span>Apply Filter</span>
            </button>

            </div>

            <ListDisplay filteredTask={filteredTask} deleteFunction={onDelete} editTask={onEdit} />
            <ToastContainer />

        </>
    )
}

export default FilterTask
