import React, { useEffect, useState } from 'react'
import FilterTask from './FilterTask'
import { FaPlus } from 'react-icons/fa';

function CreateTask() {
  const [taskData, setTaskData] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [priority, setPriority] = useState("low")
  const [status, setStatus] = useState("pending")
  const [editTask, setEditTask] = useState(null)

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  function handleDate(e) {
    setDate(e.target.value)
  }

  function handlePriority(e) {
    setPriority(e.target.value)
  }

  function handleStatus(e) {
    setStatus(e.target.value)
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Loaded tasks from localStorage: ", storedTasks);
    setTaskData(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskData));
    console.log("Saving tasks to localStorage: ", taskData);
  }, [taskData]);

  function handleEditTask(index) {
    const editTask = taskData[index]
    setTitle(editTask.title)
    setDescription(editTask.description)
    setDate(editTask.date)
    setPriority(editTask.priority)
    setStatus(editTask.status)
    setEditTask(index)
  }

  function handleTaskData(e) {
    e.preventDefault()
    const createdTask = { title, description, date, priority, status }

    if (editTask !== null) {
      const taskToUpdate = [...taskData]
      taskToUpdate[editTask] = createdTask
      setTaskData(taskToUpdate)
      setEditTask(null)
    } else {
      setTaskData([...taskData, createdTask])
      console.log(createdTask)
    }

    setTitle("")
    setDescription("")
    setDate("")
    setPriority("low")
    setStatus("pending")
  }

  function handleDelete(index) {
    const deletedTask = []
    taskData.forEach((el, ind) => {
      if (ind !== index) {
        deletedTask.push(el)
      }
    })
    setTaskData(deletedTask)
  }

  return (
    <>
      <form 
        onSubmit={handleTaskData}  
        className='flex flex-col rounded-2xl bg-white shadow-2xl bg-cover bg-center p-6 m-auto mt-6 w-[40vw]'
      >
        <div className='flex justify-between items-center mb-4'>
          <div className='w-[30%]'>
            <label className='font-semibold font-serif' htmlFor="title">Task Title:</label>
          </div>
          <div className='w-[68%]'>
            <input required placeholder='Enter Title' value={title} onChange={handleTitle} 
                   className='w-full px-3 py-2 border border-gray-400 rounded-md' type="text" />
          </div>
        </div>

        <div className='flex justify-between items-center mb-4'>
          <div className='w-[30%]'>
            <label className='font-semibold font-serif' htmlFor="description">Task Description:</label>
          </div>
          <div className='w-[68%]'>
            <input required placeholder='Enter description...' value={description} onChange={handleDescription} 
                   className='w-full px-3 py-2 border border-gray-400 rounded-md' type="text" />
          </div>
        </div>

        <div className='flex justify-between items-center mb-4'>
          <div className='w-[30%]'>
            <label className='font-semibold font-serif' htmlFor="date">Enter Date:</label>
          </div>
          <div className='w-[68%]'>
            <input required value={date} onChange={handleDate} 
                   className='w-full px-3 py-2 border border-gray-400 rounded-md' type="date" />
          </div>
        </div>

        <div className='flex justify-between items-center mb-4'>
          <div className='w-[30%]'>
            <label className='font-semibold font-serif' htmlFor="priority">Choose Priority:</label>
          </div>
          <div className='w-[68%]'>
            <select required value={priority} onChange={handlePriority} 
                    className='w-full px-3 py-2 border border-gray-400 rounded-md'>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className='flex justify-between items-center mb-4'>
          <div className='w-[30%]'>
            <label className='font-semibold font-serif' htmlFor="status">Choose Status:</label>
          </div>
          <div className='w-[68%]'>
            <select required value={status} onChange={handleStatus} 
                    className='w-full px-3 py-2 border border-gray-400 rounded-md'>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="inprogress">In-Progress</option>
            </select>
          </div>
        </div>

        <div className='w-full'>
          <button 
            className='w-full rounded-lg bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700 font-bold px-4 py-2 flex gap-2 items-center justify-center'>
            <FaPlus /> {editTask !== null ? "Edit Task" : "Create Task"}
          </button>
        </div>
      </form>

      <FilterTask tasks={taskData} onDelete={handleDelete} onEdit={handleEditTask} />
    </>
  )
}

export default CreateTask
