🧩 SlotSwapper — Smart Schedule Exchange Platform

SlotSwapper is a full-stack web app that allows users to create, manage, and swap calendar events with others in real-time.
Think of it as a "time trading" platform — where busy users can mark their events as swappable, browse others’ available slots, and request swaps securely.

🚀 Live Features

✅ JWT Authentication — Secure login & register
✅ Dynamic Calendar — Add, edit, delete events with a beautiful UI
✅ Event Status Toggle — Mark slots as “Busy” or “Swappable” instantly
✅ Marketplace — Browse other users’ swappable slots
✅ Swap Requests — Send, accept, or reject swap offers
✅ Automatic Updates — Calendar refreshes instantly after a swap
✅ Responsive UI — Clean glassmorphic design with Tailwind + ShadCN UI

🛠️ Tech Stack
Frontend (Client)

⚡ Next.js 15 (App Router)

🎨 Tailwind CSS + ShadCN/UI

🔄 Axios for API requests

🧠 React Hooks & State Management

🍪 JWT stored securely in localStorage

🔔 React-Toastify for notifications

📅 Date-fns for date/time formatting

Backend (Server)

🚀 Node.js + Express.js

🗄️ MongoDB + Mongoose ORM

🔑 JWT Auth Middleware

🔁 RESTful APIs for events, users, and swaps

🧱 Modular MVC structure (controller, routes, models)

🌍 CORS configured for secure local + cloud connections


🧪 API Endpoints Overview
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get token
GET	/api/auth/me	Fetch current logged user
Events
Method	Endpoint	Description
GET	/api/events	Get my events
POST	/api/events	Create a new event
PUT	/api/events/:id	Update event or status
DELETE	/api/events/:id	Delete event
GET	/api/events/swappable	Get all available swap slots
Swaps
Method	Endpoint	Description
POST	/api/swaps/request	Create a new swap request
GET	/api/swaps/my-swaps	Get all incoming/outgoing swaps
POST	/api/swaps/accept/:id	Accept a swap
POST	/api/swaps/reject/:id	Reject a swap



🧰 Environment Variables

Create .env in backend/ folder:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Create .env.local in client/ folder (optional):

NEXT_PUBLIC_API_URL=http://localhost:3000/api



🖥️ Local Setup Guide
1️⃣ Clone Repo
git clone https://github.com/your-username/SlotSwapper.git
cd SlotSwapper


2️⃣ Setup Backend
cd backend
npm install
npm run dev


Backend runs on http://localhost:3000

3️⃣ Setup Frontend
cd ../client
npm install
npm run dev



🧠 How It Works

User A creates events and marks some as “Swappable”.

User B sees those slots in Marketplace.

User B selects a target event and offers one of their own.

The swap request is sent to User A.

User A can Accept or Reject from “Swap Requests”.

On Accept, both event timings are automatically exchanged 🎯

Both users see updated calendars instantly.



🧑‍💻 Author

👤 Mohan Kumhar
Full Stack Developer | AI Tools Enthusiast
📧 mohankumhar9693@gmail.com
