# Loan Origination & Approval System — Backend

A scalable and secure backend API for a Loan Origination & Approval System built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

This backend powers:

✅ Customer Registration/Login  
✅ Loan Applications  
✅ Loan Eligibility Scoring  
✅ Officer Review System  
✅ Loan Approval/Rejection Workflow  

---

# Tech Stack

- Node.js
- Express.js
- MongoDB Atlas / Local MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

# Features

## Authentication

- User Registration
- User Login
- JWT Token Generation
- Password Hashing
- Role-Based Access

---

## Customer Features

- Apply Loan
- Track Loan Status
- View Eligibility Score
- Loan History

---

## Officer Features

- View Pending Loans
- Approve Loans
- Reject Loans
- Review Customer Loan Details

---

# Project Structure

```bash
loan-app-backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── loanController.js
│   │   └── officerController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Customer.js
│   │   ├── LoanOfficer.js
│   │   └── LoanApplication.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── loanRoutes.js
│   │   └── officerRoutes.js
│   │
│   ├── services/
│   │   └── loanService.js
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md