# 🚀 CODECURE ACADEMY - FULL API DOCUMENTATION (GET & POST)

This document contains a comprehensive list of all **GET** and **POST** APIs available in the CodeCure Academy project.

---

## 🔑 1. AUTHENTICATION & PROFILE

### 1.1 User Signup
**Method:** POST
**URL:** `http://localhost:5000/api/auth/signup`
**Request Body:**
```json
{
"name": "Arjun Sharma",
"email": "arjun@example.com",
"password": "password123",
"phone": "9876543210"
}
```
**Response:**
```json
{
"success": true,
"data": { "user": { "id": "1", "email": "arjun@example.com" }, "session": { "id": "uuid" } }
}
```
**Status:** ✅ Working

### 1.2 User Login
**Method:** POST
**URL:** `http://localhost:5000/api/auth/login`
**Request Body:**
```json
{
"email": "arjun@example.com",
"password": "password123"
}
```
**Response:**
```json
{
"success": true,
"data": { "user": { "id": "1", "name": "Arjun", "role": "student" }, "session": { "id": "uuid" } }
}
```
**Status:** ✅ Working

### 1.3 Get My Profile
**Method:** GET
**URL:** `http://localhost:5000/api/auth/me`
**Request Body:** `None`
**Response:**
```json
{
"success": true,
"data": { "id": "1", "name": "Arjun", "role": "student", "email": "arjun@example.com" }
}
```
**Status:** ✅ Working

### 1.4 User Logout
**Method:** POST
**URL:** `http://localhost:5000/api/auth/logout`
**Request Body:** `None`
**Response:**
```json
{ "success": true, "data": {} }
```
**Status:** ✅ Working

---

## 📚 2. COURSES & MODULES

### 2.1 Get Public Courses
**Method:** GET
**URL:** `http://localhost:5000/api/courses`
**Request Body:** `None`
**Status:** ✅ Working

### 2.2 Get Single Course Details
**Method:** GET
**URL:** `http://localhost:5000/api/courses/:idOrSlug`
**Request Body:** `None`
**Status:** ✅ Working

### 2.3 Create New Course (Admin/Teacher)
**Method:** POST
**URL:** `http://localhost:5000/api/courses`
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

### 2.4 Get Teacher's My Courses
**Method:** GET
**URL:** `http://localhost:5000/api/courses/teacher/my`
**Request Body:** `None`
**Status:** ✅ Working

### 2.5 Get All Courses (Admin Log)
**Method:** GET
**URL:** `http://localhost:5000/api/courses/admin/all`
**Request Body:** `None`
**Status:** ✅ Working

### 2.6 Get Modules of a Course
**Method:** GET
**URL:** `http://localhost:5000/api/courses/:courseId/modules`
**Request Body:** `None`
**Status:** ✅ Working

### 2.7 Add Module to Course
**Method:** POST
**URL:** `http://localhost:5000/api/courses/:courseId/modules`
**Request Body:**
```json
{ "title": "Hooks & Context API", "duration": "1h 20m", "module_order": 3 }
```
**Status:** ✅ Working

---

## 👨‍🎓 3. ENROLLMENTS

### 3.1 Request Enrollment
**Method:** POST
**URL:** `http://localhost:5000/api/enrollments/request`
**Request Body:**
```json
{ "course_id": "course-uuid" }
```
**Status:** ✅ Working

### 3.2 Get My Enrollment Requests
**Method:** GET
**URL:** `http://localhost:5000/api/enrollments/requests/me`
**Request Body:** `None`
**Status:** ✅ Working

### 3.3 Get My Active Enrollments
**Method:** GET
**URL:** `http://localhost:5000/api/enrollments/me`
**Request Body:** `None`
**Status:** ✅ Working

### 3.4 Get Pending Enrollment Requests (Admin)
**Method:** GET
**URL:** `http://localhost:5000/api/enrollments/requests/pending`
**Request Body:** `None`
**Status:** ✅ Working

### 3.5 Get All System Enrollments (Admin)
**Method:** GET
**URL:** `http://localhost:5000/api/enrollments`
**Request Body:** `None`
**Status:** ✅ Working

---

## 📖 4. LESSONS

### 4.1 Get All Lessons for a Course
**Method:** GET
**URL:** `http://localhost:5000/api/lessons/course/:courseId`
**Request Body:** `None`
**Status:** ✅ Working

### 4.2 Get Latest Watched Lesson
**Method:** GET
**URL:** `http://localhost:5000/api/lessons/course/:courseId/latest`
**Request Body:** `None`
**Status:** ✅ Working

### 4.3 Create a Lesson
**Method:** POST
**URL:** `http://localhost:5000/api/lessons`
**Request Body:**
```json
{ "course_id": "uuid", "module_id": "uuid", "title": "What is Redux?", "video_url": "...", "duration": "15m", "lesson_order": 1 }
```
**Status:** ✅ Working

---

## 📝 5. ASSIGNMENTS

### 5.1 Create Assignment
**Method:** POST
**URL:** `http://localhost:5000/api/assignments`
**Request Body:**
```json
{ "course_id": "uuid", "title": "React Mini Project", "description": "Make a grocery list", "due_date": "2024-12-01" }
```
**Status:** ✅ Working

### 5.2 Submit Assignment
**Method:** POST
**URL:** `http://localhost:5000/api/assignments/:id/submit`
**Request Body:**
```json
{ "submission_url": "https://github.com/..." }
```
**Status:** ✅ Working

### 5.3 Get Assignments for a Course
**Method:** GET
**URL:** `http://localhost:5000/api/assignments/course/:courseId`
**Request Body:** `None`
**Status:** ✅ Working

### 5.4 Get My Assignments Cross-Course
**Method:** GET
**URL:** `http://localhost:5000/api/assignments/my-assignments`
**Request Body:** `None`
**Status:** ✅ Working

### 5.5 Get My Assignment Submissions
**Method:** GET
**URL:** `http://localhost:5000/api/assignments/submissions/me`
**Request Body:** `None`
**Status:** ✅ Working

---

## ❓ 6. DOUBTS

### 6.1 Create a Doubt
**Method:** POST
**URL:** `http://localhost:5000/api/doubts`
**Request Body:**
```json
{ "course_id": "uuid", "lesson_id": "uuid", "title": "Props Drilling", "description": "Can you explain props drilling again?" }
```
**Status:** ✅ Working

### 6.2 Get My Doubts
**Method:** GET
**URL:** `http://localhost:5000/api/doubts/me`
**Status:** ✅ Working

### 6.3 Get Teacher-Assigned Doubts
**Method:** GET
**URL:** `http://localhost:5000/api/doubts/teacher`
**Status:** ✅ Working

### 6.4 Get All Doubts (Admin)
**Method:** GET
**URL:** `http://localhost:5000/api/doubts`
**Status:** ✅ Working

---

## 🤝 7. MOCK INTERVIEWS

### 7.1 Schedule Interview
**Method:** POST
**URL:** `http://localhost:5000/api/interviews`
**Request Body:**
```json
{ "student_id": "uuid", "course_id": "uuid", "title": "Technical Round 1", "scheduled_at": "2024-12-05T15:00:00Z", "meeting_link": "https://meet..." }
```
**Status:** ✅ Working

### 7.2 Get My Interviews
**Method:** GET
**URL:** `http://localhost:5000/api/interviews/me`
**Status:** ✅ Working

### 7.3 Get Teacher-Assigned Interviews
**Method:** GET
**URL:** `http://localhost:5000/api/interviews/teacher`
**Status:** ✅ Working

### 7.4 Get All Interviews (Admin)
**Method:** GET
**URL:** `http://localhost:5000/api/interviews`
**Status:** ✅ Working

---

## 🛡️ 8. ADMIN MANAGEMENT

### 8.1 Get All Students
**Method:** GET
**URL:** `http://localhost:5000/api/admin/students`
**Status:** ✅ Working

### 8.2 Get All Staff (Teachers/Admins)
**Method:** GET
**URL:** `http://localhost:5000/api/admin/staff`
**Status:** ✅ Working

### 8.3 Register New Staff Account
**Method:** POST
**URL:** `http://localhost:5000/api/admin/staff`
**Request Body:**
```json
{ "name": "Dr. Sarah", "email": "sarah@codecure.com", "password": "pass", "role": "teacher" }
```
**Status:** ✅ Working

### 8.4 Get Financial Transactions
**Method:** GET
**URL:** `http://localhost:5000/api/admin/transactions`
**Status:** ✅ Working

### 8.5 Create Transaction Record
**Method:** POST
**URL:** `http://localhost:5000/api/admin/transactions`
**Request Body:**
```json
{ "type": "credit", "description": "Premium License Fee", "amount": 10000, "date": "2024-06-12" }
```
**Status:** ✅ Working

### 8.6 Get Feedback & Complaints
**Method:** GET
**URL:** `http://localhost:5000/api/admin/feedback`
**Status:** ✅ Working

### 8.7 Get Platform Settings
**Method:** GET
**URL:** `http://localhost:5000/api/admin/settings`
**Status:** ✅ Working

---

## 📢 9. PUBLIC & CAREER

### 9.1 Submit Contact Message
**Method:** POST
**URL:** `http://localhost:5000/api/contact`
**Request Body:**
```json
{ "name": "Test User", "email": "test@mail.com", "message": "Can you call me?" }
```
**Status:** ✅ Working

### 9.2 Get All Contact Messages (Admin)
**Method:** GET
**URL:** `http://localhost:5000/api/contact`
**Status:** ✅ Working

### 9.3 Submit Student Feedback
**Method:** POST
**URL:** `http://localhost:5000/api/feedback`
**Request Body:**
```json
{ "rating": 5, "comment": "Great experience" }
```
**Status:** ✅ Working

### 9.4 List Active Job Openings
**Method:** GET
**URL:** `http://localhost:5000/api/jobs`
**Status:** ✅ Working

### 9.5 Post New Job Opening
**Method:** POST
**URL:** `http://localhost:5000/api/jobs`
**Request Body:**
```json
{ "title": "Developer Intern", "company": "Tech ABC", "location": "Remote", "salary": "₹10,000", "is_active": true }
```
**Status:** ✅ Working

---

## 📂 10. UPLOADS

### 10.1 Upload File/Image
**Method:** POST
**URL:** `http://localhost:5000/api/upload/image`
**Request Body:** `multipart/form-data`
**Status:** ✅ Working
