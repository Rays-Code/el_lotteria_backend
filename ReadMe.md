Here’s your updated `README.md` for the backend, now including a link to the frontend:

---

````markdown
# 🎯 El Lotteria Backend

This is the backend for the El Lotteria game — a real-time, grid-based lottery-style game. Built using **Node.js**, **Express**, and **MongoDB (Mongoose)**.

🔗 **Live Demo**: [https://el-lotteria-frontend.vercel.app/](https://el-lotteria-frontend.vercel.app/)

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling for Node.js

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/el-lotteria-backend.git
cd el-lotteria-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory with the following:

```env
MONGO_URI=YOUR_MONGODB_URI
PORT=3000
```

> 💡 **Note:** MongoDB must be running as a **replica set** for real-time change streams to function.

### 4. Start the server

```bash
node server.js
```

---

## 📁 Project Structure

```
├── models/           # Mongoose schemas
├── routes/           # Express routes
├── controllers/      # Route logic
├── changeStreams/    # MongoDB watchers
├── config/           # Database connection
├── server.js         # Main entry point
└── .env              # Environment variables
```

---

## 📬 API Endpoints

* `POST /api/game/start` – Start a new game
* `POST /api/game/draw` – Draw the next number
* `POST /api/game/stop` – Stop and reset the game
* `GET  /api/game/state` – Get current game state

---

## 📄 License

MIT – feel free to use and adapt.

```


