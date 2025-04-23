
# 🚗 RTO Connect – Online RTO Operations Automation
## with ChatBot Support

A full-stack web application to automate the core services of the Regional Transport Office (RTO) like license application, vehicle registration, fee payment etc. Built with a React.js frontend and Node.js/Express.js backend, and integrated with Stripe for secure payments and DialogFlow for chatbot assistance.
![image](https://github.com/user-attachments/assets/e005c29e-66f0-4595-bd34-ac0f92dd5552)
![image](https://github.com/user-attachments/assets/98d729e5-4d2c-4807-b5a4-7911792991ac)
![image](https://github.com/user-attachments/assets/9bd77fa5-e26f-411c-bd48-36ef6e150c72)
![image](https://github.com/user-attachments/assets/4e407f98-d03e-4128-ad28-551223cc6543)
![image](https://github.com/user-attachments/assets/b49795dd-7369-4670-920a-9afd6f5b84e6)
![image](https://github.com/user-attachments/assets/9f658aaa-8e58-430f-b40f-89591dcdee9f)





---

## 🧾 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Future Scope](#future-scope)
- [Contributors](#contributors)

---

## ✨ Features

- User Authentication (Signup/Login with JWT)
- Driving License Application
- Vehicle Registration Module
- Driving License Test 
- Admin Dashboard for Application Management
- Stripe Payment Gateway Integration
- Chatbot Assistance with DialogFlow
- Dynamic Status Updates (Approved / Rejected)
- PDF Report Generation for Vehicle Fitness
- Responsive UI with Tailwind CSS
- Charts for app stats with Chart.js

---

## 🧑‍💻 Tech Stack

### 🔹 Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Chart.js
- Stripe.js
- Framer Motion
- jsPDF

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer
- Stripe
- CORS, dotenv
- DialogFlow API

---

## ⚙️ Installation & Setup

### ✅ Backend Setup

```bash
cd backend
npm install
npm run dev
```

📦 Dependencies:
```bash
express mongoose dotenv bcryptjs jsonwebtoken cors nodemailer body-parser stripe
```

Add to `package.json`:
```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

---

### ✅ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

📦 Dependencies:
```bash
axios react-router-dom
chart.js react-chartjs-2 chartjs-plugin-datalabels
@stripe/stripe-js @stripe/react-stripe-js
framer-motion
jspdf jspdf-autotable
```

---

## 🔐 Environment Variables

### Backend: `.env`

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Frontend: `.env`

```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```

---

## 🚀 Usage

1. Run the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Run the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Visit `http://localhost:5173` to open the app.

---

## 🔮 Future Scope

- Add multilingual support for better accessibility.
- Integrate SMS notifications via Twilio.
- AI-based document verification system.
- Blockchain-based license verification.
- Mobile app version (React Native).

---

## 🤝 Contributors
Stuti Rajeev @thestutirajeev & Ish Jaiswal @ishjaiswal7

---
```
