# HONEYPOT-FARM
Honeypot Farm is a cutting-edge SaaS platform that deploys thousands of virtual honeypots across cloud environments to mislead, trap, and study cyber attackers. By creating a maze of artificial network assets, Honeypot Farm turns your infrastructure into a proactive defense system.

🔐 Problem
Traditional cybersecurity tools focus on detection and response. However, attackers are becoming more sophisticated, using AI and quantum-resistant techniques to bypass defenses. Organizations need deceptive environments that confuse and slow down attackers while gathering actionable intelligence.
⸻
💡 Solution
Honeypot Farm offers:
• Massive-scale honeypot deployment across AWS, Azure, and GCP.
• AI-driven adaptive honeypots that evolve based on attacker behavior.
• Real-time threat intelligence and behavioral analytics.
• Compliance-ready architecture (HIPAA, GDPR, Safe AI Act).
⸻
🎯 Target Markets
• Enterprise Security Teams
• Managed Security Service Providers (MSSPs)
• Government & Healthcare
• Cloud-native Startups
⸻
📊 Business Model
• Subscription-based SaaS with tiered pricing.
• Add-ons for advanced analytics, compliance modules, and custom honeypot templates.
• API access for integration with SIEM, XDR, and SOC platforms.
⸻
🧠 Tech Stack
• Frontend: React + TypeScript
• Backend: FastAPI
• Infrastructure: Terraform + Trusted Execution Environments (TEE)
• Cloud: Azure, AWS, GCP
⸻
📈 Traction & Vision
• MVP in development
• Strategic partnerships in progress
• Vision: Become the standard for cyber deception in cloud-native environments

Honeypot Farm Backend Deployment Scripts
This repository contains deployment scripts for deploying the Honeypot Farm backend across multiple environments: Azure, AWS, GCP, and On-Prem.
⸻
🛠️ Prerequisites
Common
• Python 3.8+
• Docker
• Git
• SSH access (for on-prem deployment)
• Environment variables configured for each platform
⸻
☁️ Azure Deployment
Script: deploy_azure.sh
Prerequisites:
• Azure CLI installed and logged in
• Subscription with access to DCsv3-series VMs (Intel SGX)
• Resource group and virtual network created
Required Environment Variables:
• AZURE_CLIENT_ID
• AZURE_TENANT_ID
• AZURE_SUBSCRIPTION_ID
• AZURE_CLIENT_SECRET
• AZURE_RESOURCE_GROUP
• AZURE_LOCATION
Usage:
chmod +x deploy_azure.sh
./deploy_azure.sh

⸻
☁️ AWS Deployment
Script: deploy_aws.sh
Prerequisites:
• AWS CLI installed and configured
• EC2 key pair and security group set up
Required Environment Variables:
• AWS_ACCESS_KEY_ID
• AWS_SECRET_ACCESS_KEY
• AWS_REGION
Usage:
chmod +x deploy_aws.sh
./deploy_aws.sh

⸻
☁️ GCP Deployment
Script: deploy_gcp.sh
Prerequisites:
• GCP SDK installed
• Service account with compute admin permissions
Required Environment Variables:
• GCP_PROJECT_ID
• GCP_CLIENT_EMAIL
• GCP_PRIVATE_KEY
• GCP_REGION
Usage:
chmod +x deploy_gcp.sh
./deploy_gcp.sh

⸻
🏠 On-Prem Deployment
Script: deploy_onprem.sh
Prerequisites:
• SSH access to on-prem server
• Docker installed on target machine
Required Environment Variables:
• SSH_PRIVATE_KEY
• ONPREM_HOST
• ONPREM_USER
Usage:
chmod +x deploy_onprem.sh
./deploy_onprem.sh


✅ Your Docker setup for running HashiCorp Vault in development mode is added to Docker files: 

🧪 How to Use
1. Build and start Vault:
1. docker-compose up --build -d

2. Access Vault UI or CLI:
    • Web UI: http://localhost:8200
    • CLI:
    • export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=root
vault status

3. Store secrets:
3. vault kv put secret/honeypotfarm DB_PASSWORD=secure123 API_KEY=abc123


✅ Vault initialization and AppRole setup are now automated for the Honeypot Farm container.
📄 Download the updated files:
• Dockerfile
• docker-compose.yml
These files now support:
• Auto-initialization of Vault on container startup
• Unsealing and login with root token
• Enabling KV secrets engine
• Creating a read-only policy for honeypotfarm
• Configuring AppRole and saving ROLE_ID and SECRET_ID to files

Your backend is now configured to automatically inject secrets from Vault using AppRole credentials stored in container-mounted files.
📄 Updated files:
• Dockerfile
• docker-compose.yml
⸻
🔧 How It Works
• On backend startup, it reads ROLE_ID.txt and SECRET_ID.txt from the Vault container.
• Authenticates with Vault using AppRole.
• Retrieves secrets from secret/data/honeypotfarm.
• Injects them as environment variables for use in your FastAPI app.

✅ Error handling has been added to the Vault secret injection process in Honeypot Farm's backend.
📄 Updated files:
• Dockerfile
• docker-compose.yml
⸻
🛡️ Error Handling Features
• Logs if Vault is unreachable
• Logs if AppRole credentials are missing or unreadable
• Logs if authentication fails
• Logs if secrets cannot be retrieved
• Gracefully exits without crashing the backend

✅ Honeypot Farm's backend is now configured to send logs to a centralized logging system.
📄 Updated files:
• Dockerfile
• docker-compose.yml
⸻
🧠 Supported Logging Backends
• ELK Stack: via Syslog (LOGGING_BACKEND=elk)
• Loki: via HTTP push (LOGGING_BACKEND=loki)
🔧 Environment Variables
Set these in your .env or deployment config:
LOGGING_BACKEND=loki
LOGGING_HOST=localhost
LOGGING_PORT=3100

📝 Logs Sent
• Vault secret injection status
• Authentication success/failure
• Errors and warnings

Would you like help visualizing these logs in Grafana or Kibana dashboards?
post a request
