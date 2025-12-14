import React, { useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import SectionCard from '../../ui/SectionCard';

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
    <SectionCard
      title="Funcionalidades"
      description="Quais recursos você quer priorizar?"
      badgeLabel="Passo 2"
      badgeVariant="emerald"
    >
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
    </SectionCard>
  );
}

export default Features;

