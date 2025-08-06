#!/bin/bash
# Azure Deployment Script for Honeypot Farm Backend using TEE

# Load secrets from environment variables
AZURE_CLIENT_ID=${AZURE_CLIENT_ID}
AZURE_TENANT_ID=${AZURE_TENANT_ID}
AZURE_SUBSCRIPTION_ID=${AZURE_SUBSCRIPTION_ID}
AZURE_CLIENT_SECRET=${AZURE_CLIENT_SECRET}
AZURE_RESOURCE_GROUP=${AZURE_RESOURCE_GROUP}
AZURE_LOCATION=${AZURE_LOCATION}

# Login to Azure
az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
az account set --subscription $AZURE_SUBSCRIPTION_ID

# Create resource group
az group create --name $AZURE_RESOURCE_GROUP --location $AZURE_LOCATION

# Deploy DCsv3 VM with Intel SGX
az vm create --resource-group $AZURE_RESOURCE_GROUP --name honeypotfarm-backend-vm \
  --image UbuntuLTS --size Standard_DC2s_v3 \
  --admin-username azureuser --generate-ssh-keys \
  --security-type TrustedLaunch --enable-encryption-at-host true

echo "Azure TEE VM deployed successfully."
