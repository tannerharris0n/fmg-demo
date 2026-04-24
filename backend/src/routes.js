'use strict';
/**
 * Demo routes. Every endpoint returns fixture data from services/mockData.js.
 * Matches the surface area that the real FMG Console backend exposes so the
 * frontend is unchanged.
 */
const express = require('express');
const mock = require('./services/mockData');
const extra = require('./services/mockDataExtra');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
    mock: true,
    demo: true,
    time: new Date().toISOString(),
  });
});

router.get('/dashboard', (req, res) => {
  res.json({
    summary: mock.dashboardSummary(),
    atRisk: extra.atRisk(),
    sdwan: mock.sdwanOverlays(),
    vpn: mock.vpnTunnels(),
    ha: mock.haClusters(),
    firmware: mock.firmwarePosture(),
    fleet: mock.deviceFleet(),
    heatmap: mock.policyHeatmap(),
    threats: mock.threatActivity(),
    cves: mock.cveWatchlist(),
    drift: mock.driftAlerts(),
    audit: mock.adminAudit(),
    activity: mock.activityFeed(),
  });
});

router.get('/dashboard/at-risk', (req, res) => res.json(extra.atRisk()));

router.get('/devices',              (req, res) => res.json(mock.deviceFleet()));
router.get('/devices/:name/detail', (req, res) => {
  const detail = extra.deviceDetail(req.params.name);
  if (!detail) return res.status(404).json({ error: `Device "${req.params.name}" not found.` });
  res.json(detail);
});

router.get('/scripts',          (req, res) => res.json({ library: extra.scriptLibrary(), recentRuns: extra.scriptRuns() }));
router.get('/scripts/library',  (req, res) => res.json(extra.scriptLibrary()));
router.get('/scripts/runs',     (req, res) => res.json(extra.scriptRuns()));
router.get('/scripts/library/:id', (req, res) => {
  const script = extra.scriptLibrary().find((s) => s.id === req.params.id);
  if (!script) return res.status(404).json({ error: 'Not found' });
  res.json(script);
});

router.get('/settings',         (req, res) => res.json(extra.settings()));

router.get('/policy/packages',  (req, res) => res.json(mock.policyPackages()));
router.get('/policy/heatmap',   (req, res) => res.json(mock.policyHeatmap()));
router.get('/policy/profiles',  (req, res) => res.json(extra.policyProfiles()));
router.get('/objects',           (req, res) => res.json(extra.policyObjects()));
router.get('/objects/addresses', (req, res) => res.json(extra.policyObjects().addresses));
router.get('/objects/services',  (req, res) => res.json(extra.policyObjects().services));
router.get('/objects/schedules', (req, res) => res.json(extra.policyObjects().schedules));
router.get('/objects/vips',      (req, res) => res.json(extra.policyObjects().vips));
router.get('/tasks',            (req, res) => res.json(mock.tasks()));
router.get('/adoms',            (req, res) => res.json(mock.adoms()));
router.get('/analyzer',         (req, res) => res.json(mock.analyzerFindings()));

router.get('/install/:packageId/preview', (req, res) => {
  res.json(mock.installPreview(req.params.packageId));
});

router.get('/security/drift',          (req, res) => res.json(mock.driftAlerts()));
router.get('/security/drift/:device',  (req, res) => res.json(mock.driftDetail(req.params.device)));
router.get('/security/cves',           (req, res) => res.json(mock.cveWatchlist()));
router.get('/security/cves/:id',       (req, res) => res.json(mock.cveDetail(req.params.id)));
router.get('/security/audit',          (req, res) => res.json(mock.adminAudit()));
router.get('/security/audit/log',      (req, res) => res.json(extra.adminAuditLog()));
router.get('/security/threats',        (req, res) => res.json(mock.threatActivity()));
router.get('/security/threats/events',       (req, res) => res.json(extra.threatEvents()));
router.get('/security/threats/top-sources',  (req, res) => res.json(extra.threatTopSources()));
router.get('/security/threats/top-targets',  (req, res) => res.json(extra.threatTopTargets()));

router.get('/fabric/sdwan', (req, res) => res.json({
  overlays: mock.sdwanOverlays(),
  avgSla: 91,
  atRisk: 1,
}));
router.get('/fabric/sdwan/:overlay', (req, res) => res.json(extra.sdwanOverlayDetail(req.params.overlay)));
router.get('/fabric/vpn/ipsec',      (req, res) => res.json(extra.vpnIpsecTunnels()));
router.get('/fabric/vpn/ssl',        (req, res) => res.json(extra.sslVpnSessions()));
router.get('/fabric/ha',             (req, res) => res.json(extra.haClustersDetailed()));

// Preferences are session-local on the frontend (Zustand persist), so the
// demo doesn't need a user-specific preferences API. Return defaults.
router.get('/preferences', (req, res) => {
  res.json({ preset: 'network', hiddenTiles: [], tileOrder: null });
});

module.exports = router;
