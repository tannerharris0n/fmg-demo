import clsx from 'clsx';

const VARIANT = {
  primary:   'bg-accent hover:bg-[#5199F2] text-white border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset]',
  secondary: 'bg-surface-800 hover:bg-surface-700 text-ink-50 border-surface-600',
  ghost:     'bg-transparent hover:bg-surface-800 text-ink-200 border-transparent',
  danger:    'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30',
};

const SIZE = {
  sm: 'text-xs px-2.5 h-7 gap-1.5',
  md: 'text-sm px-3 h-8 gap-2',
  lg: 'text-base px-4 h-10 gap-2',
};

export function Button({ variant = 'secondary', size = 'md', icon: Icon, children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap font-medium rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANT[variant],
        SIZE[size],
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />}
      {children}
    </button>
  );
}
