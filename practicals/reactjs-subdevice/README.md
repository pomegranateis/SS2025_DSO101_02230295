# Practical Report: Deploying a React Application with Docker and Nginx

## Overview

This practical demonstrates how to containerize a React application using Docker with a multi-stage build. The process includes building the app with Node.js and serving the optimized static files with Nginx.

## Prerequisites

- **Docker** installed on your system.
- A **React application** (e.g., created with Create React App).
- Basic familiarity with Docker commands and multi-stage builds.

## Steps and Implementation

### 1. Clone the repository and **checkout** to the development branch

![alt text](img/dev.png)

Before proceeding any further to create the Docker configuration

Install the application’s libraries via npm install/ yarn install

Run the application to make sure it is working as expected locally

**YOU SHOULD BE FACING ISSUES -> NODE VERSION ISSUES
![alt text](img/node.png)
![alt text](img/node1.png)
Hint: you might need to drop your node version to 16 or below**

![alt text](img/fix.png)

![alt text](img/fix1.png)
![alt text](img/fix2.png)

### 2. Create a Dockerfile.test
Create a Dockerfile.test under the React App (subsdevices) on the root working directory

![alt text](img/test.png)

### 3. Build the Docker Image

![alt text](img/di.png)

### 4. Run the Docker Image as Container

- Use port forward and volume mounting, once it is up and running

![alt text](img/run.png)

**OR** run from Docker GUI

![alt text](img/gui.png)

*You might face this issue when running the built image

![alt text](img/error.png)

**Choosing an exact node version** -> 16

- After defining the version. Rebuild your image

![alt text](img/fix3.png)

**In order to exit the container , issue the subcommand ps to look for the container id and stop it**

![alt text](img/ps.png)
![alt text](img/stop.png)

### 5. Create a docker-compose.yml file

![alt text](img/yml.png)

**Start the docker container using docker compose.**

![alt text](img/start.png)

To verify that the app is running. Open your web browser -> http://localhost:3000.

![alt text](img/3000.png)

Execute the following command. Implement test on separate container, please replace the placeholder value of the container id on the exec command.

![alt text](img/ps1.png)
![alt text](img/sh.png)

In order to exit the shell out back to the host OS, type exit on the container shell

![alt text](img/run1.png)

**Add test service in the docker compose yml file, save the yml**

![alt text](img/yml1.png)

**Stop the container by using the below command**

![alt text](img/stop1.png)

### 6. Create a Dockerfile for Multi-Stage Build

Let's continue building a multi step build process, different base images, **create a NEW Dockerfile with the name Dockerfile** and copy paste the below to the Dockerfile

![alt text](img/yml2.png)

**Rebuild and Start the docker container using docker compose, in order to incorporate the test service.**

![alt text](img/build.png)

Check whether the container is up and running by issuing the below command
**(there should be 2 containers running)**

![alt text](img/ps2.png)

**Once both the services is running stop the container**

![alt text](img/stop2.png)

**Build the multi phase container setup, DO NOT terminate this process. Wait till the following show up Successfully built image id**

* Move Dockerfile.test out of the root directory.
* Might need to upper case the "as" to "AS" in the Dockerfile

![alt text](img/build1.png)

* Take note of the the image id.

**Build the multi phase container setup, DO NOT terminate this process. Wait till the following show up Successfully built image id OR CHECK DOCKER DESKTOP GUI**

Start the multi phase container setup and expose the port, please replace the hash value of the container id.

![alt text](img/start1.png)

Check whether the container is up and running by issueing the below command

![alt text](img/1.png)

Launch your browser and try accessing the app at localhost:80

![alt text](img/2.png)
![alt text](img/3.png)

## Conclusion

This practical demonstrated:

* How to address Node.js dependency and OpenSSL issues using --legacy-peer-deps and NODE_OPTIONS=--openssl-legacy-provider.

* The creation of a multi-stage Dockerfile to efficiently build and deploy a React application.

* The process of cleaning up the Docker environment, building the image, and running the container with Nginx serving the static files.

This report encapsulates the troubleshooting journey from encountering Node.js issues to achieving a successful Dockerized deployment of the React application.
