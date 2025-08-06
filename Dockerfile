FROM hashicorp/vault:latest

# Expose Vault port
EXPOSE 8200

# Set environment variables for development mode
ENV VAULT_DEV_ROOT_TOKEN_ID="root"
ENV VAULT_DEV_LISTEN_ADDRESS="0.0.0.0:8200"

# Start Vault in development mode
CMD ["server", "-dev", "-dev-root-token-id=root", "-dev-listen-address=0.0.0.0:8200"]