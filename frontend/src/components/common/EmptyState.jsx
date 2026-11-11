import clsx from 'clsx';
import { Inbox } from 'lucide-react';

export function EmptyState({ icon: Icon = Inbox, title, hint, action, className }) {
  return (
    <div className={clsx('py-12 px-6 text-center', className)}>
      <span className="mx-auto mb-3 h-10 w-10 grid place-items-center rounded-xl bg-surface-800 ring-1 ring-inset ring-surface-600">
        <Icon className="h-5 w-5 text-ink-400" strokeWidth={1.5} />
      </span>
      <div className="text-base text-ink-50 font-medium">{title}</div>
      {hint && <div className="text-sm text-ink-400 mt-1 max-w-sm mx-auto">{hint}</div>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
