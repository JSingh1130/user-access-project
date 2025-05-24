
# User Access Management System (Full Stack Project)

A role-based access control system built using Node.js, Express, PostgreSQL, TypeORM for the backend, and React, Vite, Ant Design for the frontend.

🔗 **Live Demo Links:**

- **Frontend (Vercel):** [https://user-access-project.vercel.app](https://user-access-project.vercel.app)
- **Backend (Render):** [https://user-access-backend.onrender.com/api](https://user-access-backend.onrender.com/api)

---


## 📁 Project Structure

```

user-access-project/
├── user-access-system/       # Backend (Node.js + Express + PostgreSQL)
├── user-access-frontend/     # Frontend (React + Ant Design + Vite)

````

---

## ⚙️ Backend (user-access-system)

### 🔧 Tech Stack

- Node.js
- Express.js
- TypeORM
- PostgreSQL
- bcrypt (password hashing)
- JWT (authentication)

### 📦 Setup Instructions

```bash
cd user-access-system
npm install
````

### 🔐 Environment Variables (`.env`)

```
JWT_SECRET=your_jwt_secret
DB_HOST=your_db_host
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
```

### 🚀 Run the Backend

```bash
npm run build
node dist/index.js
```

Or in development:

```bash
npx ts-node src/index.ts
```

> Make sure PostgreSQL is running and the database is created.

---

## 🌐 Frontend (user-access-frontend)

### 🔧 Tech Stack

* React
* Vite
* Ant Design
* Axios

### 📦 Setup Instructions

```bash
cd user-access-frontend
npm install
npm run dev
```

### 🔐 Environment Variables (`.env`)

```
VITE_API_BASE_URL=https://user-access-backend.onrender.com/api
```

---

## 🔗 API Base URLs

* Development: `http://localhost:5000/api`
* Production: `https://user-access-backend.onrender.com/api`

---

## 🔑 User Roles & Access

| Role     | Access Privileges                   |
| -------- | ----------------------------------- |
| Admin    | Create/view software                |
| Manager  | View/approve/reject access requests |
| Employee | Request access to software          |

---

## 🖥️ Pages & Routes

| Route              | Description                        |
| ------------------ | ---------------------------------- |
| `/signup`          | Register as Admin/Manager/Employee |
| `/login`           | User login                         |
| `/admin-dashboard` | Admin creates software             |
| `/manager`         | Manager handles access requests    |
| `/employee`        | Employee requests software access  |
| `/my-requests`     | Employee views submitted requests  |

---

## 🔐 Authentication & Security

* JWT issued on login
* Token stored in `localStorage`
* Role-based protected routes
* Middleware: `authenticate`, `authorize`

---

## 🗃️ Database Models

### 1. **User**

* id
* username
* password (hashed)
* role (`Admin`, `Manager`, `Employee`)

### 2. **Software**

* id
* name
* description
* accessLevels (array: `Read`, `Write`, `Admin`)

### 3. **Request**

* id
* user (FK)
* software (FK)
* accessType
* reason
* status (`Pending`, `Approved`, `Rejected`)

---

## ✅ Features Implemented

* [x] Signup by role
* [x] Login using JWT
* [x] Admin creates new software
* [x] Employee submits access request
* [x] Manager approves/rejects requests
* [x] Employee can view their requests
* [x] Role-based dashboards
* [x] Logout support
* [x] UI with Ant Design
* [x] Deployment on Render + Vercel
* [x] Fallback for empty software list

---

## 🧪 Test Users

| Role     | Username  | Password    |
| -------- | --------- | ----------- |
| Admin    | admin1    | admin123    |
| Manager  | manager1  | manager123  |
| Employee | employee1 | employee123 |

(Use `/signup` to create these accounts)

---

## 🚀 Deployment

### 🔹 Backend (Render)

* Root Directory: `user-access-system/`
* Build Command: `npm install && npm run build`
* Start Command: `node dist/index.js`

### 🔹 Frontend (Vercel)

* Root Directory: `user-access-frontend/`
* Framework: Vite + React
* Environment Variable:
  `VITE_API_BASE_URL=https://user-access-backend.onrender.com/api`

---

## 📧 Contact

Created by: **Jatinjot Singh**
Email : **jatinjot28@gmail.com**
