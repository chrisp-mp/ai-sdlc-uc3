# Compliance & Governance

## Audit Logging
- All API requests are logged with: method, path, status, userId, region, duration, correlationId
- Sensitive data is never logged; ensure payload filtering when adding new fields

## Data Residency
- Region is required in request path: `/regions/{region}`
- Data access routed to region-specific stores (see data layer). For demo, in-memory per region; in prod, separate DBs/clusters per region

## GDPR/PDPA
- PII encrypted at rest using AES-256-GCM (see middleware/security/encryption.js)
- Data subject rights: implement endpoints for export/delete on top of repository layer in each region
- Retention: configure TTL/jobs per region based on regulatory rules

## Consent & Purpose Limitation
- Access via OAuth2 scopes; RBAC enforces least privilege
- Event/audit trails retained securely per region

