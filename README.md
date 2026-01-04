# Task Manager MERN App

A full-stack Task Management application built using the **MERN** stack (MongoDB, Express, React, Node.js). This application features secure user authentication, role-based access control (Admin vs. User), task tracking with checklists, dashboard visualizations, and report generation.

## 🚀 Features

### 🔐 Authentication & Security
* **User Registration & Login**: Secure signup and signin using JWT (JSON Web Tokens) and HttpOnly cookies.
* **Role-Based Access Control (RBAC)**:
    * **Admin**: Full access to manage all users, create tasks for any user, and view comprehensive dashboards.
    * **User**: Access to personal tasks, dashboard, and profile management.
* **Protected Routes**: Prevents unauthorized access to specific pages based on login status and user roles.

### 📋 Task Management
* **CRUD Operations**: Create, Read, Update, and Delete tasks.
* **Task Details**: Includes title, description, priority (Low, Medium, High), due date, and attachments.
* **Sub-tasks / Checklists**: Add todo checklists within tasks to track progress. Task status updates automatically based on checklist completion.
* **Status Tracking**: Track tasks through 'Pending', 'In Progress', and 'Completed' stages.

### 📊 Dashboard & Analytics
* **Visual Statistics**: Interactive charts (Pie & Bar charts) using `recharts` to display task distribution and priority levels.
* **Summary Cards**: Quick view of Total, Pending, In Progress, Completed, and Overdue tasks.

### 📂 Reports & Exports
* **Excel Export**: Admins can download detailed Task and User reports in `.xlsx` format using `exceljs`.

### 👤 User Profile
* **Profile Management**: Update name, email, and password.
* **Avatar Upload**: Upload and manage profile pictures using `multer`.

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (Vite).
* **Redux Toolkit** for state management.
* **Tailwind CSS** for styling.
* **React Router DOM** for navigation.
* **Recharts** for data visualization.
* **Axios** for API requests.
* **React Hot Toast** for notifications.

### Backend
* **Node.js** & **Express.js**.
* **MongoDB** & **Mongoose** for database management.
* **JWT (JsonWebToken)** for authentication.
* **Bcryptjs** for password hashing.
* **Multer** for file handling.
* **ExcelJS** for generating reports.

---
