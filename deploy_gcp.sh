#!/bin/bash
# GCP Deployment Script for Honeypot Farm Backend using Confidential VMs

# Load secrets from environment variables
GCP_PROJECT_ID=${GCP_PROJECT_ID}
GCP_CLIENT_EMAIL=${GCP_CLIENT_EMAIL}
GCP_PRIVATE_KEY=${GCP_PRIVATE_KEY}
GCP_REGION=${GCP_REGION}

# Authenticate using service account
echo "$GCP_PRIVATE_KEY" > gcp-key.json
gcloud auth activate-service-account $GCP_CLIENT_EMAIL --key-file=gcp-key.json
gcloud config set project $GCP_PROJECT_ID
gcloud config set compute/region $GCP_REGION

# Create Confidential VM
gcloud compute instances create honeypotfarm-backend \
  --machine-type=n2d-standard-2 \
  --image-family=ubuntu-2004-lts --image-project=ubuntu-os-cloud \
  --confidential-compute --zone=$GCP_REGION-a

echo "GCP Confidential VM deployed."
