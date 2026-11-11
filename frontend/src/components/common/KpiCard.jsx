import clsx from 'clsx';

const TONE_TEXT = {
  ok: 'text-emerald-400',
  success: 'text-emerald-400',
  warning: 'text-amber-400',
  danger: 'text-rose-400',
  info: 'text-sky-400',
  muted: 'text-ink-400',
};

const TONE_ICON = {
  ok: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  success: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  danger: 'bg-rose-500/10 text-rose-400 ring-rose-500/20',
  info: 'bg-sky-500/10 text-sky-400 ring-sky-500/20',
  muted: 'bg-surface-700 text-ink-400 ring-surface-600',
};

const TONE_BAR = {
  ok: 'from-emerald-400/60',
  success: 'from-emerald-400/60',
  warning: 'from-amber-400/60',
  danger: 'from-rose-400/60',
  info: 'from-sky-400/60',
  muted: 'from-surface-500',
};

export function KpiCard({ label, icon: Icon, iconTone = 'muted', value, suffix, delta, deltaTone = 'muted', className }) {
  return (
    <div className={clsx('tile relative overflow-hidden p-4 h-full', className)}>
      <span className={clsx('absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent', TONE_BAR[iconTone])} />
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-ink-400">{label}</span>
        {Icon && (
          <span className={clsx('h-7 w-7 -mt-0.5 -mr-0.5 grid place-items-center rounded-lg ring-1 ring-inset', TONE_ICON[iconTone])}>
            <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
          </span>
        )}
      </div>
      <div className="mt-1 text-[28px] font-semibold leading-none tracking-tight text-ink-50 tabular-nums">
        {value}
        {suffix && <span className="ml-0.5 text-base text-ink-400 font-normal tracking-normal">{suffix}</span>}
      </div>
      {delta && (
        <div className={clsx('text-xs mt-2', TONE_TEXT[deltaTone])}>
          {delta}
        </div>
      )}
    </div>
  );
}
