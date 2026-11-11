import clsx from 'clsx';

export function Segmented({ value, onChange, options, size = 'md', compact = false }) {
  return (
    <div role="tablist" className="inline-flex bg-surface-900 rounded-lg p-0.5 gap-0.5 ring-1 ring-inset ring-surface-600">
      {options.map((opt) => {
        const active = opt.value === value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            title={opt.label}
            className={clsx(
              'flex items-center gap-1.5 font-medium rounded-md transition-colors',
              size === 'sm' ? 'px-2.5 h-6 text-xs' : 'px-3 h-7 text-sm',
              active
                ? 'bg-surface-700 text-ink-50 shadow-panel ring-1 ring-inset ring-white/5'
                : 'text-ink-400 hover:text-ink-200'
            )}
          >
            {Icon && <Icon className={clsx('h-3.5 w-3.5', active && 'text-sky-300')} strokeWidth={1.8} />}
            <span className={clsx(compact && opt.icon && 'hidden xl:inline')}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
