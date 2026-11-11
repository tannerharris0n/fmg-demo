import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

function TitleWrap({ to, children }) {
  if (!to) return <div className="flex items-center gap-2 min-w-0 flex-wrap">{children}</div>;
  return (
    <Link to={to} className="group/title flex items-center gap-2 min-w-0 flex-wrap hover:text-sky-300 transition">
      {children}
      <ArrowUpRight
        className="h-3.5 w-3.5 text-ink-600 opacity-0 group-hover/title:opacity-100 group-hover/title:text-sky-300 transition"
        strokeWidth={2}
      />
    </Link>
  );
}

export function Tile({ title, subtitle, icon: Icon, action, to, children, className, padded = true }) {
  return (
    <section className={clsx('tile', padded && 'p-4', className)}>
      {(title || action) && (
        <header className={clsx('flex flex-wrap items-center justify-between gap-x-4 gap-y-2', padded ? 'mb-3.5' : 'px-4 pt-4 pb-3')}>
          <TitleWrap to={to}>
            {Icon && (
              <span className="h-6 w-6 grid place-items-center rounded-md bg-surface-800 ring-1 ring-inset ring-surface-600/70 shrink-0">
                <Icon className="h-3.5 w-3.5 text-ink-200" strokeWidth={1.8} />
              </span>
            )}
            <h2 className="text-base font-semibold text-ink-50 whitespace-nowrap">{title}</h2>
            {subtitle && <span className="text-xs text-ink-400 min-w-0">{subtitle}</span>}
          </TitleWrap>
          {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
