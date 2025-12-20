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
    duedate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      duedate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  /* ================= CREATE TASK ================= */
  const createTask = async () => {
    try {
      setLoading(true)

      const todoChecklist = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }))

      const payload = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        duedate: new Date(taskData.duedate).toISOString(),
        assignedTo: taskData.assignedTo,
        attachment: taskData.attachments,
        todoChecklist,
      }

      await axiosInstance.post("/tasks/create", payload)

      toast.success("Task created successfully!")
      clearData()
      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error creating task:", error.response?.data || error.message)
      toast.error("Failed to create task!")
    } finally {
      setLoading(false)
    }
  }

  /* ================= UPDATE TASK ================= */
  const updateTask = async () => {
    try {
      setLoading(true)

      const todoChecklist = taskData.todoChecklist.map((item) => {
        const prev = currentTask?.todoChecklist || []
        const found = prev.find((t) => t.text === item)

        return {
          text: item,
          completed: found ? found.completed : false,
        }
      })

      const payload = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        duedate: new Date(taskData.duedate).toISOString(),
        assignedTo: taskData.assignedTo,
        attachment: taskData.attachments,
        todoChecklist,
      }

      await axiosInstance.put(`/tasks/${taskId}`, payload)

      toast.success("Task updated successfully!")
      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error updating task:", error.response?.data || error.message)
      toast.error("Failed to update task!")
    } finally {
      setLoading(false)
    }
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    setError("")

    if (!taskData.title.trim())
      return setError("Title is required!")

    if (!taskData.description.trim())
      return setError("Description is required!")

    if (!taskData.duedate)
      return setError("Due date is required!")

    if (!taskData.assignedTo.length)
      return setError("Assign task to at least one user!")

    if (!taskData.todoChecklist.length)
      return setError("Add at least one TODO!")

    taskId ? updateTask() : createTask()
  }

  /* ================= GET TASK ================= */
  const getTaskDetailsById = async () => {
    try {
      const { data } = await axiosInstance.get(`/tasks/${taskId}`)

      setCurrentTask(data)

      setTaskData({
        title: data.title,
        description: data.description,
        priority: data.priority,
        duedate: data.duedate ? new Date(data.duedate) : null,
        assignedTo: data.assignedTo.map((u) => u._id),
        todoChecklist: data.todoChecklist.map((t) => t.text),
        attachments: data.attachment || [],
      })
    } catch (error) {
      console.log("Error fetching task:", error)
    }
  }

  /* ================= DELETE ================= */
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`)
      toast.success("Task deleted successfully!")
      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error deleting task:", error)
    }
  }

  useEffect(() => {
    if (taskId) getTaskDetailsById()
  }, [taskId])

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {taskId ? "Update Task" : "Create New Task"}
          </h2>

          {taskId && (
            <button
              onClick={() => setOpenDeleteAlert(true)}
              className="flex items-center gap-2 text-red-600"
            >
              <MdDelete /> Delete Task
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-2 border rounded"
            value={taskData.title}
            onChange={(e) => handleValueChange("title", e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows={4}
            value={taskData.description}
            onChange={(e) =>
              handleValueChange("description", e.target.value)
            }
          />

          <select
            className="w-full p-2 border rounded"
            value={taskData.priority}
            onChange={(e) => handleValueChange("priority", e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <DatePicker
            selected={taskData.duedate}
            onChange={(date) => handleValueChange("duedate", date)}
            minDate={new Date()}
            className="w-full p-2 border rounded"
            placeholderText="Select due date"
          />

          <SelectedUsers
            selectedUser={taskData.assignedTo}
            setSelectedUser={(v) => handleValueChange("assignedTo", v)}
          />

          <TodoListInput
            todoList={taskData.todoChecklist}
            setTodoList={(v) => handleValueChange("todoChecklist", v)}
          />

          <AddAttachmentsInput
            attachments={taskData.attachments}
            setAttachments={(v) => handleValueChange("attachments", v)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading
              ? "Processing..."
              : taskId
              ? "UPDATE TASK"
              : "CREATE TASK"}
          </button>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={deleteTask}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask

