'use strict';
const config = require('../config');

function readOnly(req, res, next) {
  if (!config.readOnly) return next();
  const m = req.method.toUpperCase();
  if (m === 'GET' || m === 'HEAD' || m === 'OPTIONS') return next();
  return res.status(403).json({
    error: 'This is a read-only demo. Mutations are disabled.',
    demo: true,
  });
}

module.exports = { readOnly };
