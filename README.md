# Hospital Management API

A RESTful Hospital Management API built using **Node.js**, **Express.js**, and **PostgreSQL (Neon Database)**.

---

## Features

### Doctor APIs
- Get all doctors
- Get doctor by ID
- Create doctor
- Update doctor
- Delete doctor
- Search doctors by department
- Get doctor's appointments

### Patient APIs
- Get all patients
- Get patient by ID
- Create patient
- Update patient
- Delete patient
- Search patients by city
- Patient appointment history
- Pagination

### Appointment APIs
- Get all appointments
- Get appointment by ID
- Create appointment
- Update appointment
- Delete appointment
- Filter by status
- Multiple filters
- Pagination

### Dashboard APIs
- Dashboard Summary
- Appointment Status Summary
- Top Doctors
- Department Workload

### Validation
- Required field validation
- Appointment status validation
- Doctor existence validation
- Patient existence validation

### Middleware
- Logger Middleware

### Error Handling
- Doctor not found
- Patient not found
- Appointment not found

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL (Neon)
- pg
- dotenv
- JavaScript (ES Modules)

---

## Installation

Clone the repository

```bash
git clone https://github.com/Tharaknadh-R/hospital-management-api.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=your_neon_database_url
PORT=3000
```

Run the project

```bash
npm start
```

or

```bash
node server.js
```

---

## API Base URL

```
http://localhost:3000/api
```

---

## Author

**Tharaknadh Ravipati**