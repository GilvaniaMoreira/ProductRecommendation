import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Funcionalidades
          </h2>
          <p className="text-sm text-slate-500">
            Quais recursos você quer priorizar?
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Passo 2
        </span>
      </div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <Checkbox
            key={index}
            value={feature}
            checked={currentFeatures.includes(feature)}
            onChange={() => handleFeatureChange(feature)}
          >
            {feature}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Features;
