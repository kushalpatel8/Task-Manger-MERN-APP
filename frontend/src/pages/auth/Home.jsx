import React from "react"
import { Link } from "react-router-dom"
import { FaPeopleGroup } from "react-icons/fa6"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <FaPeopleGroup className="text-3xl text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 uppercase">
            Project Flow
          </h1>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-800"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden">

          {/* Gradient top border */}
          <div className="h-2 bg-linear-to-r from-blue-600 to-blue-400"></div>

          <div className="p-10 text-center">

            {/* Logo */}
            <div className="flex justify-center">
              <div className="bg-blue-100 p-4 rounded-full shadow-md">
                <FaPeopleGroup className="text-5xl text-blue-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-800 mt-6 uppercase">
              Welcome to Project Flow
            </h1>

            <p className="text-gray-600 mt-3 text-lg leading-relaxed">
              A smart, simple, and powerful project management platform
              designed to help teams stay organized, productive, and connected.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold shadow-md hover:bg-gray-300"
              >
                Sign Up
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Project Flow · All rights reserved
      </footer>
    </div>
  )
}

export default HomePage

