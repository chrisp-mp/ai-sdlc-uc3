# Security Implementation

## Authentication & Authorization
- OAuth2 with JWT (RS256 via JWKS or HS256 secret fallback)
- Scopes: `read`, `write`; roles via `roles` claim used by RBAC
- API key header `X-API-Key` for trusted service-to-service integrations

## Data Protection
- AES-256-GCM encryption for sensitive fields at rest (`ENCRYPTION_KEY_HEX`)
- TLS termination at load balancer (in transit)

## RBAC
- Roles: policyholder, agent, admin, auditor
- Enforced on write/update endpoints and privileged operations

## Rate Limiting & Abuse Prevention
- Per-user and per-endpoint rate limiting
- Redis store recommended for multi-instance deployments

## Secrets Management
- Use environment variables and secret stores (AWS Secrets Manager/HashiCorp Vault)

## Threat Modeling Notes
- JWT replay: enforce reasonable expiries; consider jti blacklist for critical flows
- Key rotation: rotate JWKS and encryption key with dual-read window
- Input validation: validate request schemas (Joi/Zod) and sanitize outputs

