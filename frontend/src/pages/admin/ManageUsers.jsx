import React, { useEffect, useState } from "react"
import axiosInstance from "../../utils/axioInstance"
import DashboardLayout from "../../components/DashboardLayout"
import { FaFileAlt } from "react-icons/fa"
import UserCard from "../../components/UserCard"
import toast from "react-hot-toast"

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users")

      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.log("Error fetching users: ", error)
    }
  }

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/users", {
        responseType: "blob",
      })

      // create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")

      link.href = url

      link.setAttribute("download", "user_details.xlsx")
      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Error downloading user-details report: ", error)
      toast.error("Error downloading user-details report. Please try again!")
    }
  }

  useEffect(() => {
    getAllUsers()

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className="mt-5 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Team Members</h2>

          <button
            type="button"
            className="flex items-center gap-1 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-gray-800 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md cursor-pointer text-lg"
            onClick={handleDownloadReport}
          >
            <FaFileAlt className="text-lg" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers
