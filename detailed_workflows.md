# 📱 CodeCure Academy: Detailed Workflows & User Stories

This document outlines the detailed functional workflows and user stories for the CodeCure Academy platform, categorized by user roles (Admin, Teacher, Student). It also includes a roadmap for Android-specific integration.

---

## 🔑 1. Role-Based Workflows

### 🛡️ Admin Workflow (The Controller)
The Admin manages the ecosystem, monitors growth, and ensures operational stability.

1.  **Dashboard Insight:** Upon login, Admin sees a Birds-eye view of total students, active teachers, and revenue/transactions.
2.  **Staff Management:** Registers new Teachers or Admins. Can promote students to staff roles if needed.
3.  **Enrollment Governance:** Reviews pending enrollment requests from students and Approves/Rejects them to grant course access.
4.  **Content Oversight:** Can audit any course, module, or lesson to ensure quality standards.
5.  **Platform Pulse:** Manages global settings (e.g., maintenance mode, API keys) and tracks financial logs via the Transaction module.

### 👨‍🏫 Teacher Workflow (The Content Creator)
Teachers are responsible for the academic experience and student success.

1.  **Course Architecture:** Creates and structures courses, adding Modules and Lessons (Video URLs, Durations).
2.  **Assessment Management:** Designates Assignments for specific courses with clear descriptions and due dates.
3.  **Student Interaction:** 
    -   **Doubt Clearing:** Monitors the "Doubts" feed and provides detailed text/video replies.
    -   **Mock Interviews:** Schedules 1-on-1 mocks via Google Meet and evaluates them with scores and feedback.
4.  **Grading:** Reviews student submissions, assigns scores, and provides constructive feedback.
5.  **Progress Tracking:** Monitors which students are falling behind or excelling in their courses.

### 👨‍🎓 Student Workflow (The Learner)
Students are the primary users focused on learning and career growth.

1.  **Discovery:** Browses the public catalog of courses and requests enrollment in desired paths.
2.  **Curriculum Consumption:** Watches lessons, tracks progress, and marks modules as complete.
3.  **Active Learning:**
    -   **Ask Doubts:** Posts questions directly linked to specific lessons.
    -   **Submit Assignments:** Uploads project links (GitHub/Drive) for teacher review.
4.  **Career Readiness:** Joins scheduled Mock Interviews and views feedback to improve.
5.  **Profile Personalization:** Manages certifications, profile pictures, and contact details.

---

## 📖 2. Standard User Stories

| Role | User Story | Outcome/Benefit |
| :--- | :--- | :--- |
| **Admin** | As an admin, I want to approve enrollment requests | To ensure only paid/vetted students access premium content. |
| **Admin** | As an admin, I want to view all transaction records | To track the financial health and growth of the academy. |
| **Teacher** | As a teacher, I want to schedule mock interviews | To prepare students for real-world job placements. |
| **Teacher** | As a teacher, I want to resolve student doubts | To provide a supportive learning environment and clear blockers. |
| **Student** | As a student, I want to submit my assignments | To get verified feedback from experts on my practical work. |
| **Student** | As a student, I want to track my course progress | To keep myself motivated and see how much of the syllabus is left. |

---

## 🚀 3. Android Integration Strategy

To make these workflows feel native on Android using **Capacitor**, we prioritize the following:

### A. Role-Based Navigation (Conditional Routing)
-   **Student App:** Main tabs are [Home, My Courses, Doubts, Profile].
-   **Teacher App:** Main tabs are [Dashboard, Courses, Submissions, Calendar].
-   **Logic:** Upon login, the app checks the user role from `/api/auth/me` and redirects to the appropriate "Shell" component.

### B. Push Notifications (Critical for Mobile)
-   **Teacher Notifications:** "New Doubt Posted", "New Assignment Submitted".
-   **Student Notifications:** "Assignment Graded", "Enrollment Approved", "Interview Starting in 10 mins".
-   *Implementation:* Use `@capacitor/push-notifications` linked with Firebase (FCM).

### C. Native Media Handling
-   **Assignment Uploads:** Use `@capacitor/camera` or `@capacitor/file-picker` to let students take photos of handwritten notes or select code files.
-   **Video Playback:** Use a native-feeling video player (like `react-player` or a Capacitor video plugin) that supports Picture-in-Picture (PiP).

### D. Offline Support
-   **Syncing:** Use `TanStack Query` (React Query) for caching. Even if the network drops, students should be able to view previously loaded lesson text/titles.

---

## 🛠️ Implementation Checklist for Android
- [ ] **Setup Firebase:** Add `google-services.json` to the Android project.
- [ ] **Role Protection:** Implement a `ProtectedRoute` component in React that blocks unauthorized roles from certain screens.
- [ ] **Deep Linking:** Allow "Join Meeting" links from notifications to open the Android app (or external Meet app) directly.
- [ ] **Status Bar/Theme:** Customize the Android status bar color to match the CodeCure brand using `@capacitor/status-bar`.
