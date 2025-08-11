#!/bin/bash

# Honeypot Farm Backend Deployment Script for On-Prem Environments
# This script assumes TEE-compatible hardware (e.g., Intel SGX or AMD SEV)

# Exit on error
set -e

echo "Starting Honeypot Farm backend deployment..."

# Check for required tools
REQUIRED_TOOLS=("docker" "openssl" "tee-sgx-driver")
for tool in "${REQUIRED_TOOLS[@]}"; do
    if ! command -v $tool &> /dev/null; then
        echo "Error: $tool is not installed. Please install it before proceeding."
        exit 1
    fi
done

# Create secure enclave directory
mkdir -p /opt/honeypotfarm/enclave
echo "Created secure enclave directory at /opt/honeypotfarm/enclave"

# Generate TLS certificates for secure communication
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /opt/honeypotfarm/enclave/server.key \
    -out /opt/honeypotfarm/enclave/server.crt \
    -subj "/C=US/ST=Cyber/L=Security/O=HoneypotFarm/OU=Backend/CN=localhost"

echo "TLS certificates generated."

# Build and run backend service in Docker with TEE support
cat <<EOF > /opt/honeypotfarm/Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY . /app
RUN pip install fastapi uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "/opt/honeypotfarm/enclave/server.key", "--ssl-certfile", "/opt/honeypotfarm/enclave/server.crt"]
EOF

echo "Dockerfile created."

# Build Docker image
docker build -t honeypotfarm-backend /opt/honeypotfarm

# Run Docker container with TEE-compatible runtime (example assumes SGX support)
docker run -d --name honeypotfarm-backend \
    --device /dev/sgx_enclave --device /dev/sgx_provision \
    -p 443:443 honeypotfarm-backend

echo "Honeypot Farm backend deployed successfully in TEE-compatible environment."
