# Secure Task Management System (Nx Monorepo)

This repository contains a take-home implementation of a Secure Task Management System built with **Nx**, **NestJS**, and **Angular**.

The primary goal of this project was to demonstrate secure authentication, correct API behavior, testing discipline, and frontend-to-backend integration within a limited time window.

---

## Tech Stack

- Nx (monorepo tooling)
- NestJS (Backend API)
- Angular (Frontend dashboard using standalone components)
- SQLite (local development database)
- JWT authentication
- Postman (manual API testing)
- Jest (end-to-end testing)

---

## Prerequisites

Before running the project, please ensure you have the following installed:

- Node.js **18+**
- npm
- Postman (for API verification)

---

## Installation

From the **repository root directory**, install all dependencies:

```bash
npm install
```

---

## Running the Backend (API)

The backend is a NestJS application managed by Nx.

To start the API server, run:

```bash
npx nx serve api
```

What this does:
- Builds and starts the NestJS API
- Runs in watch mode for development

**API base URL:**

```
http://localhost:3000
```

A local SQLite database is automatically created for development.

---

## Running the Frontend (Dashboard)

The frontend is an Angular application managed by Nx.

To start the frontend:

```bash
npx nx serve dashboard
```

What this does:
- Starts the Angular development server
- Rebuilds automatically on file changes

**Frontend URL:**

```
http://localhost:4200
```

**Login page:**

```
http://localhost:4200/login
```

---

## Authentication User Flow (Postman Walkthrough)

Postman is the recommended tool for validating backend functionality.  
The steps below walk through a realistic user story from account creation to frontend login.

---

### Step 1: Register a User

Create a new user using the registration endpoint.

**Request**

```http
POST http://localhost:3000/api/auth/register
```

**Body (JSON)**

```json
{
  "email": "tokenuser@example.com",
  "password": "123456"
}
```

**Expected Result**

- User is created successfully
- Password is hashed securely
- The user is now eligible to log in

---

### Step 2: Log In (Obtain JWT Token)

Authenticate using the same credentials.

**Request**

```http
POST http://localhost:3000/api/auth/login
```

**Body (JSON)**

```json
{
  "email": "tokenuser@example.com",
  "password": "123456"
}
```

**Successful Response**

```json
{
  "access_token": "jwt-token-here"
}
```

This JWT token:
- Confirms authentication works correctly
- Can be used as a Bearer token for protected endpoints
- Is what the frontend stores on successful login

---

### Step 3: Frontend Login Verification

1. Open `http://localhost:4200/login`
2. Enter the same email and password
3. Click **Login**

**Expected Behavior**

- On success:
  - JWT token is saved to `localStorage`
  - A success message is displayed in the UI
- On failure:
  - A clear error message is shown

This confirms end-to-end integration between the frontend and backend.

---

## Task Functionality (Current State)

Task-related endpoints and UI were not fully completed within the time window.

Authentication, testing, and integration were prioritized to ensure a stable and verifiable foundation. Task functionality would be the next area to extend.

---

## Running Tests

### Backend End-to-End Tests

To run the backend E2E test suite:

```bash
npx nx run api-e2e:e2e
```

### What the Tests Demonstrate

- Authentication endpoints behave correctly
- JWT tokens are issued and validated
- Unauthorized requests are rejected
- Core API wiring functions end-to-end

All tests passing confirms the backend is stable and ready for further development.

---

## Project Scope & Tradeoffs

Due to the time constraints of the take-home exercise, not all planned features were completed.

I focused primarily on:
- Making sure authentication endpoints work correctly
- Writing and validating backend end-to-end tests
- Ensuring frontend and backend integrate cleanly
- Spending time on a clear, usable login UI

As a result, the following areas were not finished:

- Full task CRUD functionality
- Task-related frontend UI
- Role-based task permissions
- Production deployment configuration

Given additional time, these areas would be the next priorities. The current implementation is stable, testable, and structured to be extended without rework.

---

## Notes for Reviewers

- Postman is required to fully validate backend behavior
- The frontend demonstrates a complete login flow
- Tests passing is an important signal of API correctness
- The repository reflects a realistic, time-boxed submission
