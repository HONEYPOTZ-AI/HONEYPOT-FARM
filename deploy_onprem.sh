#!/bin/bash
# On-Prem Deployment Script for Honeypot Farm Backend using SSH and Docker

# Load secrets from environment variables
SSH_PRIVATE_KEY=${SSH_PRIVATE_KEY}
ONPREM_HOST=${ONPREM_HOST}
ONPREM_USER=${ONPREM_USER}

# Create SSH key file
echo "$SSH_PRIVATE_KEY" > id_rsa
chmod 600 id_rsa

# Copy backend files and deploy using Docker
scp -i id_rsa -r backend/ $ONPREM_USER@$ONPREM_HOST:/home/$ONPREM_USER/honeypotfarm-backend
ssh -i id_rsa $ONPREM_USER@$ONPREM_HOST << EOF
  cd honeypotfarm-backend
  docker build -t honeypotfarm-backend .
  docker run -d -p 8000:8000 honeypotfarm-backend
EOF

echo "On-prem backend deployed via SSH and Docker."
