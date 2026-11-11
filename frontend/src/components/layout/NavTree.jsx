import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  LayoutGrid,
  Server,
  Share2,
  FileText,
  ShieldCheck,
  Zap,
  Code2,
  Settings,
  ChevronRight,
  Cloud,
  Calendar,
} from 'lucide-react';
import { StatusDot } from '../common/StatusDot';

const NAV = [
  { kind: 'item', to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },

  { kind: 'group', label: 'Infrastructure' },
  {
    kind: 'item', to: '/devices', label: 'Devices', icon: Server, badge: '47',
    children: [
      { to: '/devices', label: 'All devices' },
      { to: '/devices?view=site', label: 'By site' },
      { to: '/devices?view=unmanaged', label: 'Unmanaged', badge: '2', badgeTone: 'warning' },
      { to: '/devices?view=firmware', label: 'Firmware' },
    ],
  },
  {
    kind: 'item', to: '/fabric/sdwan', base: '/fabric', label: 'Network', icon: Share2,
    children: [
      { to: '/fabric/sdwan', label: 'SD-WAN' },
      { to: '/fabric/vpn',   label: 'VPN tunnels', badge: '34', badgeTone: 'success' },
      { to: '/fabric/ha',    label: 'HA clusters' },
      { to: '/switches',     label: 'Switches' },
      { to: '/aps',          label: 'Access points' },
    ],
  },
  { kind: 'item', to: '/sase', label: 'SASE', icon: Cloud, badge: '342', badgeTone: 'info' },

  { kind: 'group', label: 'Policy & security' },
  {
    kind: 'item', to: '/policy/packages', base: '/policy', label: 'Policy', icon: FileText, badge: '11', badgeTone: 'warning',
    children: [
      { to: '/policy/packages', label: 'Packages' },
      { to: '/policy/objects',  label: 'Objects' },
      { to: '/policy/profiles', label: 'Profiles' },
      { to: '/policy/analyzer', label: 'Analyzer', badge: '11', badgeTone: 'warning' },
    ],
  },
  {
    kind: 'item', to: '/security/threats', base: '/security', label: 'Security', icon: ShieldCheck, badge: '9', badgeTone: 'danger',
    children: [
      { to: '/security/threats', label: 'Threats' },
      { to: '/security/drift',   label: 'Config drift', badge: '4', badgeTone: 'danger' },
      { to: '/security/audit',   label: 'Admin audit' },
      { to: '/security/cve',     label: 'CVE watch', badge: '5', badgeTone: 'warning' },
    ],
  },

  { kind: 'group', label: 'Operations' },
  { kind: 'item', to: '/calendar', label: 'Change calendar', icon: Calendar, badge: '8', badgeTone: 'info' },
  { kind: 'item', to: '/tasks',    label: 'Tasks',    icon: Zap,   badge: '1', badgeTone: 'info' },
  { kind: 'item', to: '/scripts',  label: 'Scripts',  icon: Code2 },
  { kind: 'item', to: '/settings', label: 'Settings', icon: Settings },
];

const BADGE = {
  warning: 'bg-amber-400/10 text-amber-300',
  danger:  'bg-rose-500/15 text-rose-300',
  success: 'bg-emerald-500/10 text-emerald-300',
  info:    'bg-sky-400/10 text-sky-300',
  neutral: 'bg-surface-700 text-ink-400',
};

function CountBadge({ value, tone = 'neutral' }) {
  return (
    <span className={clsx(
      'min-w-[22px] px-1.5 h-[18px] inline-flex items-center justify-center rounded-full text-2xs font-semibold tabular-nums',
      BADGE[tone] || BADGE.neutral,
    )}>
      {value}
    </span>
  );
}

/** Does `to` (which may carry a query string) match the current location? */
function matches(to, location) {
  const [path, query = ''] = to.split('?');
  if (location.pathname !== path) return false;
  const want = new URLSearchParams(query).get('view') || '';
  const have = new URLSearchParams(location.search).get('view') || '';
  return want === have;
}

function childPaths(item) {
  return [item.to, ...(item.base ? [item.base] : []), ...(item.children || []).map((c) => c.to.split('?')[0])];
}

function ItemRow({ item }) {
  const location = useLocation();
  const Icon = item.icon;
  const hasChildren = item.children?.length > 0;

  const sectionActive = hasChildren
    ? childPaths(item).some((p) => location.pathname === p || location.pathname.startsWith(p + '/'))
    : false;

  const [open, setOpen] = useState(sectionActive);
  // Keep the active section expanded as the route changes.
  useEffect(() => { if (sectionActive) setOpen(true); }, [sectionActive]);

  return (
    <div>
      <div className="relative group/row">
        <NavLink
          to={item.to}
          end={item.end}
          className={({ isActive }) => {
            const active = isActive || sectionActive;
            return clsx(
              'relative flex items-center gap-2.5 pl-2.5 pr-2 h-8 rounded-md text-sm transition-colors',
              active
                ? 'bg-surface-700/70 text-ink-50 font-medium'
                : 'text-ink-200 hover:bg-surface-800 hover:text-ink-50',
              hasChildren && 'pr-8',
            );
          }}
        >
          {({ isActive }) => (
            <>
              {(isActive || sectionActive) && (
                <span className="absolute -left-2 top-1.5 bottom-1.5 w-[3px] rounded-r bg-accent" />
              )}
              {Icon && (
                <Icon
                  className={clsx('h-4 w-4 shrink-0', (isActive || sectionActive) ? 'text-sky-300' : 'text-ink-400')}
                  strokeWidth={1.7}
                />
              )}
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && <CountBadge value={item.badge} tone={item.badgeTone} />}
            </>
          )}
        </NavLink>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
            aria-expanded={open}
            className="absolute right-1 top-1 h-6 w-6 grid place-items-center rounded text-ink-600 hover:text-ink-200 hover:bg-surface-700 transition"
          >
            <ChevronRight className={clsx('h-3.5 w-3.5 transition-transform', open && 'rotate-90')} strokeWidth={2} />
          </button>
        )}
      </div>

      {hasChildren && open && (
        <div className="ml-[17px] pl-3 mt-0.5 mb-1 border-l border-surface-600/70 space-y-px animate-fade-in">
          {item.children.map((c) => {
            const active = matches(c.to, location);
            return (
              <Link
                key={c.to + c.label}
                to={c.to}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'flex items-center justify-between gap-2 px-2 h-7 rounded text-sm transition-colors',
                  active
                    ? 'text-ink-50 bg-surface-800 font-medium'
                    : 'text-ink-400 hover:text-ink-50 hover:bg-surface-800/70'
                )}
              >
                <span className="truncate">{c.label}</span>
                {c.badge && <CountBadge value={c.badge} tone={c.badgeTone} />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BrandMark() {
  return (
    <div className="relative h-7 w-7 rounded-lg bg-gradient-to-br from-sky-400 to-accent grid place-items-center shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_4px_12px_-4px_rgba(61,142,240,0.6)]">
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="3" cy="3.5" r="1.1" />
        <circle cx="13" cy="3.5" r="1.1" />
        <circle cx="3" cy="12.5" r="1.1" />
        <circle cx="13" cy="12.5" r="1.1" />
        <path d="M4 4.4 6.8 7M12 4.4 9.2 7M4 11.6 6.8 9M12 11.6 9.2 9" />
      </svg>
    </div>
  );
}

export function NavTree() {
  return (
    <aside className="w-[220px] shrink-0 bg-surface-900 border-r border-surface-600/60 h-full flex flex-col">
      <Link to="/" className="flex items-center gap-2.5 px-4 h-[60px] border-b border-surface-600/60">
        <BrandMark />
        <div className="leading-tight">
          <div className="text-base font-semibold tracking-tight">FMG Console</div>
          <div className="text-2xs text-ink-600">Fleet manager</div>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-2.5 py-3" aria-label="Primary">
        {NAV.map((n, i) => {
          if (n.kind === 'group') {
            return (
              <div key={'g-' + i} className="eyebrow px-2.5 pt-5 pb-1.5">
                {n.label}
              </div>
            );
          }
          return <ItemRow key={n.to} item={n} />;
        })}
      </nav>

      <div className="m-2.5 rounded-lg border border-surface-600/60 bg-surface-800/60 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <StatusDot status="ok" size="md" />
          <span className="text-xs font-medium text-ink-200 truncate">fmg.tanlab.net</span>
        </div>
        <div className="flex items-center justify-between mt-1 text-2xs text-ink-400">
          <span>ADOM <span className="text-ink-200">root</span></span>
          <span className="font-mono">v7.6.6</span>
        </div>
      </div>
    </aside>
  );
}
