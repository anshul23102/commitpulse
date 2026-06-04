/**
 * lib/timeout-config.ts
 *
 * Centralized timeout configuration for GraphQL and REST API endpoints.
 * Allows configuration via environment variables for different network conditions.
 */

export const TIMEOUT_CONFIG = {
  GRAPHQL_TIMEOUT_MS: parseInt(process.env.GRAPHQL_TIMEOUT_MS || '8000', 10),
  REST_TIMEOUT_MS: parseInt(process.env.REST_TIMEOUT_MS || '5000', 10),
  DEFAULT_TIMEOUT_MS: parseInt(process.env.DEFAULT_TIMEOUT_MS || '10000', 10),
};

// Validate timeout values
if (TIMEOUT_CONFIG.GRAPHQL_TIMEOUT_MS < 1000) {
  console.warn('GRAPHQL_TIMEOUT_MS < 1000ms may be too short. Recommended minimum: 3000ms');
}

if (TIMEOUT_CONFIG.REST_TIMEOUT_MS < 1000) {
  console.warn('REST_TIMEOUT_MS < 1000ms may be too short. Recommended minimum: 2000ms');
}

export default TIMEOUT_CONFIG;
