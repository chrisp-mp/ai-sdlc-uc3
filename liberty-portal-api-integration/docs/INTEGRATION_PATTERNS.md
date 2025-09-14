# Integration Patterns

## Service-to-Service Communication
- Use API keys (`X-API-Key`) for trusted internal calls
- Prefer mTLS or private networking for internal traffic
- Circuit breaker wrapper `src/middleware/circuitBreaker.js`
- Example vendor integrations: `src/services/vendor/*.js`

## Event-Driven Architecture
- Local event bus abstraction in `src/services/events/eventBus.js`
- In production, replace with Kafka/PubSub/SNS; keep topic names stable and payload schemas versioned
- Emit events for policy.created, policy.updated, policy.renewed

## Database Integration Patterns
- Repository layer `src/data/repository.js` abstracts data access per region
- For production, implement region-scoped repositories (e.g., Postgres per region) and inject via config
- Ensure writes/reads stay within region to satisfy residency requirements

## External Vendor Integrations
- Wrap all calls with circuit breaker and timeouts
- Map vendor errors to standardized error format
- Implement idempotency keys for payment/renewal operations

