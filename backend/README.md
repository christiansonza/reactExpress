
# Report Management System

Features:
- User Login
- JWT Authentication
- Login Rate Limiting
- Protected Dashboard
- Unauthorized Page Redirect
- PDF Report Generation
- CSV Report Generation
- MongoDB Atlas Integration
- REST API Architecture

## Installation

Install dependencies for both frontend and backend:

- cd backend
- npm install

- cd frontend
- npm install


## Backend Environment Variables

Create a `.env` file inside the backend folder:

- MONGO_URI= located in .env.example

- JWT_SECRET= located in .env.example

- PORT= located in .env.example


## Seeding

To create the default admin account, run the seed script:

- cd backend
- node seed/seed.js


## Default Admin Account
After seeding, Use the following credentials to log in:

- Username: admin
- Password: admin123


## Run the Project

### Backend
- cd backend
- npm run dev

### Frontend
- cd frontend
- npm run dev
