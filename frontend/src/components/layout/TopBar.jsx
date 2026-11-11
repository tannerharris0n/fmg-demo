import { useLocation } from 'react-router-dom';
import { Share2, ShieldCheck, Search, Keyboard } from 'lucide-react';
import { Segmented } from '../common/Segmented';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Tooltip } from '../common/Tooltip';
import { useUiStore } from '../../stores/uiStore';
import { useAppStatus } from '../../hooks/useAppStatus';
import { useKeyboardShortcutsHelp } from '../../hooks/useKeyboardShortcuts';
import { modKey } from '../../lib/platform';

const TOP_LABELS = {
  devices:  'Devices',
  fabric:   'Network',
  policy:   'Policy',
  security: 'Security',
  tasks:    'Tasks',
  scripts:  'Scripts',
  settings: 'Settings',
  calendar: 'Change calendar',
  sase:     'SASE',
  switches: 'Switches',
  aps:      'Access points',
};

const SUB_LABELS = {
  'fabric/sdwan':     'SD-WAN',
  'fabric/vpn':       'VPN tunnels',
  'fabric/ha':        'HA clusters',
  'policy/packages':  'Packages',
  'policy/objects':   'Objects',
  'policy/profiles':  'Profiles',
  'policy/analyzer':  'Analyzer',
  'security/threats': 'Threats',
  'security/drift':   'Config drift',
  'security/audit':   'Admin audit',
  'security/cve':     'CVE watch',
};

/** Map the current path to a page title + breadcrumb trail. */
function buildBreadcrumbs(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return { title: 'Dashboard', crumbs: [] };

  if (parts.length === 1) {
    return { title: TOP_LABELS[parts[0]] || 'Not found', crumbs: [] };
  }

  // Device detail: /devices/:name
  if (parts[0] === 'devices' && parts.length === 2) {
    const name = decodeURIComponent(parts[1]);
    return {
      title: name,
      crumbs: [{ label: 'Devices', to: '/devices' }, { label: name }],
    };
  }

  const topLabel = TOP_LABELS[parts[0]] || parts[0];
  const subLabel = SUB_LABELS[`${parts[0]}/${parts[1]}`] || parts[1];
  return {
    title: subLabel,
    crumbs: [{ label: topLabel, to: `/${parts[0]}` }, { label: subLabel }],
  };
}

function Avatar() {
  return (
    <div
      className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-soft to-surface-700 ring-1 ring-sky-400/20 grid place-items-center text-2xs font-semibold text-sky-200"
      title="Signed in as TH"
    >
      TH
    </div>
  );
}

function DemoBadge() {
  return (
    <Tooltip content="Sample data only. Changes are disabled in this demo.">
      <span className="inline-flex items-center gap-1.5 px-2 h-[22px] rounded-full text-2xs font-semibold uppercase tracking-[0.1em] bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/30 whitespace-nowrap shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Demo<span className="hidden xl:inline"> · read-only</span>
      </span>
    </Tooltip>
  );
}

function LiveIndicator() {
  return (
    <span className="hidden xl:inline-flex items-center gap-1.5 text-xs text-ink-400 whitespace-nowrap">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-ping" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      Live · refreshes every 30s
    </span>
  );
}

export function TopBar({ showPreset = true }) {
  const { pathname } = useLocation();
  const { title, crumbs } = buildBreadcrumbs(pathname);
  const preset = useUiStore((s) => s.preset);
  const setPreset = useUiStore((s) => s.setPreset);
  const toggleCmdk = useUiStore((s) => s.toggleCmdk);
  const { data: status } = useAppStatus();
  const isDemo = status?.demo === true;
  const { setOpen: setHelp } = useKeyboardShortcutsHelp();

  const isDashboard = pathname === '/';

  return (
    <header className="shrink-0 flex items-center justify-between gap-4 px-6 h-[60px] border-b border-surface-600/60 bg-surface-950/80 backdrop-blur-md">
      <div className="min-w-0 flex-1 flex items-center gap-3 overflow-hidden">
        <div className="min-w-0">
          {crumbs.length > 0 && <Breadcrumbs items={crumbs} className="mb-0.5" />}
          <h1 className="text-lg font-semibold tracking-tight leading-6 truncate">{title}</h1>
        </div>
        {isDashboard && <LiveIndicator />}
        {isDemo && <DemoBadge />}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {showPreset && isDashboard && (
          <Segmented
            value={preset}
            onChange={setPreset}
            compact
            options={[
              { value: 'network',  label: 'Network',  icon: Share2 },
              { value: 'security', label: 'Security', icon: ShieldCheck },
            ]}
          />
        )}

        <button
          onClick={toggleCmdk}
          className="flex items-center gap-2 h-8 pl-2.5 pr-1.5 rounded-lg border border-surface-600 bg-surface-900 text-sm text-ink-400 hover:text-ink-200 hover:border-surface-500 transition xl:w-56"
          aria-label="Open command palette"
        >
          <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
          <span className="hidden xl:inline flex-1 text-left">Jump to…</span>
          <span className="kbd">{modKey} K</span>
        </button>

        <Tooltip content="Keyboard shortcuts (?)">
          <button
            onClick={() => setHelp(true)}
            className="h-8 w-8 grid place-items-center rounded-lg text-ink-400 hover:text-ink-50 hover:bg-surface-800 transition"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard className="h-4 w-4" strokeWidth={1.7} />
          </button>
        </Tooltip>

        <Avatar />
      </div>
    </header>
  );
}
