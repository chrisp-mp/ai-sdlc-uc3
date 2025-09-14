# Liberty Portal API Integration

A production-ready API integration system for Liberty Mutual's policy renewal workflow. Built with Node.js and Express, designed for multi-region deployments (Singapore, Hong Kong, Australia) with strong security, compliance, and observability.

## Features
- Customer portal REST APIs to view, modify, and renew policies
- Backend policy management (CRUD, renewals)
- Real-time premium calculation engine
- Multi-region support with region-specific business rules, currencies (SGD, HKD, AUD), and data residency separation
- Security: OAuth2 (JWT), API keys, AES-256-GCM encryption, RBAC
- Compliance: audit logging, GDPR/PDPA, data residency
- Performance: rate limiting, Redis caching, circuit breaker
- Observability: structured logging, Prometheus metrics, health checks

## Project Structure
- openapi/openapi.yaml — API specification (OpenAPI 3.0)
- src/ — source code (app, middleware, controllers, services, data, utils, config)
- config/ — environment and region configs
- tests/ — unit and integration tests (Jest)
- docker/ — Dockerfile and docker-compose
- docs/ — documentation

## Quick Start
1. Create environment file from example
   ```bash
   cp .env.example .env
   ```
2. Initialize and install dependencies (requires permission)
   ```bash
   npm init -y
   npm install express helmet cors compression express-rate-limit prom-client ioredis jsonwebtoken jwks-rsa axios
   npm install winston uuid http-errors joi opossum pino pino-pretty --save
   npm install jest supertest cross-env --save-dev
   ```
3. Run locally
   ```bash
   npm run dev
   ```
4. Run tests
   ```bash
   npm test
   ```

## Security
- OAuth2 JWT validation with JWKS
- API key verification for service-to-service calls
- AES-256-GCM encryption for sensitive fields at rest
- RBAC via roles in JWT claims

## Multi-Region & Data Residency
- Region is provided via path parameter `/regions/{region}` or header `X-Region`
- Separate DB connections per region; ensure data stays in-region

## Observability
- Structured logs to stdout
- Prometheus metrics at `/metrics`
- Liveness `/health/live`, Readiness `/health/ready`

## Deployment
See docs/DEPLOYMENT.md and docker/docker-compose.yml for local infra (app + Redis). Production guidance includes load balancers, HPA, and regional deployments.

## Compliance
See docs/COMPLIANCE.md for GDPR/PDPA notes and audit logging strategy.

