# Monitoring & Observability

## Logging
- Structured JSON logs via src/utils/logger.js
- Include event type, correlationId, region, userId (when present)

## Metrics (Prometheus)
- Endpoint: `/metrics`
- Default Node process metrics via prom-client
- Add business KPIs: quotes issued, renewals processed, policy CRUD counts

## Health Checks
- Liveness: `/health/live`
- Readiness: `/health/ready`

## Alerting
- Suggested thresholds:
  - 5xx rate > 2% for 5 minutes
  - P95 latency > 500ms for 10 minutes
  - Circuit breaker open ratio > 10% for 5 minutes
- Escalation: on-call engineer -> team lead -> incident manager

