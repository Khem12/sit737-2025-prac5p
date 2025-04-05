# Dockerized Web Application

This project is a simple Dockerized web application. It includes a `Dockerfile` for containerizing the app, a `docker-compose.yml` for managing the environment, and a health check implementation to ensure the app is running correctly.


## 🚀 Features

- Dockerized application
- Docker Compose support
- Automatic container restart on failure
- Health checks to monitor application status

## 📦 Getting Started

Make sure Docker and Docker Compose are installed:

docker --version
docker-compose --version

Build the docker Image:
docker build . -t khemgrg/dockstart

View logs:
docker logs <container-id>

Run with docker compose:
docker-compose up -d

Health check:
docker inspect --format="{{json .State.Health}}" <container-id>
