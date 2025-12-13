# 🛒 Dukkan Store – React E-Commerce Application

Dukkan Store is a modern, frontend-focused e-commerce web application built with **React**.  
It provides a complete shopping experience for users and a dedicated admin dashboard for product management.

This project was developed as a **portfolio and learning project** to demonstrate practical skills in React, state management, UI/UX design, and real-world application logic.

---

## 🚀 Live Demo

🔗 **Live Website:** https://mkhalfadel.github.io/DukkanStore/  

### 🔐 Admin Demo Access
> ⚠️ **Note:** This is a frontend-only demo.

- **Admin Password:** `admin123`
- Admin page is accessible for demonstration purposes only.

---

## ✨ Features

### 👤 User Features
- Browse all available products
- View detailed product information
- Filter products by category
- Sort products (price, name, etc.)
- Search products by name
- Add products to cart
- Persistent cart using `localStorage`
- WhatsApp checkout with pre-filled cart message
- Confirmation popup before cart is cleared
- Empty-state illustrations (cart & search)
- Dark / Light mode toggle
- Scroll-to-top button

---

### 🛠️ Admin Features
- Admin authentication (password-protected)
- Add new products
- Edit existing products
- Delete products
- Freeze / unfreeze products
- Search products by name or ID
- Visual alerts for actions (add, update, delete)
- Separate admin UI styling for clarity

> ℹ️ Admin authentication is implemented on the frontend only and is **not intended for production use**.

---

## 🧱 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** MockAPI (temporarliy just to simulate a backend)
- **Styling:** CSS Modules
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Routing:** React Router
- **Persistence:** Local Storage
- **Deployment:** GitHub Pages
- **Linting:** ESLint

---

## 📁 Project Structure
src/
├── assets/ # Images & icons
├── components/ # Reusable UI components
├── pages/ # Application pages
├── context/ # Shared state logic
├── utils/ # Helper functions
├── styles/ # CSS Modules
├── App.jsx
└── main.jsx


---

## ⚙️ Environment Variables

Admin authentication uses environment variables.

Create a `.env` file in the project root:


> 📌 The `.env` file is included in `.gitignore` and is **not pushed to GitHub**.

For the live demo, a **separate demo password** is used.

---

## 🛡️ Security Disclaimer

This project is **frontend-only**.

- Admin authentication is **not secure**
- No Real backend or database is used

This is intentional, as the project is designed for **learning and portfolio demonstration**, not production deployment.

---

## 🧪 Installation & Setup

1. Clone the repository:

2. Navigate to the project folder:

3. Install dependencies:

4. Create a `.env` file and add admin password:

5. Start the development server:

---

## 📌 Future Improvements
- Backend integration (Node.js / Firebase) 
- Secure authentication system
- Pagination or infinite scrolling
- Product image previews in admin panel
- Role-based access control

---

## 👨‍💻 Author

**Mkhal Fadel**  
Computer Science Student  
Frontend Developer (React)

- GitHub: https://github.com/MkhalFadel
- LinkedIn: https://linkedin.com/in/mkhal-fadel-326979364/

---

## 📄 License

This project is for educational and portfolio purposes only.

