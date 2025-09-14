# Error Handling Strategies

## Standard Error Format
All API errors return JSON:
```json
{
  "code": "ERROR_CODE",
  "message": "Human-friendly message",
  "details": { "field": "info" },
  "correlationId": "uuid"
}
```

## Categories
- 4xx: Validation, auth, RBAC, not found
- 5xx: Unexpected server or dependency failures

## Retries & Backoff
- Client-side: retry idempotent GET/HEAD with exponential backoff
- Server-side: circuit breaker wraps vendor calls; retry transient failures (timeouts >= 5s)

## Graceful Degradation
- Serve cached responses for popular reads when dependencies down
- Fallback to default pricing factors when market feeds unavailable, with warning in breakdown

## Validation
- Validate request schemas (Joi/Zod) before controllers (add later as needed)

## Correlation
- Use header `X-Correlation-Id` if present; otherwise generated per request and included in logs & error responses

