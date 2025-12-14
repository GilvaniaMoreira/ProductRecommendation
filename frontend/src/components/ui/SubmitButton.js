import React from 'react';

function SubmitButton({ text, disabled = false, loading = false }) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-busy={loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-[1px] hover:from-indigo-500 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Processando...' : text}
    </button>
  );
}

export default SubmitButton;

