'use strict';
require('dotenv').config();

function parseBool(v, fallback = false) {
  if (v === undefined || v === null || v === '') return fallback;
  return /^(1|true|yes|on)$/i.test(String(v));
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8300', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  readOnly: parseBool(process.env.DEMO_READONLY, true),
};

config.isProduction = config.env === 'production';

module.exports = config;
