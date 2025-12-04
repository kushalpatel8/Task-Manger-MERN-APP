import React, { useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { MdDelete } from "react-icons/md"

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("")

  const handleAddOption = () => {
    if (option.trim() !== "") {
      setTodoList([...todoList, option.trim()])
      setOption("")
    }
  }

  const handleDeleteOption = (index) => {
    const updatedArray = todoList.filter((_, i) => i !== index)
    setTodoList(updatedArray)
  }

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={item}
          className="flex items-center justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <p className="text-sm text-black">
            <span className="text-sm text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <MdDelete className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-300 px-3 py-2 rounded-md"
        />

        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          onClick={handleAddOption}
        >
          <IoMdAdd className="text-base" />
          Add
        </button>
      </div>
    </div>
  )
}

export default TodoListInput
