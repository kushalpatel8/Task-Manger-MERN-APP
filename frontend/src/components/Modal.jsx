import React from "react"
import { IoMdClose } from "react-icons/io"

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-white/30" onClick={onClose}></div>

      <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl shadow-xl border border-white/20 bg-white/90 backdrop-blur-lg transform transition-all duration-300 ease-out">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-gray-700">{children}</div>
      </div>
    </div>
  )
}

export default Modal
