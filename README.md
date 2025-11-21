# CS106-M-MVintageWebsite 

M&M Vintage – Full-Stack Web Project
A full-stack vintage clothing shopping website built using HTML, CSS, JavaScript (frontend) and Node.js, Express, MongoDB (backend).
Includes admin product management, user browsing features, and image upload via Google Cloud Storage.

✨ Features
👤 User Features
Browse products by category
View product detail page
Select sizes
“Buy Now” creates an order (no payment system included)
Signup & login (localStorage-based session)
Mobile-responsive UI (user pages only)

🛠️ Admin Features
Add new products
View product list
Product detail page
Update existing products
Delete products
Order management (status update: PAID → SHIPPING → DELIVERED)
Admin sidebar with user info + sign-out

☁️ Image Upload (Google Cloud Storage)
Admin can upload product images through /api/upload-image
Uses bucket: mia-image-upload
Credentials stored in .env + local key.json

📂 Tech Stack
Frontend
HTML, CSS
JavaScript
Responsive layout (PC + Mobile for user pages)
Backend
Node.js
Express.js
MongoDB + Mongoose
Google Cloud Storage SDK

Database
Three main collections:
Collection	Purpose
Users	Signup/Login data (fullname, email, password, phone, address, role)
Products	Product details, stock, categories, images
Orders	Order created when user clicks “Buy Now”


📁 Project Structure (Simplified)
project/
 ├── models/
 │    ├── User.js
 │    ├── Product.js
 │    └── Order.js
 ├── public/
 │    ├── *.html
 │    ├── css/
 │    ├── js/
 │    └── images/
 ├── server.js
 ├── .env
 └── package.json
