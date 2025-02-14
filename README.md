# URL Shortener

Overview

This project is a full-stack URL shortener application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to shorten URLs and generate QR codes for easy sharing and access. It also tracks the number of clicks on shortened URLs.

Features

- Shorten long URLs into unique short URLs
- Generate QR codes for shortened URLs
- Track the number of clicks on each short URL
- Redirect users to the original URL when visiting the shortened link
- Simple and clean UI for easy usage

Technologies Used

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- nanoid for generating unique short URLs
- qrcode for generating QR codes
- dotenv for environment variable management

Frontend:
- React.js
- Axios for API requests
- CSS for styling

Installation and Setup

1. Clone the repository:
   git clone https://github.com/yourusername/URL-SHORTENER.git
   cd URL-SHORTENER

2. Backend Setup:
   cd backend
   Install dependencies:
   npm install
   Create a .env file in the backend directory and add:
   DATABASE_URL=your_mongodb_connection_string
   Start the backend server:
   npm start

3. Frontend Setup:
   cd frontend
   Install dependencies:
   npm install
   Start the frontend server:
   npm start

Usage

1. Enter the long URL in the input field on the frontend.
2. Click the "Shorten" button to generate a shortened URL and QR code.
3. Copy the shortened URL or scan the QR code to visit the original URL.
4. The app tracks the number of times the shortened link is accessed.

API Endpoints

POST /api/short
- Request Body: { "originalUrl": "https://example.com" }
- Response: { "message": "URL Generated", "shortUrl": "http://localhost:3000/abcd1234", "qrCodeImg": "data:image/png;base64,..." }

GET /:shortUrl
- Redirects to the original URL if the short URL exists.

Future Improvements

- User authentication for managing shortened URLs
- Custom short URL aliases
- Analytics dashboard to track usage statistics

![Screenshot (122)](https://github.com/user-attachments/assets/b6fe6905-5740-474f-8198-c68ee80c224f)
![Screenshot (123)](https://github.com/user-attachments/assets/a0ae336c-84b0-4e7a-aef5-4960d97e3bcd)
![Screenshot (124)](https://github.com/user-attachments/assets/3da146a9-2c5c-487c-ae90-90277fa10c36)
![Screenshot (125)](https://github.com/user-attachments/assets/4d1505e7-ed66-4319-b3c5-6c7c513e1aa8)
