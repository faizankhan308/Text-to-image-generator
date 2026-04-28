# 🎨 Imagify – AI Text to Image Generator

## 📌 Overview

Imagify is a full-stack AI-powered web application that converts text prompts into high-quality images within seconds. Users can enter any prompt, and the system generates visually appealing images using AI.

This project integrates modern technologies including React, Node.js, MongoDB, and AI APIs to deliver a seamless user experience.

---

## ✨ Features

* 🧠 AI-powered text-to-image generation
* ⚡ Fast and responsive UI
* 🔐 Authentication using JWT
* 💳 Razorpay payment integration
* 🗂 Image history storage (MongoDB)
* 🌐 Full-stack architecture (Client + Server)

---

## 🛠 Tech Stack

### Frontend (Client)

* React.js (Vite)
* Tailwind CSS

### Backend (Server)

* Node.js
* Express.js

### Database

* MongoDB

### APIs Used

* OpenAI / ClipDrop API (Image Generation)

### Payment Gateway

* Razorpay

---

## 📂 Project Structure

/client → Frontend (React + Vite)
/server → Backend (Node + Express)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/faizankhan308/Text-to-image-generator.git
cd Text-to-image-generator
```

---

### 2️⃣ Install dependencies

#### 📦 Client

```bash
cd client
npm install
```

#### 📦 Server

```bash
cd server
npm install
```

---

## 🔐 Environment Variables Setup

### 📁 Client (`client/.env`)

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

---

### 📁 Server (`server/.env`)

```env
PORT=5000

# JWT Authentication
JWT_SECRET=your_secret_key

# MongoDB Setup (required)
MONGODB_URI=your_mongodb_connection_string

# AI Image API (required)
CLIPDROP_API=your_clipdrop_api_key

# Razorpay Payment Integration
CURRENCY=INR
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 📸 Screenshots

(Add your UI screenshots here)

---

## 🚀 Future Improvements

* Image download option
* User dashboard
* Prompt history analytics

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and improve the project.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Author

Faizan Khan
