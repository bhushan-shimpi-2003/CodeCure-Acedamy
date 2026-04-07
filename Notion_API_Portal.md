# 🌐 CodeCure Academy - Developer API Portal

Welcome to the internal API documentation for **CodeCure Academy**. This document is optimized for **Notion**. Simply copy and paste the content below into a new Notion page.

---

> [!INFO]
> **Base URL (Local):** `http://localhost:5000/api`  
> **Base URL (Prod):** `https://codecurebackend.vercel.app/api`

---

## 📋 Table of Contents
- [x] [Authentication & Security](#authentication-&-security)
- [x] [Course Management](#course-management)
- [x] [Enrollments & Payments](#enrollments-&-payments)
- [x] [Learning Experience (Lessons/Doubts)](#learning-experience)
- [x] [Admin & Finance Dashboard](#admin-&-finance)
- [x] [Career & Public APIs](#career-&-public)

---

## 🔑 Authentication & Security
### 🔐 Signup (`POST /auth/signup`)
> [!TIP]
> Use this for first-time student registration.
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "name": "Arjun Sharma",
  "email": "arjun@example.com",
  "password": "securePass123",
  "phone": "9876543210"
}
```
</details>

---

### 🔓 Login (`POST /auth/login`)
> [!IMPORTANT]
> Returns a session object with user profile.
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "email": "arjun@example.com",
  "password": "securePass123"
}
```
</details>

---

## 📚 Course Management
### 📝 Create Course (`POST /courses`)
> [!NOTE]
> Restricted to Teachers and Admins.
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "title": "Mastering Full Stack Development",
  "slug": "full-stack-mastery-v1",
  "description": "Comprehensive course covering React, Node, and Supabase.",
  "price": 4999,
  "category": "Web Development",
  "thumbnail": "https://example.com/thumbnails/fullstack.png",
  "status": "published",
  "modules": [
    {
      "title": "Module 1: Introduction",
      "duration": "1h 30m",
      "lessons": [
        { "title": "React Basics", "video_url": "https://...", "duration": "15m" }
      ]
    }
  ]
}
```
</details>

---

## 🎓 Enrollments & Payments
### 💳 Request Enrollment (`POST /enrollments/request`)
> [!INFO]
> Sent when a student clicks 'Buy Now'. Admin must approve.
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "course_id": "8f6e80b2-4d89-4b1d-8fc5-63c1a2f9ec77"
}
```
</details>

---

## 🛠️ Admin & Finance
### 💰 Add Transaction (`POST /admin/transactions`)
> [!CAUTION]
> Direct database manipulation. Use with care.
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "type": "credit",
  "description": "Premium Course Subscription - Order #1024",
  "amount": 7999,
  "date": "2024-05-18"
}
```
</details>

---

### 👨‍🏫 Add Staff (`POST /admin/staff`)
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "name": "Dr. Sarah Johnson",
  "email": "sarah.teacher@codecure.com",
  "password": "teacherInitialPassword123",
  "role": "teacher"
}
```
</details>

---

## 🚀 Career & Public
### 💼 Post Job (`POST /jobs`)
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "title": "Junior Backend Developer",
  "company": "NextGen Systems",
  "location": "Pune / Hybrid",
  "salary": "₹4.5LPA - ₹6LPA",
  "is_active": true
}
```
</details>

---

## 💬 Doubts & Interviews
### ❓ Ask a Doubt (`POST /doubts`)
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "course_id": "8f6e80b2-4d89-4b1d-8fc5-63c1a2f9ec77",
  "lesson_id": "b1c2d3e4-f5g6",
  "title": "State Help",
  "description": "How do I maintain state across page refreshes?"
}
```
</details>

---

### 🗓️ Schedule Interview (`POST /interviews`)
<details>
<summary>View Request Details</summary>

**Body:**
```json
{
  "student_id": "user-uuid-here",
  "course_id": "8f6e80b2",
  "title": "Technical Round",
  "scheduled_at": "2024-11-15T14:30:00Z",
  "meeting_link": "https://meet.google.com/abc-defg-hij"
}
```
</details>
