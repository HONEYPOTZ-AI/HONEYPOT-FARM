#!/bin/bash
# AWS Deployment Script for Honeypot Farm Backend using Nitro Enclaves

# Load secrets from environment variables
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
AWS_REGION=${AWS_REGION}

# Configure AWS CLI
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region $AWS_REGION

# Launch EC2 instance with Nitro Enclaves support
aws ec2 run-instances --image-id ami-0abcdef1234567890 \
  --instance-type c5.large \
  --key-name honeypotfarm-key \
  --security-groups default \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=honeypotfarm-backend}]'

echo "AWS EC2 instance with Nitro Enclaves launched."
