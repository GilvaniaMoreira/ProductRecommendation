import React from 'react';

const badgeVariants = {
  indigo: 'bg-indigo-50 text-indigo-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  slate: 'bg-slate-100 text-slate-700',
};

function SectionCard({ title, description, badgeLabel, badgeVariant = 'indigo', children }) {
  const badgeClass = badgeVariants[badgeVariant] || badgeVariants.indigo;

  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        {badgeLabel && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
            {badgeLabel}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default SectionCard;

