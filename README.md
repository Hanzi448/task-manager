
# 📝 Task Management System

A full-stack web application that allows users to manage their daily tasks efficiently with CRUD functionality, collaborative features, real-time notifications, and insightful analytics.

---

## 🚀 Features

- ✅ User registration and login (JWT-based authentication)
- ✍️ Add, edit, delete tasks
- 🔍 Filter and search tasks by status, title, or description
- 📈 Visual progress bar showing task completion percentage
- 👥 Share tasks with other users
- 📬 Real-time notifications (Socket.IO)
- 📊 Analytics dashboard with charts (Recharts)
- 🌙 Dark mode toggle
- 📎 Upload attachments to tasks
- 📱 Mobile responsive layout

---

## 🖥️ Tech Stack

### Frontend:
- React.js
- Axios
- Bootstrap
- React Icons
- Recharts
- Socket.IO-client

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Socket.IO

---

## 🌐 Live Demo

🚀 [Live Application](https://your-live-link-here.com)

---

## 📦 Installation

### Prerequisites:
- Node.js and npm
- MongoDB installed and running

### Backend Setup:
\`\`\`bash
cd task-manager-backend
npm install
npm start
\`\`\`
> Runs on \`http://localhost:5000\`

### Frontend Setup:
\`\`\`bash
cd task-manager-frontend
npm install
npm start
\`\`\`
> Runs on \`http://localhost:3000\`

---

## 🔒 Authentication

- Register via \`POST /api/register\`
- Login via \`POST /api/login\`
- JWT stored in \`localStorage\` and attached using Axios interceptors

---

## 📤 Task Sharing & Notifications

- Tasks can be shared with other users via \`PUT /tasks/:id/share\`
- Users can view tasks shared with them via \`GET /tasks/shared\`
- Real-time notifications for:
  - Task sharing
  - Status updates

---

## 📊 Analytics Dashboard

- Dashboard shows:
  - Total tasks
  - Completed vs. Pending vs. In Progress (pie chart)
  - Weekly/monthly trends

### Backend Endpoints:
- \`GET /analytics/overview\` – summary statistics
- \`GET /analytics/trends\` – weekly/monthly trends using MongoDB aggregations

---

## 📁 Task Attachments

- Upload files or images with each task
- Attachments are displayed in the task details

---

## 🌙 Dark Mode

Toggle between light and dark themes on the frontend.

---

## 📱 Mobile Support

- Fully responsive layout for phones and tablets
- Optimized touch interactions and collapsible UI elements

---

## 🧪 Testing

- **Backend:** Jest for unit testing APIs
- **Frontend:** React Testing Library for UI tests

---

## 🛠️ Intern Development Plan Summary

### Week 4: Collaboration & Notifications
- Shared tasks using \`sharedWith\` field
- Socket.IO for real-time alerts

### Week 5: Analytics
- Visual reporting dashboard using Recharts
- Backend aggregation with MongoDB

### Week 6: Deployment & Final Touches
- Cloud deployment (e.g., Render)
- Dark mode, attachments, full README, and demo video

---

## 📄 API Reference

### Auth:
- \`POST /api/register\` – register a new user
- \`POST /api/login\` – login and receive JWT

### Tasks:
- \`GET /tasks\` – fetch all user tasks
- \`POST /tasks\` – create a new task
- \`PUT /tasks/:id\` – update a task
- \`DELETE /tasks/:id\` – delete a task
- \`PUT /tasks/:id/share\` – share a task with other users
- \`GET /tasks/shared\` – tasks shared with the user

### Notifications:
- \`GET /notifications\` – fetch notification history

### Analytics:
- \`GET /analytics/overview\`
- \`GET /analytics/trends\`

---

## 🤝 Contribution

Pull requests are welcome. For major changes, open an issue first to discuss your proposal.

Steps:
1. Fork the repository
2. Create a new branch (\`git checkout -b feature-xyz\`)
3. Commit your changes (\`git commit -am 'Add feature xyz'\`)
4. Push to GitHub (\`git push origin feature-xyz\`)
5. Create a pull request

---

## 📄 License

MIT License © 2025 Hanzala Salaheen

---
