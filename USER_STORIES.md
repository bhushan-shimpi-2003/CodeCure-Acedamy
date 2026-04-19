
# 📱 CodeCure Academy: User Stories & Workflows

## 🛡️ Admin (System Governance)
*As an Administrator, my goal is to manage the platform's health and ensure quality.*
- **User Management:** I want to create teacher accounts and manage student permissions.
- **Access Control:** I want to approve/reject enrollment requests so that only paid/vetted students access content.
- **Financial Tracking:** I want to view transaction logs to monitor revenue and financial health.
- **Content Audit:** I want to be able to delete or edit any course if it violates platform guidelines.

## 👨‍🏫 Teacher (Educational Delivery)
*As a Teacher, my goal is to deliver content and mentor students effectively.*
- **Curriculum Build:** I want to create courses, split them into modules, and add video lessons.
- **Practical Assessment:** I want to create assignments and grade student submissions with feedback.
- **Doubt Resolution:** I want to see a list of student doubts and reply to them directly.
- **Live Mentorship:** I want to schedule mock interviews and complete them with performance notes.

## 👨‍🎓 Student (Learning & Growth)
*As a Student, my goal is to acquire skills and track my progress.*
- **Course Discovery:** I want to browse available courses and request to join them.
- **Learning Interface:** I want to watch lessons and mark them as complete as I progress.
- **Skill Validation:** I want to submit assignments and view my grades/feedback.
- **Query Support:** I want to ask doubts on specific lessons and get notified when they are resolved.
- **Career Preparation:** I want to view my scheduled interviews and join the meeting links.

---

## 🚀 Android Application Integration Tips
To implement these workflows in the Android app (Capacitor):
1. **Dynamic Navigation:** Use a `BottomNavigationBar` that changes tabs based on the user's role (e.g., Teachers see "Submissions", Students see "My Courses").
2. **Push Notifications:** Alert teachers of new doubts and students of graded assignments.
3. **Camera Support:** Allow students to upload photos of their assignments directly from their phone camera.
4. **Deep Linking:** Allow meeting notification clicks to open the specific interview page directly.

