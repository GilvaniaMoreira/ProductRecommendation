import React from 'react';
import Checkbox from '../../ui/Checkbox';
import SectionCard from '../../ui/SectionCard';

function RecommendationType({
  selectedRecommendationType,
  onRecommendationTypeChange,
}) {
  return (
    <SectionCard
      title="Tipo de recomendação"
      description="Escolha se prefere uma sugestão ou várias opções"
      badgeLabel="Passo 3"
      badgeVariant="slate"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          checked={selectedRecommendationType === 'SingleProduct'}
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="h-full"
        >
          <span className="block font-semibold text-slate-900">Produto único</span>
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
          <span className="block font-semibold text-slate-900">Múltiplos produtos</span>
          <span className="block text-sm font-normal text-slate-600">
            Veja uma lista ordenada por aderência.
          </span>
        </Checkbox>
      </div>
    </SectionCard>
  );
}

export default RecommendationType;

