# To-Do List Web Application

A simple full-stack To-Do List app with:

- **Frontend**: React  
- **Backend**: Node.js + Express  
- **Database**: PostgreSQL  
- **Optional**: Docker for containerization  
- **Deployment**: (Work-in-Progress) Render.com

---

## Features
- **CRUD** on tasks: Create, Read, Update (edit & toggle complete), Delete  
- **Optimistic UI**: instant feedback, rollback on error  
- **Loading & Error States**: disable buttons & show messages during network calls  
- **Environment-driven**: `.env` files for configuration  
- **Docker**: build & push images for both services  
- **(Planned) Deployment**: pushing to Docker Hub + Render.com  

---

## Prerequisites

- **Node.js** v14+ & **npm**  
- **PostgreSQL** v12+ (or Dockerized Postgres)  
- **Docker** & **Docker Hub** account (for container builds)  
- (Optional) **Render.com** account  

---

## Environment Variables

### Backend (`backend/.env`)

```dotenv
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=YourPostgresPassword
DB_NAME=todo_app
DB_PORT=5432
PORT=5000
```
### Frontend

```dotenv
REACT_APP_API_URL=http://localhost:5000
```

***Note***: For production, replace with the deployed backend URL (e.g. https://be-todo.onrender.com).

## Local Development

**1. Database Setup**
- ensure PostgreSQL is running locally.

- create the database and table

**2. Backend**

**3. Frontend**

**4. Docker**
- For both Frontend/Backend Image

We need to run:
```bash
docker build
docker docker push 
```

## Deployment (Render.com — In Progress)

Currently, backend deployment is still pending. Once live, update your frontend to point at the real backend URL and redeploy.

For API Endpoints, Request/Response bodies are JSON.

## Next Steps

Finish Render deployment & update README with live URLs

