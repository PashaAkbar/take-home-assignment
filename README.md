# Fullstack Boilerplate Project

Repository ini berisi aplikasi **Fullstack** yang terdiri dari:

* **Backend** → Golang REST API
* **Frontend** → React Application

Kedua aplikasi berada dalam **satu repository** tetapi berjalan sebagai **dua service terpisah**.

---

# Project Structure

```
fullstack-project/
│
├── backend/        # Golang REST API
│   ├── internal/
│   ├── script/
│   ├── Makefile
│   ├── go.mod
│   └── main.go
│
├── frontend/       # React + Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# Tech Stack

## Backend

* Golang
* Chi Router
* OpenAPI (oapi-codegen)
* Makefile
* JWT Authentication

## Frontend

* React
* Vite
* Redux Toolkit
* React Hook Form
* Zod
* TailwindCSS
* Vitest + React Testing Library

---

# Requirements

Pastikan sudah terinstall:

* **Go** ≥ 1.21
* **Node.js** ≥ 18
* **npm** / **pnpm**
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
git clone https://github.com/your-username/fullstack-project.git
cd fullstack-project
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

Swagger UI:

```
http://localhost:8080/swagger
```

---

# Backend Makefile Commands

```
make dep           install dependencies
make openapi-gen   generate openapi server code
make gen-secret    generate JWT secret
make run           run application locally
make build         build binary
```

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

### Authentication

* Login user
* JWT authentication
* Form validation menggunakan Zod

### Payments

* Fetch payments dari backend API
* Dashboard payments
* Integration dengan Redux store

### API Documentation

Backend menyediakan dokumentasi API menggunakan **Swagger UI**.

```
http://localhost:8080/swagger
```

---

# Testing

Frontend menggunakan:

```
npm run test
```

Tools:

* Vitest
* React Testing Library

---

# Development Flow

Jalankan backend terlebih dahulu:

```
cd backend
make run
```

Lalu jalankan frontend:

```
cd frontend
npm run dev
```

Frontend akan mengakses API di:

```
http://localhost:8080
```

---

# License

MIT License
