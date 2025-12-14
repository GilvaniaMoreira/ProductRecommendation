import React from 'react';

function Checkbox({ children, className = '', type = 'checkbox', ...props }) {
  const isRadio = type === 'radio';

  const inputClasses = [
    'h-5 w-5 shrink-0 border-2 border-slate-300 bg-white text-indigo-600 transition',
    'focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500',
    isRadio ? 'rounded-full' : 'rounded-md',
  ].join(' ');

  return (
    <label
      className={`group flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white/80 p-3 shadow-sm transition hover:-translate-y-[1px] hover:border-indigo-200 hover:shadow-md ${className}`}
    >
      <input type={type} className={inputClasses} {...props} />
      <span className="text-sm font-medium leading-relaxed text-slate-800 group-hover:text-slate-900">
        {children}
      </span>
    </label>
  );
}

export default Checkbox;

