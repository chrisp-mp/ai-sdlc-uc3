const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const promClient = require('prom-client');
const rateLimit = require('./middleware/rateLimit');
const auditLogger = require('./middleware/auditLogger');
const { oauth2 } = require('./middleware/auth/oauth2');
const { apiKeyAuth } = require('./middleware/auth/apiKey');
const { rbac } = require('./middleware/auth/rbac');
const errorHandler = require('./middleware/errorHandler');
const healthController = require('./controllers/healthController');
const policyController = require('./controllers/policyController');
const pricingController = require('./controllers/pricingController');
const renewalController = require('./controllers/renewalController');
const customerController = require('./controllers/customerController');

const app = express();

// Global middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(auditLogger());

// Metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Health
app.get('/health/live', healthController.liveness);
app.get('/health/ready', healthController.readiness);

// Policies
app.get('/regions/:region/policies', oauth2(['read']), rateLimit.perUser(), policyController.listPolicies);
app.post('/regions/:region/policies', oauth2(['write']), rbac(['agent', 'admin']), rateLimit.perEndpoint('createPolicy'), policyController.createPolicy);
app.get('/regions/:region/policies/:policyId', oauth2(['read']), policyController.getPolicy);
app.patch('/regions/:region/policies/:policyId', oauth2(['write']), rbac(['agent', 'admin']), policyController.updatePolicy);
app.post('/regions/:region/policies/:policyId/renewals', oauth2(['write']), rbac(['agent', 'admin']), renewalController.renewPolicy);

// Pricing
app.post('/regions/:region/pricing/quote', oauth2(['read']), pricingController.getQuote);

// Customers (basic examples)
app.get('/regions/:region/customers/:customerId', oauth2(['read']), customerController.getCustomer);
app.patch('/regions/:region/customers/:customerId', oauth2(['write']), rbac(['agent', 'admin']), customerController.updateCustomer);

// Service-to-service example (API key)
app.post('/internal/vendor/reporting', apiKeyAuth(), renewalController.vendorReport);

// Error handler (last)
app.use(errorHandler);

module.exports = app;

