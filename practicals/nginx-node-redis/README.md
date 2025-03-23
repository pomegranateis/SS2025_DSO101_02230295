# Docker Multi-Container Setup: Practical Report (Part 1)

## Objective
The aim of this exercise was to understand how to run and manage a multi-container application using Docker. Initially, containers were run individually using docker run, but later the process was simplified using Docker Compose.

## Key Concepts Learned
* Creating and using a Dockerfile inside application directories.
* Building Docker images with docker build.
* Running containers with docker run.
* Setting up a Docker bridge network using subnets for inter-container communication.
* Writing a docker-compose.yml file to manage services declaratively.

## Implementation Overview

1. Cloned the Sample Application

![alt text](img/image.png)

2. Built Docker Images
    * Created a Dockerfile in each application directory.
    * Built the images using docker build.
![alt text](img/image-1.png)
![alt text](img/image-2.png)

3. Created a Custom Network
To allow inter-container communication, a Docker bridge network with a subnet was created:

![alt text](img/image-3.png)

4. Ran Containers Individually
Each container was manually run and attached to the network.

![alt text](img/image-4.png)

5. Verify the containers are up by running **docker ps**

![alt text](img/image-5.png)

6. Tested the Application
The application was successfully accessed through:

```bash
http://localhost
```

![alt text](img/image-6.png)
![alt text](img/image-7.png)
![alt text](img/image-8.png)

Refreshing the page showed load balancing behavior between **web1** and **web2**, with Redis maintaining a shared visit counter.

## Simplified with Docker Compose

Later, the whole process was replaced with a **docker-compose.yml** file which automated:

* Image building
* Container startup
* Network creation
* Port mapping

This started all services and connected them through a shared network, significantly reducing manual overhead.

![alt text](img/image-9.png)
![alt text](img/image-10.png)

If you look at the Docker Desktop Dashboard, you can see the containers and dive deeper into their configuration.

![alt text](img/image-11.png)

Alternatively, you can use the Docker Desktop Dashboard to remove the containers by selecting the application stack and selecting the Delete button.

![alt text](img/image-12.png)

## Subnet Configuration

Special attention was given to:

Creating a custom Docker bridge network (sample-app) with a fixed subnet.

Verifying that containers received IPs within the subnet via:

![alt text](img/image-13.png)

## Cleanup

To stop and clean up the application stack:

![alt text](img/image-14.png)

## Conclusion

* I gained confidence in building and running multi-container applications using Docker.

* Understood the importance of Docker networks and subnets for container communication.

* Learned how Docker Compose simplifies multi-service deployments.