Simple Calculator App on Kubernetes

This project demonstrates how to containerize a simple calculator APP and deploy it on a Kubernetes cluster using Pod, ReplicaSet, Deployment, and Service objects.

---

## 📦 App Overview

The app supports four endpoints:

- `GET /add?n1=2&n2=3` → Addition
- `GET /minus?n1=5&n2=2` → Subtraction
- `GET /multiple?n1=3&n2=4` → Multiplication
- `GET /divison?n1=10&n2=2` → Division

Runs on: `PORT 3040`

---

## 🐳 Docker Instructions

### 1. Build the Docker image
```bash
docker build -t khemgrg/calculatorapp .

2. Push the image to Docker Hub
docker push your-dockerhub-username/calculatorapp

☸ Kubernetes Instructions
Apply each YAML file using kubectl:

1. Create Deployment
kubectl apply -f createDeployment.yaml

2. Create Service
kubectl apply -f createService.yaml

Access the app
kubectl get svc

Get the proxy
- kubectl proxy

Get the token
kubectl -n kubernetes-dashboard create token admin-user



