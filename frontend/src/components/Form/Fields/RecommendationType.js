import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({
  selectedRecommendationType,
  onRecommendationTypeChange,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Tipo de recomendação
          </h2>
          <p className="text-sm text-slate-500">
            Escolha se prefere uma sugestão ou várias opções
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          Passo 3
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          checked={selectedRecommendationType === 'SingleProduct'}
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="h-full"
        >
          <span className="block font-semibold text-slate-900">
            Produto único
          </span>
          <span className="block text-sm font-normal text-slate-600">
            Indicaremos o melhor ajuste para sua seleção.
          </span>
        </Checkbox>

        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          checked={selectedRecommendationType === 'MultipleProducts'}
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="h-full"
        >
          <span className="block font-semibold text-slate-900">
            Múltiplos produtos
          </span>
          <span className="block text-sm font-normal text-slate-600">
            Veja uma lista ordenada por aderência.
          </span>
        </Checkbox>
      </div>
    </div>
  );
}

export default RecommendationType;
