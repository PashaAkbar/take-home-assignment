# Fullstack Boilerplate Project

Repository ini berisi aplikasi **Fullstack** yang terdiri dari dua bagian utama:

* **Backend** → REST API menggunakan **Golang**
* **Frontend** → Web application menggunakan **React**

Kedua aplikasi berada dalam **satu repository** namun berjalan sebagai **service terpisah**.

---

# Project Structure

```
take-home-assignment/
│
├── backend/                     # Golang REST API
│   ├── internal/
│   │   ├── api/                 # API handler layer
│   │   ├── config/              # Application configuration
│   │   ├── entity/              # Domain entities
│   │   ├── module/              # Business modules
│   │   │   ├── auth/
│   │   │   │   ├── handler/
│   │   │   │   ├── repository/
│   │   │   │   └── usecase/
│   │   │   └── payment/
│   │   │       ├── handler/
│   │   │       ├── repository/
│   │   │       └── usecase/
│   │   │
│   │   ├── openapigen/          # Generated OpenAPI server code
│   │   ├── service/             # HTTP server setup
│   │   └── transport/           # Transport utilities
│   │
│   ├── script/                  # Utility scripts
│   │   └── gen-secret/          # JWT secret generator
│   │
│   ├── vendor/
│   ├── .env
│   ├── env.sample
│   ├── dashboard.db             # SQLite database (seed data)
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   ├── Makefile
│   └── README.md
│
├── frontend/                    # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── test/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
├── openapi.yaml
└── README.md
```

---

# Tech Stack

## Backend

* Golang
* Chi Router
* OpenAPI (`oapi-codegen`)
* JWT Authentication
* SQLite
* Makefile

## Frontend

* React
* Vite
* Redux Toolkit
* React Hook Form
* Zod
* TailwindCSS
* Vitest
* React Testing Library

---

# Requirements

Pastikan environment memiliki:

* **Go ≥ 1.21**
* **Node.js ≥ 20**
* **npm**
* **Make**

Cek instalasi:

```
go version
node -v
npm -v
make -v
```

---

# Clone Repository

```
git clone https://github.com/PashaAkbar/take-home-assignment.git
cd take-home-assignment
```

---

# Running Backend

Masuk ke folder backend:

```
cd backend
```

Install dependencies:

```
make dep
```

Generate OpenAPI server code:

```
make openapi-gen
```

Generate JWT secret:

```
make gen-secret
```

Run backend server:

```
make run
```

Backend akan berjalan di:

```
http://localhost:8080
```

---

# API Documentation (Swagger)

Swagger UI tersedia di:

```
http://localhost:8080/swagger/index.html
```

OpenAPI JSON spec:

```
http://localhost:8080/swagger/doc.json
```

---

# Database Seed

Project ini menggunakan **SQLite** sebagai database persistence.

Database sudah disediakan dalam file:

```
backend/dashboard.db
```

File ini sudah berisi **sample data payments** sehingga aplikasi dapat langsung dijalankan tanpa perlu migration tambahan.

Contoh data pembayaran yang tersedia:

| Payment ID | Merchant   | Amount | Status     |
| ---------- | ---------- | ------ | ---------- |
| 1          | Merchant A | 10000  | completed  |
| 2          | Merchant B | 5000   | processing |
| 3          | Merchant C | 8000   | failed     |

Status pembayaran yang tersedia:

```
completed
processing
failed
```

Data ini akan otomatis terbaca ketika backend dijalankan.

---

# Test Credentials

Gunakan akun berikut untuk login ke dashboard:

Email:

```
cs@durianpay.id
```

Password:

```
password
```

Role yang tersedia:

```
cs
operation
```

---

# Backend Makefile Commands

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `make dep`         | install Go dependencies      |
| `make openapi-gen` | generate OpenAPI server code |
| `make gen-secret`  | generate JWT secret          |
| `make run`         | run backend locally          |
| `make build`       | build binary                 |

Build binary:

```
make build
```

Binary akan berada di:

```
backend/bin/mygolangapp
```

---

# Running Frontend

Masuk ke folder frontend:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Frontend akan berjalan di:

```
http://localhost:5173
```

---

# Features

## Authentication

* User login
* JWT authentication
* Password validation menggunakan **bcrypt**
* Form validation menggunakan **Zod**

## Payments

* Fetch list of payments
* Filter payments berdasarkan status
* Dashboard UI menampilkan payments

## API Documentation

Endpoint utama:

```
GET /dashboard/v1/payments
POST /dashboard/v1/auth/login
```

Swagger UI:

```
http://localhost:8080/swagger/index.html
```

---

# Testing

## Backend Unit Test

Backend menggunakan **Go built-in testing**.

Menjalankan semua unit test:

```
cd backend
go test ./... -v
```

Package yang memiliki unit test:

```
internal/module/auth/usecase
internal/module/payment/usecase
```

Melihat test coverage:

```
go test ./... -cover
```

---

## Frontend Test

Frontend menggunakan **Vitest** dan **React Testing Library**.

Menjalankan unit test:

```
cd frontend
npm run test
```

---

# Development Flow

1️⃣ Jalankan backend terlebih dahulu

```
cd backend
make run
```

2️⃣ Jalankan frontend

```
cd frontend
npm run dev
```

3️⃣ Akses aplikasi

Frontend:

```
http://localhost:5173
```

Backend API:

```
http://localhost:8080
```

Swagger UI:

```
http://localhost:8080/swagger/index.html
```

---

