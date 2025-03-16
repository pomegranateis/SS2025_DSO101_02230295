# Docker Compose Quickstart

## Overview
This practical session focused on using Docker Compose  to develop and deploy a multi-container Python web application. The application integrates Redis as a hit counter Throughout this project, we will be using the following technologies:

## Pre-requisites

- Docker and Docker Compose
- Programming Knowledge
- Dependencies:
    - Python libraries: Flask, Redis
    - Docker images: py**thon:3.10-alpine** and **redis:alpine**

## Project Setup and Implementation

1. Project Directory Setup

Create a project directory named **composetest**:
```bash
mkdir composetest
cd composetest
```

2. Application Code (**app.py**)
* Developed a Python web application using Flask.
* Integrated Redis to maintain a hit counter with a basic retry loop for resiliency.

![alt text](/images/app.png)

3. Dependency Management (**requirements.txt**)

Created **requirements.txt** to list the project dependencies: 
```bash
flask
redis
```

4. Dockerfile Creation

* Wrote a **Dockerfile** to define the container environment using the Alpine-based Python image:
```dockerfile
FROM python:3.10-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run", "--debug"]
```

* **Note**: Dockerfile should not have an extension.

![alt text](/images/dockerfile.png)

5. Compose File Definition (**compose.yaml**)

* Created a **compose.yaml** file to define two services: **web** and **redis**:
```yaml
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
```
* This configuration builds the Flask application and pulls the Redis image from Docker Hub.

![alt text](/images/compose.png)

6. Building and Running the Application

* Executed the command to build and run the containers:
```bash
docker compose up
```
* Verified that:
    - The application is accessible at **http://localhost:8000**
    - The hit counter increments with each page refresh.

![alt text](/images/hitcounter.png)
![alt text](/images/browser.png)

7. Enabling Live Code Updates with Compose Watch

* Updated **compose.yaml** to enable live code syncing:
```yaml
services:
  web:
    build: .
    ports:
      - "8000:5000"
    develop:
      watch:
        - action: sync
          path: .
          target: /code
  redis:
    image: "redis:alpine"
```
* Modified **app.py** (e.g., changed the greeting message) to see real-time updates without rebuilding the container.

![alt text](/images/watch.png)

8. Experimenting with Additional Commands

* Ran containers in detached mode:
```bash
docker compose up -d
```
![alt text](/images/1.png)

* Checked running containers and local images:
```bash
docker compose ps
docker image ls
```
![alt text](/images/2.png)

* Stopped the services:
```bash
docker compose down
```
![alt text](/images/3.png)

## Conclusion

This practical session provided hands-on experience with Docker Compose, allowing me to efficiently build, run, and update a multi-container application. The insights gained from configuring services, enabling live updates, and using Docker Compose commands have prepared me to tackle more complex container orchestration challenges in future projects.

## Lessons Learned
* Simplified Orchestration: Docker Compose streamlines the management of multi-container applications.

* Resilience & Efficiency: Incorporating retry logic and live code updates enhances application resiliency and speeds up development.

* Modularity: Splitting services (e.g., using a separate **infra.yaml** for Redis) improves modularity and maintainability.