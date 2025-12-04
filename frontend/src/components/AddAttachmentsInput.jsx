import React, { useState } from "react"
import { ImAttachment } from "react-icons/im"
import { IoMdAdd } from "react-icons/io"
import { MdDelete } from "react-icons/md"

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("")

  const handleAddOption = () => {
    if (option.trim() !== "") {
      setAttachments([...attachments, option.trim()])
      setOption("")
    }
  }

  const handleDeleteOption = (index) => {
    const updatedArray = attachments.filter((_, i) => i !== index)
    setAttachments(updatedArray)
  }

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex items-center justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <ImAttachment className="text-gray-400" />

            <p className="text-sm text-black">{item}</p>
          </div>

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
        <div className="flex-1 flex items-center gap-3 border border-gray-100 px-3 py-2 rounded-md ">
          <ImAttachment className="text-gray-400" />

          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="w-full text-[13px] text-black outline-none bg-white border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          onClick={handleAddOption}
        >
          <IoMdAdd className="text-lg" />
          Add
        </button>
      </div>
    </div>
  )
}

export default AddAttachmentsInput
