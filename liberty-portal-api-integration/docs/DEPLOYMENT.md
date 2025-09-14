# Deployment & Infrastructure

## Containerization
- Dockerfile builds Node.js app
- Environment via .env / platform secrets

## Local Development (docker-compose)
- Services: app, redis
- Optional: Postgres per region for production parity

## Production Recommendations
- Run behind HTTPS load balancer (TLS termination)
- Horizontal scaling with autoscaling (HPA)
- Stateless app; externalize session/cache to Redis
- Separate regional deployments to enforce data residency (SG, HK, AU)
- Use managed DBs in each region (RDS/Aurora/Cloud SQL) and VPC/network policies to restrict cross-region data flow
- Store logs centrally with region tags; ensure export complies with residency regulations

## CI/CD
- Build: npm ci, run tests, build image
- Scan: dependency and container scans
- Deploy: blue/green or rolling; health checks wired to readiness/liveness endpoints

## Configuration
- NODE_ENV, PORT, JWT_ISSUER, JWKS_URI, JWT_AUDIENCE
- API_KEYS, ENCRYPTION_KEY_HEX (32-byte hex)
- REDIS_URL

## Load Balancing & Failover
- LB across instances in a region; separate LBs per region
- Circuit breaker for external vendors + retry with backoff
- Use DNS/service discovery with region affinity

