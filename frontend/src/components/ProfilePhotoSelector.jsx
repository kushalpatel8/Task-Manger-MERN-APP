import React, { useRef, useState } from "react"
import { FaCamera } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImage(file)

      const preview = URL.createObjectURL(file)

      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div
          className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition-all"
          onClick={onChooseFile}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="profile pic"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaCamera className="text-3xl text-gray-400" />
          )}
        </div>

        {!image ? (
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            onClick={onChooseFile}
          >
            <FaCamera className="text-sm" />
          </button>
        ) : (
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            onClick={handleRemoveImage}
          >
            <MdDelete className="text-sm" />
          </button>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}

export default ProfilePhotoSelector
