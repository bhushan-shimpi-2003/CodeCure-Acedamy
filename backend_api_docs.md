# 🚀 CODECURE ACADEMY - FULL API DOCUMENTATION (CRUD)

This document contains a comprehensive list of all **GET**, **POST**, **PUT**, and **DELETE** APIs available in the CodeCure Academy project.

---

## 🔑 1. AUTHENTICATION & PROFILE

### 1.1 User Signup
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/auth/signup`
**Request Body:**
```json
{
  "name": "Arjun Sharma",
  "email": "arjun@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```
**Status:** ✅ Working

### 1.2 User Login
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/auth/login`
**Request Body:**
```json
{
  "email": "arjun@example.com",
  "password": "password123"
}
```
**Status:** ✅ Working

### 1.3 Get My Profile
**Method:** GET
**URL:** `https://codecure-acedamy.onrender.com/api/auth/me`
**Status:** ✅ Working

### 1.4 Update My Profile
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/auth/me`
**Request Body:**
```json
{
  "name": "Arjun Updated",
  "phone": "1122334455",
  "profile_picture": "https://url.com/img.png"
}
```
**Status:** ✅ Working

### 1.5 Delete My Profile (Deactivate Account)
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/auth/me`
**Status:** ✅ Working

### 1.6 User Logout
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/auth/logout`
**Status:** ✅ Working

---

## 📚 2. COURSES & MODULES

### 2.1 Get Public Courses
**Method:** GET
**URL:** `https://codecure-acedamy.onrender.com/api/courses`
**Status:** ✅ Working

### 2.2 Create New Course (Admin/Teacher)
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/courses`
**Request Body:**
```json
{
  "title": "Mastering React",
  "slug": "mastering-react",
  "description": "Start your react journey here.",
  "price": 4999,
  "category": "Development",
  "status": "published"
}
```
**Status:** ✅ Working

### 2.3 Update Course
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/courses/:id`
**Request Body:** Same as Create
**Status:** ✅ Working

### 2.4 Delete Course
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/courses/:id`
**Status:** ✅ Working

### 2.5 Add Module to Course
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/courses/:courseId/modules`
**Request Body:**
```json
{ "title": "Hooks & Context API", "duration": "1h 20m", "module_order": 3 }
```
**Status:** ✅ Working

### 2.6 Update Module
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/courses/modules/:id`
**Status:** ✅ Working

### 2.7 Delete Module
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/courses/modules/:id`
**Status:** ✅ Working

---

## 👨‍🎓 3. ENROLLMENTS

### 3.1 Request Enrollment
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/enrollments/request`
**Request Body:**
```json
{ "course_id": "course-uuid" }
```
**Status:** ✅ Working

### 3.2 Update Enrollment Request (Admin)
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/enrollments/requests/:id`
**Request Body:** `{ "status": "approved" }`
**Status:** ✅ Working

### 3.3 Delete Enrollment Request
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/enrollments/requests/:id`
**Status:** ✅ Working

### 3.4 Update Enrollment Details (Admin)
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/enrollments/:id`
**Request Body:** `{ "student_status": "dropped", "progress": 50 }`
**Status:** ✅ Working

### 3.5 Delete Enrollment
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/enrollments/:id`
**Status:** ✅ Working

---

## 📖 4. LESSONS

### 4.1 Create a Lesson
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/lessons`
**Request Body:**
```json
{ "course_id": "uuid", "module_id": "uuid", "title": "What is Redux?", "video_url": "...", "duration": "15m", "lesson_order": 1 }
```
**Status:** ✅ Working

### 4.2 Update Lesson
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/lessons/:id`
**Status:** ✅ Working

### 4.3 Delete Lesson
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/lessons/:id`
**Status:** ✅ Working

---

## 📝 5. ASSIGNMENTS

### 5.1 Create Assignment
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/assignments`
**Request Body:**
```json
{ "course_id": "uuid", "title": "React Mini Project", "description": "Make a grocery list", "due_date": "2024-12-01" }
```
**Status:** ✅ Working

### 5.2 Update Assignment
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/assignments/:id`
**Status:** ✅ Working

### 5.3 Delete Assignment
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/assignments/:id`
**Status:** ✅ Working

### 5.4 Submit Assignment
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/assignments/:id/submit`
**Request Body:**
```json
{ "submission_url": "https://github.com/..." }
```
**Status:** ✅ Working

### 5.5 Update Submission
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/assignments/submissions/:id`
**Status:** ✅ Working

### 5.6 Delete Submission
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/assignments/submissions/:id`
**Status:** ✅ Working

### 5.7 Grade Submission (Teacher)
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/assignments/submissions/:id/grade`
**Request Body:** `{ "score": 90, "feedback": "Excellent work!" }`
**Status:** ✅ Working

---

## ❓ 6. DOUBTS

### 6.1 Create a Doubt
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/doubts`
**Request Body:**
```json
{ "course_id": "uuid", "lesson_id": "uuid", "title": "Props Drilling", "description": "Can you explain props drilling again?" }
```
**Status:** ✅ Working

### 6.2 Update Doubt
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/doubts/:id`
**Status:** ✅ Working

### 6.3 Delete Doubt
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/doubts/:id`
**Status:** ✅ Working

### 6.4 Resolve Doubt (Teacher)
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/doubts/:id/resolve`
**Request Body:** `{ "reply": "Sure, props drilling is..." }`
**Status:** ✅ Working

---

## 🤝 7. MOCK INTERVIEWS

### 7.1 Schedule Interview
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/interviews`
**Request Body:**
```json
{ "student_id": "uuid", "course_id": "uuid", "title": "Technical Round 1", "scheduled_at": "2024-12-05T15:00:00Z", "meeting_link": "https://meet..." }
```
**Status:** ✅ Working

### 7.2 Update Interview Schedule
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/interviews/:id`
**Status:** ✅ Working

### 7.3 Delete Interview
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/interviews/:id`
**Status:** ✅ Working

### 7.4 Complete Interview (Teacher)
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/interviews/:id/complete`
**Request Body:** `{ "score": 8, "notes": "Candidate was strong in Javascript" }`
**Status:** ✅ Working

---

## 🛡️ 8. ADMIN MANAGEMENT

### 8.1 Register New Staff Account
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/admin/staff`
**Request Body:**
```json
{ "name": "Dr. Sarah", "email": "sarah@codecure.com", "password": "pass", "role": "teacher" }
```
**Status:** ✅ Working

### 8.2 Update User Role
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/admin/users/:id/role`
**Request Body:** `{ "role": "admin" }`
**Status:** ✅ Working

### 8.3 Delete User (Student/Staff)
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/admin/users/:id`
**Status:** ✅ Working

### 8.4 Create Transaction Record
**Method:** POST
**URL:** `https://codecure-acedamy.onrender.com/api/admin/transactions`
**Request Body:**
```json
{ "type": "credit", "description": "Premium License Fee", "amount": 10000, "date": "2024-06-12" }
```
**Status:** ✅ Working

### 8.5 Update Transaction
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/admin/transactions/:id`
**Status:** ✅ Working

### 8.6 Delete Transaction
**Method:** DELETE
**URL:** `https://codecure-acedamy.onrender.com/api/admin/transactions/:id`
**Status:** ✅ Working

### 8.7 Get All Students List
**Method:** GET
**URL:** `https://codecure-acedamy.onrender.com/api/admin/students`
**Status:** ✅ Working (Admin only)

### 8.8 Update Setting
**Method:** PUT / PATCH
**URL:** `https://codecure-acedamy.onrender.com/api/admin/settings/:key`
**Request Body:** `{ "value": "new-value" }`
**Status:** ✅ Working



---

*(Note: GET endpoints follow the same patterns as listed in the previous documentation version.)*
