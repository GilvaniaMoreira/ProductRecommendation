import React from 'react';

function RecommendationList({ recommendations }) {
  const hasRecommendations = Array.isArray(recommendations) && recommendations.length > 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Lista de recomendações</h2>
        <p className="text-sm text-slate-400">
          Resultados ordenados pela aderência aos critérios selecionados.
        </p>
      </div>

      {!hasRecommendations && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200 shadow-inner shadow-black/20">
          <p className="font-medium text-slate-100">Nenhuma recomendação ainda.</p>
          <p className="text-slate-400">
            Escolha preferências, funcionalidades e o tipo de recomendação para ver sugestões aqui.
          </p>
        </div>
      )}

      {hasRecommendations && (
        <ul className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-4 shadow-lg shadow-black/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {recommendation?.category || 'Produto'}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {recommendation?.name || 'Solução RD Station'}
                  </p>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-100">
                  #{index + 1}
                </span>
              </div>

              {(recommendation?.features || recommendation?.preferences) && (
                <div className="mt-3 grid gap-2">
                  {(recommendation.features || []).slice(0, 2).map((feature, featIndex) => (
                    <div key={featIndex} className="flex items-center gap-2 text-sm text-slate-200">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {(recommendation.preferences || []).slice(0, 1).map((pref, prefIndex) => (
                    <div key={`pref-${prefIndex}`} className="flex items-center gap-2 text-sm text-slate-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>{pref}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendationList;
