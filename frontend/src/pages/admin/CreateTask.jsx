import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/DashboardLayout"
import { MdDelete } from "react-icons/md"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import SelectedUsers from "../../components/SelectedUsers"
import TodoListInput from "../../components/TodoListInput"
import AddAttachmentsInput from "../../components/AddAttachmentsInput"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment"
import toast from "react-hot-toast"
import Modal from "../../components/Modal"
import DeleteAlert from "../../components/DeleteAlert"

const CreateTask = () => {
  const location = useLocation()
  const { taskId } = location.state || {}

  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const clearData = () => {
    // reset form data
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  // create task
  const createTask = async () => {
    try {
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }))

      const response = await axiosInstance.post("/tasks/create", {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })

      toast.success("Task created successfully!")

      clearData()

      // console.log(response.data)
    } catch (error) {
      console.log("Error creating task: ", error)
      toast.error("Error creating task!")
    }
  }

  // update task
  const updateTask = async () => {
    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || []
        const matchedTask = prevTodoChecklist.find((task) => task.text === item)

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        }
      })

      const response = await axiosInstance.put(`/tasks/${taskId}`, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })

      toast.success("Task updated successfully!")

      console.log(response.data)
    } catch (error) {
      console.log("Error updating task: ", error)
      toast.error("Error updating task!")
    }
  }

  const handleSubmit = async (e) => {
    setError("")

    if (!taskData.title.trim()) {
      setError("Title is required!")
      return
    }

    if (!taskData.description.trim()) {
      setError("Description is required!")
      return
    }

    if (!taskData.dueDate) {
      setError("Due date is required!")
      return
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task is not assigned to any member!")
      return
    }

    if (taskData.todoChecklist?.length === 0) {
      setError("Add atleast one todo task!")
      return
    }

    if (taskId) {
      updateTask()

      return
    }

    createTask()
  }

  // get task info by id
  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`)

      if (response.data) {
        const taskInfo = response.data
        setCurrentTask(taskInfo)

        setTaskData((prevState) => ({
          ...prevState,
          title: taskInfo?.title,
          description: taskInfo?.description,
          priority: taskInfo?.priority,
          dueDate: taskInfo?.dueDate
            ? moment(taskInfo?.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id || []),
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }))
      }
    } catch (error) {
      console.log("Error fetching task details: ", error)
    }
  }

  // delete task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`)

      setOpenDeleteAlert(false)

      toast.success("Task deleted successfully!")

      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error delating task: ", error)
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById(taskId)
    }

    return () => {}
  }, [taskId])

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {taskId ? "Update Task" : "Create New Task"}
            </h2>

            {taskId && (
              <button
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
                onClick={() => setOpenDeleteAlert(true)}
              >
                <MdDelete className="text-lg" /> Delete Task
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={taskData.title}
                  onChange={(e) => handleValueChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={taskData.description}
                  onChange={(e) =>
                    handleValueChange("description", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>

                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={taskData.priority}
                    onChange={(e) =>
                      handleValueChange("priority", e.target.value)
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>

                  <div className="relative">
                    <DatePicker
                      selected={taskData.dueDate}
                      onChange={(data) => handleValueChange("dueDate", data)}
                      minDate={new Date()}
                      placeholderText="Select due date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To
                </label>

                <SelectedUsers
                  selectedUser={taskData.assignedTo}
                  setSelectedUser={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TODO Checklist
                </label>

                <TodoListInput
                  todoList={taskData?.todoChecklist}
                  setTodoList={(value) =>
                    handleValueChange("todoChecklist", value)
                  }
                />
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Attachments
                </label>

                <AddAttachmentsInput
                  attachments={taskData?.attachments}
                  setAttachments={(value) =>
                    handleValueChange("attachments", value)
                  }
                />
              </div>

              <div className="flex justify-end mt-7">
                <button
                  className="px-2 py-2 bg-green-500 border border-green-300 rounded-md text-white hover:bg-green-800 cursor-pointer w-full"
                  onClick={handleSubmit}
                  type="button"
                >
                  {taskId ? "UPDATE TASK" : "CREATE TASK"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title={"Delete Task"}
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask
